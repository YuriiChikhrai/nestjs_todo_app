import { Injectable, Inject } from '@nestjs/common';
import { createTodoDto } from './dto/create_todo.dto';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodoList(user: string) {
    return this.todoRepository.getList(user);
  }

  addTodo(body: createTodoDto, user: string) {
    return this.todoRepository.addTask(body.value, user);
  }

  removeTodo(id: number, user: string) {
    return this.todoRepository.removeTask(id, user);
  }

  updateTodo(id: number, user: string, data: createTodoDto) {
    return this.todoRepository.updateTask(id, user, data);
  }

  toggleTodo(id: number, user: string) {
    return this.todoRepository.toggleTask(id, user);
  }
}
