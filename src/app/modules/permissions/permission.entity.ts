import { BaseEntity } from 'src/app/shared/entities/base-entity'
import { Column, Entity } from 'typeorm'

@Entity('permission')
export class Permission extends BaseEntity {
  @Column({
    unique: true,
  })
  slug: string

  @Column()
  description: string

  @Column()
  active: boolean
}
