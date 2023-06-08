import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import * as bcrypt from 'bcrypt';
import { Address } from "./address.entity";
@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column()
  age: number

  @Column()
  phoneNumber: string

  @Column({ default: false })
  isVerified: boolean;
  
  @Column({ default: null })
  verificationDate: Date;
 
  @OneToOne(() => Address, address => address.user)
  @JoinColumn()
  address: Address;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

}
