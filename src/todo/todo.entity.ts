import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TODO extends BaseEntity {
  @ApiProperty({
    type: 'number',
    readOnly: true,
    uniqueItems: true,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  _id: number;

  @ApiProperty({ type: 'string', maxLength: 500, example: 'Test user' })
  @Column({ length: 500 })
  user: string;

  @ApiProperty({
    type: 'string',
    maxLength: 500,
    example: 'Buy license for WebStorm =)',
  })
  @Column({ type: 'text', length: 500 })
  value: string;

  @ApiProperty({ type: 'boolean', default: false, example: false })
  @Column({ default: false })
  checked: boolean;

  // TODO: typeorm check column type string or number?
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    readOnly: true,
    example: Date.now(),
  })
  @Column({ type: Date, default: Date.now })
  addedAt: Date;

  // TODO: typeorm check column type string or number?
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    example: Date.now(),
  })
  @Column({ type: Date, default: null, nullable: true })
  updatedAt: Date;
}
