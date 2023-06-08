import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitys/users.entity';
import { EncryptionService } from 'src/services/encryption.service';
import { Address } from './entitys/address.entity';
import { AddressService } from './services/adress.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/services/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Address])],
    controllers: [UserController],
    providers: [UsersService, EncryptionService, AddressService],
    exports: [UsersService]
})

export class UsersModule { }
