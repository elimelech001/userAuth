import {Injectable} from '@nestjs/common';
import {TokenService} from './token.Service';
import {EmailService} from 'src/email/email.service';
import {EmailTemplateService} from 'src/email/email-template.service';
import {MessagesService} from 'src/shared/messages.service';
import {UserIdentity} from '../dto/UserIdentity';
import {UsersService} from 'src/users/services/users.service';

@Injectable()
export class AuthEmailService {
  constructor(
    private tokenService: TokenService,
    private emailService: EmailService,
    private emailTemplateService: EmailTemplateService,
    private messages: MessagesService,
    private usersService: UsersService,
  ) {}

  async sendEmailVerification(userIdentity: UserIdentity): Promise<string> {
    //const user = this.usersService.extractAndDecryptUserData(userIdentity.id)
    const token = this.tokenService.generateToken(userIdentity);
    const emailTemplate: EmailTemplate =
      this.emailTemplateService.generateVerificationEmail(token.access_token);

    await this.emailService.sendEmail(
      'a0583234663@gmail.com',
      emailTemplate.subject,
      emailTemplate.content,
    );
    //(await user).email

    return this.messages.getMessage('EMAIL_SENT');
  }
}
