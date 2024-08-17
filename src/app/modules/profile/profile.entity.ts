import { BaseEntity } from 'src/app/shared/entities/base-entity'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from '../user/user.entity'

@Entity('profile')
export class Profile extends BaseEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  avatar: string

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: number
}
