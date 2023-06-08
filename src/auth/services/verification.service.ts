import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entitys/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { TokenService } from './token.Service';

@Injectable()
export class VerificationService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    async markUserAsVerified(user: User): Promise<string> {
        const fullUserInfo = this.usersService.getUserByUsername(user.username)
        if (!fullUserInfo) {
            throw new UnauthorizedException('User not found');
        }
        if (!fullUserInfo) {
            throw new NotFoundException('User not found');
        }
        (await fullUserInfo).isVerified = true;
        user.verificationDate = new Date();
         this.usersService.updateUser(await user);
         return 'user verified succesfuly'
    }

    async isUserVerifiedWithin24Hours(user: User): Promise<boolean> {
        const fullUserInfo = this.usersService.getUserByUsername(user.username)
        if (!fullUserInfo) {
            throw new UnauthorizedException('User not found');
        }
    
        const verificationDate = user.verificationDate;
        if (!verificationDate) {
            return false
        }
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - verificationDate.getTime();//
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

        return hoursDifference <= 24;
    }

 
}
