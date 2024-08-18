import { BaseEntity } from "src/app/shared/entities/base-entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm"
import { Profile } from "../profile/profile.entity"
import { Role } from "../roles/role.entity"


@Entity('user')
export class User extends BaseEntity {
  @Column()
  username: string

  @Column({ select: false })
  password: string

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'profileId' })
  profile: Profile

  @Column()
  profileId: number

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'REL_USER_ROLE',
  })
  roles: Role[]
}