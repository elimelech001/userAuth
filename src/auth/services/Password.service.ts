import { Injectable } from "@nestjs/common";
import * as  bcrypt from 'bcrypt'
@Injectable()
export class PasswordService {
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    async comparePassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
