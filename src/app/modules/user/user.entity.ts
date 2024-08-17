import { BaseEntity } from "src/app/shared/entities/base-entity"
import { Column, Entity } from "typeorm"


@Entity('user')
export class User extends BaseEntity{
  @Column()
  username: string
  
  @Column({select:false})
  password:string
}