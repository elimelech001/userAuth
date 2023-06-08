import { Controller, Request, Post, UseGuards, Body, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDTO } from './dto/loginDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { VerificationService } from './services/verification.service';
import { TokenService } from './services/token.Service';
import { AuthEmailService } from './services/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private verificationService: VerificationService,
    private tokenService: TokenService,  
    private emailService: AuthEmailService  
  ) { }


  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() body: LoginDTO): Promise<any> {
    
    if (await this.verificationService.isUserVerifiedWithin24Hours(req.user)) {
      return this.tokenService.generateToken(req.user)
    }
    else {
      const token = this.tokenService.generateToken(req.user); 
      return this.emailService.sendEmailVerification(req.user); 
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyEmailToken(@Request() req): Promise<any> {
    return  this.verificationService.markUserAsVerified(req.user)
  }


  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req): Promise<any> {

    return req.user;
  }
}
