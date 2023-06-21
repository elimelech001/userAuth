import {Injectable} from '@nestjs/common';
import {AES, enc} from 'crypto-js';

@Injectable()
export class EncryptionService {
  private readonly ENCRYPTION_KEY = process.env.APP_SECRET;

  encryptField(fieldValue: string | null): string {
    if (fieldValue) {
      return AES.encrypt(fieldValue, this.ENCRYPTION_KEY).toString();
    } else {
      return fieldValue;
    }
  }

  decryptField(encryptedValue: string): string {
    if (encryptedValue) {
      const bytes = AES.decrypt(encryptedValue, this.ENCRYPTION_KEY);
      return bytes.toString(enc.Utf8);
    } else {
      return encryptedValue;
    }
  }
}
