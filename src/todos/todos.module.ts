import {Module} from '@nestjs/common';
import {TodosService} from './todos.service';
import {TodosController} from './todos.controller';
import {InjectRepository, TypeOrmModule} from '@nestjs/typeorm';
import {Todos} from './entities/todo.entity';
import {User} from 'src/users/entitys/users.entity';
import {Repository} from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todos, User])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
