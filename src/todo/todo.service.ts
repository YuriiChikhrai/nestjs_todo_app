import { Injectable } from '@nestjs/common';
import { TodoModel } from './todo.model';
import { createTodoDto } from './dto/create_todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoModel: TodoModel) {}

  getTodoList(user?: string) {
    return this.todoModel.getList(user);
  }

  addTodo(body: createTodoDto, user: string) {
    return this.todoModel.addTask({ ...body, user });
  }

  removeTodo(id: number, user: string) {
    return this.todoModel.removeTask(id, user);
  }

  updateTodo(id: number, user: string, data: createTodoDto) {
    return this.todoModel.updateTask(id, user, data);
  }

  toggleTodo(id: number, user: string) {
    return this.todoModel.toggleTask(id, user);
  }
}
