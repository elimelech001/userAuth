import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Address} from './address.entity';
import {UserRoles} from '../user.roles.enum';
import {ApiProperty} from '@nestjs/swagger'; // Import the ApiProperty decorator
import {Todos} from 'src/todos/entities/todo.entity';
import {Post} from 'src/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty() // Add the ApiProperty decorator to expose this property in Swagger
  id: number;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column({unique: true})
  @ApiProperty()
  email: string;

  @Column({unique: true})
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  age: number;

  @Column()
  @ApiProperty()
  phoneNumber: string;

  @Column({default: false})
  @ApiProperty()
  isVerified: boolean;

  @Column({default: null})
  @ApiProperty()
  verificationDate: Date;

  @Column({type: 'enum', enum: UserRoles, default: UserRoles.MEMBER})
  @ApiProperty({enum: UserRoles}) // Specify the enum type for Swagger
  role: UserRoles;

  @OneToOne(() => Address, (address) => address.user, {nullable: true})
  @JoinColumn()
  @ApiProperty() // Add the ApiProperty decorator for the relationship
  address: Address | null;

  @JoinColumn()
  @OneToMany(() => Todos, (todos) => todos.user, {cascade: true})
  todos: Todos[];

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @OneToMany(() => Post, (post) => post.to)
  sentTo: Post[];
  // in posts each post has a user who created it each user has many posts that he created
  //each post has a user that he postd each user has many

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
