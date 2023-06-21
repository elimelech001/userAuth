import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: 'Milk, eggs, bread',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
