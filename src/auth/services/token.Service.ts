import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.username,
        sub: user.id,
      }),
    };
  }

  async decodeEmailToken(token: string): Promise<string> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded.name;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
