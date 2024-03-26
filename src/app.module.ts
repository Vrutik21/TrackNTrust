import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { PurchaseOrderController } from './purchase-order/purchase-order.controller';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PurchaseOrderService } from './purchase-order/purchase-order.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { CustomerModule } from './customer/customer.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { LockerController } from './locker/locker.controller';
import { LockerService } from './locker/locker.service';
import { LockerModule } from './locker/locker.module';
import {
  JwtModule,
  JwtService,
} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './shared/jwt/jwt.strategy';
dotenv.config();

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    PurchaseOrderModule,
    CustomerModule,
    ProductModule,
    LockerModule,
    JwtModule.register({
      global: true,
      secret: 'nestjsbackend',
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    PurchaseOrderController,
    CustomerController,
    ProductController,
    LockerController,
  ],
  providers: [
    AppService,
    UserService,
    PrismaService,
    PurchaseOrderService,
    CustomerService,
    ProductService,
    LockerService,
  ],
})
export class AppModule {}
