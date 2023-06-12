import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entitys/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { TokenService } from './token.Service';
import { MessagesService } from 'src/shared/messages.service';

@Injectable()
export class VerificationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly messagesService: MessagesService,

    ) { }

    async markUserAsVerified(id: number): Promise<string> {
        const user = this.usersService.getUserById(id);
        (await user).isVerified = true;
        (await user).verificationDate = new Date();
        this.usersService.updateUser(await user);
        return this.messagesService.getMessage("VERIFICATION_SUCCESS")
    }

    async isUserVerifiedWithin24Hours(id: number): Promise<boolean> {
        const user = this.usersService.getUserById(id)

        const verificationDate = (await user).verificationDate;
        if (!verificationDate) {
            return false
        }
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - verificationDate.getTime();
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));//24 hr

        return hoursDifference <= 24;
    }


}
