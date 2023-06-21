import {Module} from '@nestjs/common';
import {UserController} from './users.controller';
import {UsersService} from './services/users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entitys/users.entity';
import {EncryptionService} from 'src/users/services/encryption.service';
import {Address} from './entitys/address.entity';
import {AddressService} from './services/adress.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UserController],
  providers: [UsersService, EncryptionService, AddressService],
  exports: [UsersService],
})
export class UsersModule {}
