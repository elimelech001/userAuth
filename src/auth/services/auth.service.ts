import { UsersService } from "src/users/services/users.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as  bcrypt from 'bcrypt'
import { MessagesService } from "src/shared/messages.service";
import { VerificationService } from "./verification.service";
import { TokenService } from "./token.Service";
import { AuthEmailService } from "./email.service";
import { UserIdentity } from "../dto/UserIdentity";
import { User } from "src/users/entitys/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private messagesService: MessagesService,
    private verificationService: VerificationService,
    private tokenService: TokenService,
    private emailService: AuthEmailService
  ) { }

  async validateUserCreds(username: string, password: string): Promise<User> {

    const user = await this.userService.getUserByUsername(username);
    const hashedPassword = user.password

    if (!(await bcrypt.compare(password, hashedPassword)))
      throw new BadRequestException(this.messagesService.getMessage('PASSWORD_WRONG'));

    return user
  }

  async login(user: UserIdentity): Promise<any> {

    if (await this.verificationService.isUserVerifiedWithin24Hours(user.id)) {
      return this.tokenService.generateToken(user)
    }
    else {
      return this.emailService.sendEmailVerification(user);
    }
  }
}
