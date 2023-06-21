import {User} from 'src/users/entitys/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Todos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 500, nullable: false})
  title: string;

  @Column({default: false})
  completed: boolean;

  @Column({nullable: false})
  description: string;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn()
  user: User;
}
