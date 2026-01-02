import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created successfully' })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'List of all todos' })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Todo found' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Todo updated successfully' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Todo deleted successfully' })
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
