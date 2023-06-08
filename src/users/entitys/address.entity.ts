import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';
@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  street: string;

  @Column({ length: 500 })
  city: string;

  @Column({ length: 500 })
  country: string;

  @OneToOne(() => User, user => user.address)
  @JoinColumn()
  user: User;
}
