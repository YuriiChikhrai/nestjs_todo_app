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
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto } from './dto/create_todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/current_user';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

@ApiTags('todo')
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
  required: true,
  example:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoieXVyYSIsImJyb3dzZXIiOiJQb3N0bWFuUnVudGltZS83LjIwLjEiLCJpcCI6Ijo6MSIsImlzc3VlciI6Imh0dHBzOi8vdG9kby5oaWxsZWwuaXQiLCJtYXhBZ2UiOiI3ZCIsImlhdCI6MTU3NTI0MTgxMH0.BuNzt06wE559-gQNwZPSVKEKGZoMJxFjZdxZSI4SxtI',
})
@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodoList(@CurrentUser() user: string) {
    return this.todoService.getTodoList(user);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  addTodoTask(
    @CurrentUser() user: string,
    @Body() createTodoDto: createTodoDto,
  ) {
    return this.todoService.addTodo(createTodoDto, user);
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  delteTodoTask(
    @CurrentUser() user: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todoService.removeTodo(id, user);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateTodoTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: createTodoDto,
    @CurrentUser() user: string,
  ) {
    return this.todoService.updateTodo(id, user, data);
  }

  @Put('/:id/toggle')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  toggleTodoTask(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.toggleTodo(id, 'test');
  }
}
