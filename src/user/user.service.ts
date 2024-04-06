import {
  ForbiddenException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';
import {
  SignInDto,
  SignUpDto,
  UpdateUserDto,
} from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    dto: SignUpDto,
  ): Promise<{ token: string }> {
    try {
      const {
        email,
        name,
        password,
        mobile,
        role,
      } = dto;

      const hashedPassword = await bcrypt.hash(
        password,
        10,
      );

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          mobile,
          role,
        },
      });

      const token = this.jwtService.sign({
        id: user.id,
      });

      return { ...user, token };
    } catch (err) {
      prismaError(err);
    }
  }

  async signIn(
    dto: SignInDto,
  ): Promise<{ token: string }> {
    try {
      const { email, password } = dto;

      const user =
        await this.prisma.user.findUnique({
          where: {
            email,
          },
        });

      if (!user) {
        throw new ForbiddenException(
          'User not found',
        );
      }

      const isPasswordMatched =
        await bcrypt.compare(
          password,
          user.password,
        );

      if (!isPasswordMatched) {
        throw new UnauthorizedException(
          'Invalid email or password',
        );
      }

      if (user.role === null) {
        throw new UnauthorizedException(
          'User is not verified by the Admin',
        );
      }

      const token = this.jwtService.sign({
        id: user.id,
      });

      return { ...user, token };
    } catch (err) {
      prismaError(err);
    }
  }

  async verifyJwt(
    token: string,
  ): Promise<boolean> {
    try {
      await this.jwtService.verify(token, {
        secret: 'nestjsbackend',
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifySession(@Req() req: Request) {
    try {
      const token = req.headers.token;

      if (!token) {
        throw new UnauthorizedException(
          'Token not provided',
        );
      }

      const isValid = await this.verifyJwt(
        token.toString(),
      );

      if (!isValid) {
        throw new UnauthorizedException(
          'Invalid token',
        );
      }

      return 'valid token';
    } catch (err) {
      prismaError(err);
    }
  }

  async getUsers() {
    try {
      const users =
        await this.prisma.user.findMany({
          orderBy: {
            updated_at: 'desc',
          },
          include: {
            _count: {
              select: {
                orders: true,
              },
            },
          },
        });

      return users;
    } catch (err) {
      prismaError(err);
    }
  }

  async getUser(id: string) {
    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            orders: {
              include: {
                order_entries: true,
                order_history: true,
                customer: true,
              },
            },
          },
        });

      return user;
    } catch (err) {
      prismaError(err);
    }
  }

  async updateUser(
    id: string,
    dto: UpdateUserDto,
  ) {
    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            id,
          },
        });

      if (user.isVerified) {
        throw new ForbiddenException(
          'User is already verified',
        );
      }

      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          isVerified: true,
          role: dto.role,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }

  async getDriverInfo(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          role: 'delivery_person',
          id,
        },
        include: {
          orders: {
            include: {
              customer: {
                include: {
                  geofence_areas: true,
                },
              },
              order_entries: true,
            },
          },
          driver_path: true,
        },
      });
    } catch (err) {
      prismaError(err);
    }
  }
}
