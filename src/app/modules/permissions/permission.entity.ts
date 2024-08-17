import { BaseEntity } from 'src/app/shared/entities/base-entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Role } from '../roles/role.entity'

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

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({
    name: 'REL_PERMISSION_ROLE',
  })
  roles: Role[]

  constructor(permission?: Partial<Permission>) {
    super()
    Object.assign(this, permission)
  }
}
