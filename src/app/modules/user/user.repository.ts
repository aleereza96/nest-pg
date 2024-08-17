import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from './user.entity'
import { BaseRepository } from 'src/app/shared/repository/base-repository'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource)
  }

  public async findAllUsersAndCount(
    pagination: PaginationRequest,
  ): Promise<[users: User[], count: number]> {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      joins,
      params: { keyword },
    } = pagination

    const queryBuilder = this.createQueryBuilder('user')
      .orderBy(`user.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit)

    if (joins && joins.length) {
      const joinArray = joins.split(',')
      if (joinArray.length > 0) {
        joinArray.forEach((join) => {
          queryBuilder.leftJoinAndSelect(`user.${join}`, join)
        })
      }
    }

    if (keyword) {
      queryBuilder.where('user.username LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
    }

    return queryBuilder.getManyAndCount()
  }
}
