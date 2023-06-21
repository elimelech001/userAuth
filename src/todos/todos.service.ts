import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Todos} from './entities/todo.entity';
import {User} from 'src/users/entitys/users.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private readonly todosRepository: Repository<Todos>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todos> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {id: userId},
      });
      const todo = new Todos();
      todo.title = createTodoDto.title;
      todo.description = createTodoDto.description;
      todo.user = user;

      return await this.todosRepository.save(todo);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(userId: number): Promise<any> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {id: userId},
      });
      return await this.todosRepository
        .createQueryBuilder('todos')
        .leftJoin('todos.user', 'user')
        .where('todos.user = :userId', {userId})
        .getMany();
    } catch (error) {}
  }

  async findOne(id: number): Promise<Todos> {
    try {
      return await this.todosRepository.findOneOrFail({where: {id}});
    } catch (error) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todos> {
    const todo = await this.findOne(id);
    todo.title = updateTodoDto.title;
    todo.description = updateTodoDto.description;
    return await this.todosRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
