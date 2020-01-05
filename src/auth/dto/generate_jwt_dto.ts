import { MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class receiveLoginDto {
  @ApiProperty({
    type: 'string',
    minLength: 1,
    maxLength: 100,
    description: 'Unique user identificator',
    example: 'Test user',
  })
  @MinLength(1)
  @MaxLength(100)
  value: string;
}
