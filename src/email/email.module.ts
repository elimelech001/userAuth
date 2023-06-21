import {EmailTemplateService} from 'src/email/email-template.service';
import {EmailService} from './email.service';
import {Module, Global} from '@nestjs/common';

@Global()
@Module({
  providers: [EmailService, EmailTemplateService],
  exports: [EmailService, EmailTemplateService],
})
export class EmailsModule {
  static forRoot() {
    return {
      module: EmailsModule,
      exports: [EmailService, EmailTemplateService],
    };
  }
}
