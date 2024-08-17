import {
  IsLatitude,
  IsLongitude,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class GeoFencingDto {
  @IsLatitude()
  latitude: string;

  @IsLongitude()
  longitude: string;

  @IsString()
  order_id: string;

  @IsString()
  driver_id: string;
}

export class SendSMSDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  message: string;
}
