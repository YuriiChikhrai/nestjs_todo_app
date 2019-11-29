import { MinLength, MaxLength } from 'class-validator';

export class receiveLoginDto {
  @MinLength(1)
  @MaxLength(100)
  value: string;
}
