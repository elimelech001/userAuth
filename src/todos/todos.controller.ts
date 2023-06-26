import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import {TodosService} from './todos.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {ApiTags, ApiOperation, ApiResponse, ApiParam} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({summary: 'Create a new todo'})
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created',
  })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todosService.create(createTodoDto, req.user.id);
  }

  @ApiOperation({summary: 'Get all todos'})
  @ApiResponse({status: 200, description: 'Returns an array of todos'})
  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req.user.id);
  }

  @ApiOperation({summary: 'Get a specific todo by ID'})
  @ApiParam({name: 'id', type: 'number'})
  @ApiResponse({status: 200, description: 'Returns the specified todo'})
  @ApiResponse({status: 404, description: 'Todo not found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @ApiOperation({summary: 'Update a specific todo by ID'})
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated',
  })
  @ApiResponse({status: 404, description: 'Todo not found'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto,@Request() req) {
    return this.todosService.update(+id, updateTodoDto,req.user.id);
  }

  @ApiOperation({summary: 'Delete a specific todo by ID'})
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully removed',
  })
  @ApiResponse({status: 404, description: 'Todo not found'})
  @Delete(':id')
  remove(@Param('id') id: string,@Request() req) {
    return this.todosService.remove(+id,req.user.id);
  }
}
