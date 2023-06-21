import {User} from 'src/users/entitys/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 500, nullable: true})
  title: string;

  @Column({nullable: false})
  description: string;

  @ManyToOne(() => User, (user) => user.post)
  user: User;

  @ManyToOne(() => User, (user) => user.sentTo)
  to: User;
}
