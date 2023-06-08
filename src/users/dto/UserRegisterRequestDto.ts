import { IsEmail, IsNotEmpty, Length, } from 'class-validator';
import { AddressDto } from './AddressDto';

export class UsersRequest {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @Length(8, 24)
    password: string

    @IsNotEmpty()
    @Length(8, 24)
    confirm: string

    @IsNotEmpty()
    age: number

    @IsNotEmpty()
    phoneNumber: string

    @IsNotEmpty()
    address:AddressDto
    
}