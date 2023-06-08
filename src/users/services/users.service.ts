import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRequest } from '../dto/UserRegisterRequestDto';
import { User } from '../entitys/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptionService } from 'src/services/encryption.service';
import { AddressService } from './adress.service';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private encryptionService: EncryptionService,
        private addressService: AddressService,

    ) { }

    async createUser(createUserDto: UsersRequest): Promise<User> {
        try {
            const { address, ...user } = createUserDto;
            this.checkPasswordsMatch(user.password, user.confirm)

            this.encryptUserData(user)

            const newUser = this.userRepository.create(user);

            const newAddress = await this.addressService.createAddress(address);
            newUser.address = newAddress;
            await this.userRepository.save(newUser);
            return newUser;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username or email already exists');
            }
            throw error;
        }
    }

    private encryptUserData(user: Partial<User>) {
        user.email = this.encryptionService.encryptField(user.email)
        user.phoneNumber = this.encryptionService.encryptField(user.phoneNumber)
    }



    private checkPasswordsMatch(password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            throw new BadRequestException('passwords dont match');
        }
    }

    updateUser(user: User) {
        try {
            this.userRepository.save(user);

        } catch (error) {
            console.log(error);
            throw new BadRequestException('coudnt save user')

        }
    }
    async getUserByUsername(username: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { username } });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {
            throw error;

        }
    }
    async getUserByEmail(email: string): Promise<User> {
        try {
            email = this.encryptionService.encryptField(email)
            console.log(email);

            const user = await this.userRepository.findOne({ where: { email } });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {
            throw error;

        }
    }

    async findUserWithAddress(username: string): Promise<User> {

        const user = await this.userRepository.findOne({ where: { username }, relations: ['address'] });

        if (!user) {
            throw new NotFoundException('Address not found for the user');
        }

        return user;
    }


    async extractAndDecryptUserData(username: string): Promise<User> {
        const user = await this.findUserWithAddress(username);

        if (user.password) {
            delete user.password;
        }
        delete user.verificationDate
        delete user.isVerified

        if (user.phoneNumber) {
            user.phoneNumber = this.encryptionService.decryptField(user.phoneNumber);
        }

        if (user.email) {
            user.email = this.encryptionService.decryptField(user.email);
        }

        if (user.address) {
            if (user.address.city) {
                user.address.city = this.encryptionService.decryptField(user.address.city);
            }
            if (user.address.country) {
                user.address.country = this.encryptionService.decryptField(user.address.country);
            }
            if (user.address.street) {
                user.address.street = this.encryptionService.decryptField(user.address.street);
            }
        }

        return user;
    }


}
