import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {emailConfig} from 'config/email.config';
import {createTransport} from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string) {
    const mailOptions = {
      from: emailConfig.auth.user,
      to,
      subject,
      html: content,
    };

    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to send email: ${error.message}`,
      );
    }
  }
}
