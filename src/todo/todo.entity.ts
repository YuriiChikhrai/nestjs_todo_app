import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeUpdate,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['user', 'value'], { unique: true })
export class TODO extends BaseEntity {
  @ApiProperty({
    type: 'number',
    readOnly: true,
    uniqueItems: true,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  @Index()
  _id: number;

  // TODO: create one-to-one relation
  @ApiProperty({ type: 'string', maxLength: 500, example: 'Test user' })
  @Column({ length: 500, update: false })
  @Index()
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

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    readOnly: true,
    example: new Date().toISOString(),
  })
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  addedAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    example: new Date().toISOString(),
  })
  @Column({ type: 'datetime', default: null, nullable: true, insert: false })
  updatedAt: Date;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
}
