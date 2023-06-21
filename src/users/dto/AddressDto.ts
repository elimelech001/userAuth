import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    description: 'Street of the user',
    example: 'Main Street',
  })
  @IsString()
  street: string;

  @ApiProperty({
    description: 'City of the user',
    example: 'New York',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Country of the user',
    example: 'United States',
  })
  @IsString()
  country: string;
}
