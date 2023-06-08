import { IsEmail, IsNotEmpty, Length, } from 'class-validator';

export class LoginDTO { 
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @Length(8, 24)
    password: string

}