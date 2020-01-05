import { MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createTodoDto {
  @ApiProperty({
    type: 'string',
    minLength: 1,
    description: 'Task text',
    example: 'Buy license for WebStorm =)',
  })
  @MinLength(1)
  value: string;
}
