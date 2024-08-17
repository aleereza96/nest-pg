import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Role } from './role.entity'
import { BaseRepository } from 'src/app/shared/repository/base-repository'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource)
  }

  public async findAllRolesAndCount(
    pagination: PaginationRequest,
  ): Promise<[roles: Role[], count: number]> {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      joins,
      params: { keyword },
    } = pagination

    const queryBuilder = this.createQueryBuilder('role')
      .orderBy(`role.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit)

    if (joins && joins.length) {
      const joinArray = joins.split(',')
      if (joinArray.length > 0) {
        joinArray.forEach((join) => {
          queryBuilder.leftJoinAndSelect(`role.${join}`, join)
        })
      }
    }

    if (keyword) {
      queryBuilder.where('role.name LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
    }

    return queryBuilder.getManyAndCount()
  }

  public async findOneRole(id: number) {
    return await this.findOne({ where: { id }, relations: ['permissions'] })
  }
}
