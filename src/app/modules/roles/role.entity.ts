import { BaseEntity } from 'src/app/shared/entities/base-entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { User } from '../user/user.entity'
import { Permission } from '../permissions/permission.entity'

@Entity('role')
export class Role extends BaseEntity {
  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @ManyToMany(() => User)
  users: User[]

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'REL_SYSTEM_ROLE_PERMISSION' })
  permissions: Permission[]
}
