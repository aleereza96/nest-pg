import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import { GenericRepository } from 'src/app/shared/repository/generic-repository'

@Injectable()
export class UserRepository extends GenericRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource)
  }
  
}
