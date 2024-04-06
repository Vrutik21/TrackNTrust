import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PurchaseOrderController } from './purchase-order/purchase-order.controller';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PurchaseOrderService } from './purchase-order/purchase-order.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { CustomerModule } from './customer/customer.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { LockerModule } from './locker/locker.module';
import * as dotenv from 'dotenv';
import { GeofencingModule } from './geofencing/geofencing.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/guards/auth.guard';
import { GeofencingService } from './geofencing/geofencing.service';
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
    GeofencingModule,
  ],
  controllers: [
    AppController,
    UserController,
    PurchaseOrderController,
    CustomerController,
    ProductController,
    // LockerController,
  ],
  providers: [
    AppService,
    UserService,
    PrismaService,
    PurchaseOrderService,
    CustomerService,
    ProductService,
    GeofencingService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // LockerService,
  ],
})
export class AppModule {}
