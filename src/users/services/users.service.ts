import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {UsersDto} from '../dto/UserRegisterRequestDto';
import {User} from '../entitys/users.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EncryptionService} from 'src/users/services/encryption.service';
import {AddressService} from './adress.service';
import {MessagesService} from 'src/shared/messages.service';
//  fix allow nullebe and errors if skiped something tat allow null is false test in diff methods
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private encryptionService: EncryptionService,
    private addressService: AddressService,
    private messagesService: MessagesService,
  ) {}
  async createUser(createUserDto: UsersDto): Promise<User> {
    try {
      const {address, ...user} = createUserDto;
      this.checkPasswordsMatch(user.password, user.confirm);

      this.encryptUserData(user);

      const newUser = this.userRepository.create(user);
      if (address) {
        const newAddress = await this.addressService.createAddress(address);
        newUser.address = newAddress;
        await this.userRepository.save(newUser);
      }

      return newUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }
  }

  private encryptUserData(user: Partial<User>) {
    user.email = this.encryptionService.encryptField(user.email);
    user.phoneNumber = this.encryptionService.encryptField(user.phoneNumber);
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
      throw new BadRequestException('Could not save user');
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    // todo what to add in username to check how to incryped and find data
    try {
      const user = await this.userRepository.findOne({where: {username}});

      if (!user) {
        throw new NotFoundException(
          this.messagesService.getMessage('USER_NOT_FOUND'),
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({where: {id}});

      if (!user) {
        throw new NotFoundException(
          this.messagesService.getMessage('USER_NOT_FOUND'),
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserWithAddressById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {id},
      relations: ['address'],
    });

    if (!user) {
      throw new NotFoundException(
        this.messagesService.getMessage('USER_NOT_FOUND'),
      );
    }

    return user;
  }

  async extractAndDecryptUserData(id: number): Promise<Partial<User>> {
    const user = await this.getUserWithAddressById(id);
    const {password, verificationDate, isVerified, role, ...userData} = user;

    userData.phoneNumber = this.encryptionService.decryptField(
      user.phoneNumber,
    );
    userData.email = this.encryptionService.decryptField(user.email);

    this.addressService.decrypedAdressData(userData.address);

    return userData;
  }
}
