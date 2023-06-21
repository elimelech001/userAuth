import {IsString, IsNotEmpty, IsInt} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'Title of the post',
    description: 'The title of the post',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Description of the post',
    description: 'The description of the post',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 2,
    description: 'The ID of the user the post is addressed to',
  })
  @IsInt()
  toUserId: number;
}
