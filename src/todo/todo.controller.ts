import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto } from './dto/create_todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodoList() {
    return this.todoService.getTodoList();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  addTodoTask(@Body() createTodoDto: createTodoDto) {
    return this.todoService.addTodo(createTodoDto, 'test');
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  delteTodoTask(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.removeTodo(id, 'test');
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateTodoTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: createTodoDto,
  ) {
    return this.todoService.updateTodo(id, 'test', data);
  }

  @Put('/:id/toggle')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  toggleTodoTask(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.toggleTodo(id, 'test');
  }
}
