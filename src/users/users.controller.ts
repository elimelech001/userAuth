
export class UsersController { }
import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Request } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersRequest } from './dto/UserRegisterRequestDto';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService) { }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async registerUser(@Body() usersRequest: UsersRequest): Promise<UsersResonse> {
        const user = await this.userService.createUser(usersRequest);
        return {
            id: user.id,
            username: user.username
        };
    }
}
