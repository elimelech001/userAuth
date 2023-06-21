import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthService} from '../services/auth.service';
import {UserIdentity} from '../dto/UserIdentity';
import {User} from 'src/users/entitys/users.entity';
import {BadRequestException} from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<UserIdentity> {
    const user: User = await this.authService.validateUserCreds(
      username,
      password,
    );

    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
      username: user.username,
    };
  }
}
