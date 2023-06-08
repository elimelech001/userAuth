import { UsersService } from "src/users/services/users.service";
import { PasswordService } from "./Password.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as  bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  //parameter userservice interaction with db
  //
  constructor(
    private userService: UsersService,
  ) { }

  // method validates logedIn user and returns decrypted user
  async validateUserCreds(username: string, password: string): Promise<any> {
    // accepts username password 
    // gets user throgh usernamw
    // compares hashed password with regular
    // creates error if not compared
    // returns decrypted userinfo
    const user = await this.userService.getUserByUsername(username);
    const hashedPassword = user.password

    if (!(await bcrypt.compare(password, hashedPassword)))
      throw new BadRequestException('Incorrect password');

    return this.userService.extractAndDecryptUserData(user.username);
  }


}
