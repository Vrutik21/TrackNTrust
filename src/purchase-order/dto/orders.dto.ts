import { Status } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class OrdersDto {
  @IsString()
  customer_id: string;

  @IsString()
  user_id: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsLatitude()
  loc_lat: number;

  @IsLongitude()
  loc_lon: number;

  @IsArray()
  order_entries: Array<OrderEntriesDto>;
}

export class OrderEntriesDto {
  @IsString()
  product_id: string;

  @IsNumber()
  quantity: number;
}

export class UpdateOrdersDto {
  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsLatitude()
  @IsOptional()
  loc_lat: number;

  @IsLongitude()
  @IsOptional()
  loc_lon: number;

  @IsString()
  description: string;

  @IsString()
  user_id: string;
}
