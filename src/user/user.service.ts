import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaError } from 'src/shared/error-handling';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getUsers() {
    try {
      const users =
        await this.prisma.user.findMany({
          orderBy: {
            updated_at: 'desc',
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
        });

      return user;
    } catch (err) {
      prismaError(err);
    }
  }
}
