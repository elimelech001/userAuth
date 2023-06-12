
export class UsersController { }
import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersRequest } from './dto/UserRegisterRequestDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entitys/users.entity';
import { UserIdentity } from 'src/auth/dto/UserIdentity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoles } from './user.enum';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService) { }
    @Post('register')
    @UsePipes(new ValidationPipe())
    async registerUser(@Body() usersRequest: UsersRequest): Promise<UserIdentity> {
        const user = await this.userService.createUser(usersRequest);
        return {
            id: user.id,
            username: user.username
        };
    }
   @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<any> {
        return this.userService.extractAndDecryptUserData(req.user.id);
    }
}
