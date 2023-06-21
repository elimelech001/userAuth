import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {MessagesService} from 'src/shared/messages.service';
import {UserIdentity} from '../dto/UserIdentity';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private readonly messagesService: MessagesService,
  ) {}

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        id: user.id,
      }),
    };
  }

  async decodeEmailToken(token: string): Promise<string> {
    try {
      const decoded: UserIdentity = this.jwtService.verify(token);
      return decoded.username;
    } catch (err) {
      throw new UnauthorizedException(
        this.messagesService.getMessage('TOKEN_INVALID'),
      );
    }
  }
}
