import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import {
  JwtModule,
  JwtService,
} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/shared/jwt/jwt.strategy';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }),
  ],
  providers: [
    UserService,
    PrismaService,
    JwtService,
  ],
  exports: [UserService],
})
export class UserModule {}
