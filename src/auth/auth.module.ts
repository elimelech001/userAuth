import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './stratergy/jwt.strategy';
import { LocalStrategy } from './stratergy/local.stratergy';
import { jwtConfig } from 'config/jwt.config';
import { EmailsModule } from 'src/email/email.module';
import { PasswordService } from './services/Password.service';
import { TokenService } from './services/token.Service';
import { AuthService } from './services/auth.service';
import { VerificationService } from './services/verification.service';
import { AuthEmailService } from './services/email.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register(jwtConfig),
    EmailsModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, VerificationService, TokenService, PasswordService,AuthEmailService],
  controllers: [AuthController],
})
export class AuthModule { }
