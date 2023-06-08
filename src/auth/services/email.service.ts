import { Injectable } from "@nestjs/common";
import { TokenService } from "./token.Service";
import { EmailService } from "src/email/email.service";

@Injectable()
export class AuthEmailService {
  constructor(private tokenService: TokenService,
    private emailService: EmailService
  ) { }

  async sendEmailVerification(user: any) {

    const token = this.tokenService.generateToken(user);

    const emailContent = `
        <h1>Email Verification</h1>
        <h3>Your verification code is:<br></h3>
         ${token.access_token} <br>
        <p>Thank you!</p>
      `;
    console.log(user);

    await this.emailService.sendEmail('a0583234663@gmail.com', "Email Verification", emailContent);

    return 'Email was sent, please verify user';
  }

}
