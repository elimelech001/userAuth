import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';
import {Injectable} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {TokenService} from '../services/token.Service';
require('dotenv').config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService, private token: TokenService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    console.log(accessToken);
    console.log(profile);

    const user = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
    };

    const userFromDb = {
      id: '1',
      ...user,
      jwt: this.token.generateToken({
        username: user.firstName,
        id: 1,
      }).access_token,
    };

    console.log(userFromDb);
    done(null, userFromDb);
  }
}
