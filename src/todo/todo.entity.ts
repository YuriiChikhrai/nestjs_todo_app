import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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

  @Column({ type: Date, default: Date.now })
  addedAt: Date;

  @Column({ type: Date, default: null, nullable: true })
  updatedAt: Date;
}
