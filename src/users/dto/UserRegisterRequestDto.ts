import {IsEmail, IsNotEmpty, Length} from 'class-validator';
import {AddressDto} from './AddressDto';
import {ApiProperty} from '@nestjs/swagger';

export class UsersDto {
  @ApiProperty({
    description: 'The first name of the User',
    example: 'Jhon',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the User',
    example: 'Doe',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'jhon.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The username of the User',
    example: 'johndoe123',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  password: string;

  @ApiProperty({
    description: 'The confirnm password of the User',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  confirm: string;

  @ApiProperty({
    description: 'The age of the User',
    example: '33',
  })
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'The phonumber of the User',
    example: '+972534345665',
  })
  @IsNotEmpty()
  phoneNumber: string;

  address: AddressDto;
}
