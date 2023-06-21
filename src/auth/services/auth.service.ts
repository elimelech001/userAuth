import {UsersService} from 'src/users/services/users.service';
import {
  BadRequestException,
  Get,
  Injectable,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {MessagesService} from 'src/shared/messages.service';
import {VerificationService} from './verification.service';
import {TokenService} from './token.Service';
import {AuthEmailService} from './email.service';
import {UserIdentity} from '../dto/UserIdentity';
import {User} from 'src/users/entitys/users.entity';
import {Access_token} from '../dto/access_tojen.interface';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class AuthService {
  validateUser(user: {email: any; firstName: any; lastName: any}) {
    console.log('user', user);
  }
  constructor(
    private userService: UsersService,
    private messagesService: MessagesService,
    private verificationService: VerificationService,
    private tokenService: TokenService,
    private emailService: AuthEmailService,
  ) {}

  async validateUserCreds(username: string, password: string): Promise<User> {
    const user = await this.userService.getUserByUsername(username);
    const hashedPassword = user.password;

    if (!(await bcrypt.compare(password, hashedPassword)))
      throw new BadRequestException(
        this.messagesService.getMessage('PASSWORD_WRONG'),
      );

    return user;
  }

  async login(user: UserIdentity): Promise<string | Access_token> {
    if (await this.verificationService.isUserVerifiedWithin24Hours(user.id)) {
      return this.tokenService.generateToken(user);
    } else {
      return this.emailService.sendEmailVerification(user);
    }
  }
}
