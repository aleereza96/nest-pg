import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IBaseEntity } from '../interfaces/base-entity.interface'

export abstract class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: 'now()',
    update: false,
    nullable: false,
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: 'now()',
    onUpdate: 'now()',
    nullable: false,
  })
  updatedAt: Date
}
