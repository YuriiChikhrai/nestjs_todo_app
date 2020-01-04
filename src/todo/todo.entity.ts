import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TODO extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ length: 500 })
  user: string;

  @Column({ type: 'text', length: 500 })
  value: string;

  @Column({ default: false })
  checked: boolean;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ type: Date, default: Date.now })
  addedAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @Column({ type: Date, default: null, nullable: true })
  updatedAt: Date;
}
