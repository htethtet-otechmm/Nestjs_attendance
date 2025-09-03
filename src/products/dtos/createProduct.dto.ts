import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @IsPositive()
  price: number;
}
