import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoModel } from './todo.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TodoController],
  providers: [TodoService, TodoModel],
})
export class TodoModule {}
