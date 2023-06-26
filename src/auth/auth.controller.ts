import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Response,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDTO } from './dto/loginDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { VerificationService } from './services/verification.service';
import { ApiTags } from '@nestjs/swagger';
import { Access_token } from './dto/access_tojen.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private verificationService: VerificationService,
    private authService: AuthService,
  ) { }


  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() body: LoginDTO,
  ): Promise<string | Access_token> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyEmailToken(@Request() req): Promise<string> {
    return this.verificationService.markUserAsVerified(req.user.id);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Response() res) {

    const jwt: string = req.user.jwt;
    if (jwt) res.redirect('http://localhost:3000/api/' + jwt);
    else res.redirect('http://localhost:3000/login/api');
  }
}
