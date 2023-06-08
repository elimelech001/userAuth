import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
    providers: [EmailService],
    exports: [EmailService], // Export so that other modules can use it
})
export class EmailsModule { }
