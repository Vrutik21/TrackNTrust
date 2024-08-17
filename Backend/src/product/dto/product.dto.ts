import {
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsNumber()
  weight: number;
}
