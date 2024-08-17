import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Permission } from './permission.entity'
import { BaseRepository } from 'src/app/shared/repository/base-repository'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource)
  }

  public async findAllPermissionsAndCount(
    pagination: PaginationRequest,
  ): Promise<[permissions: Permission[], count: number]> {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      params: { keyword, active },
    } = pagination

    const queryBuilder = this.createQueryBuilder('permission')
      .orderBy(`permission.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit)
    let whereApplied = false

    if (keyword) {
      queryBuilder.where('permission.slug LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      whereApplied = true
    }
    if (active !== null) {
      const method = whereApplied ? 'andWhere' : 'where'
      queryBuilder[method]('permission.active = :active', { active })
    }

    return queryBuilder.getManyAndCount()
  }
}
