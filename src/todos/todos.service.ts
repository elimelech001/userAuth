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

  async update(
    postId: number,
    updateTodoDto: UpdateTodoDto,
    userId: number,
  ): Promise<UpdateTodoDto> {
    const todo = await this.todosRepository.findOne({
      where: {id: postId},
      relations: ['user'],
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${postId} not found`);
    }

    console.log(userId == todo.user.id);

    if (userId != todo.user.id) {
      throw new UnauthorizedException('you did not create this todo');
    }

    todo.title = updateTodoDto.title;
    todo.description = updateTodoDto.description;
    const {user, ...updatedTodo} = await this.todosRepository.save(todo);
    return updatedTodo;
  }

  async remove(id: number, userId: number): Promise<void> {
    const todo = await this.todosRepository.findOne({
      where: {id},
      relations: ['user'],
    });
    if (!todo) {
      throw new NotFoundException('no todo posted');
    }
    console.log(todo);

    // if (userId != todo.user.id) {
    //   throw new UnauthorizedException('you did not create this todo')
    // }
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
