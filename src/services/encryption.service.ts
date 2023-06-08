import { Injectable } from '@nestjs/common';
import { AES, enc } from 'crypto-js';

@Injectable()
export class EncryptionService {
  private readonly ENCRYPTION_KEY = process.env.JWT_SECRET; // Store your secret encryption key in the environment variables

  encryptField(fieldValue: string): string {
    return AES.encrypt(fieldValue, this.ENCRYPTION_KEY).toString();
  }

  decryptField(encryptedValue: string): string {
    const bytes = AES.decrypt(encryptedValue, this.ENCRYPTION_KEY);
    return bytes.toString(enc.Utf8);
  }
}
