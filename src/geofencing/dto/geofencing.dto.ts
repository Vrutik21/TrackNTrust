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
}

export class SendSMSDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  message: string;
}
