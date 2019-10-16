import { MinLength } from 'class-validator';

export class createTodoDto {
  @MinLength(1)
  value: string;
}
