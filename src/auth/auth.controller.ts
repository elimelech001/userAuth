import { Controller, Request, Post, UseGuards, Body, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDTO } from './dto/loginDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { VerificationService } from './services/verification.service';

@Controller('auth')
export class AuthController {
  constructor(
    private verificationService: VerificationService,
    private authService: AuthService
  ) {}

//fix pipes dont work on login
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() body: LoginDTO): Promise<any> {
    return this.authService.login(req.user)
  }


  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyEmailToken(@Request() req): Promise<string> {

    return this.verificationService.markUserAsVerified(req.user.id)
  }


 
}
