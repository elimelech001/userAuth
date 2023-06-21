// messages.service.ts
import {Injectable} from '@nestjs/common';
import {MESSAGES} from './messages.config';

@Injectable()
export class MessagesService {
  getMessage(key: string): string {
    return MESSAGES[key] || '';
  }
}
