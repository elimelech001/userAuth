import {IsNotEmpty, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username of the user',
    example: 'jgghghoghhf',
  })
  username: string;

  @IsNotEmpty()
  @Length(8, 24)
  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  password: string;
}
