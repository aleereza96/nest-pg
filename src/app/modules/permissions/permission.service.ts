import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PermissionRepository } from './permission.repository'
import { PermissionMapper } from './permission.mapper'
import { PermissionResponseDto } from './dto/permission-response.dto'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'
import { Pagination } from 'src/app/shared/helpers/pagination.helper'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async findAll(pagination: PaginationRequest) {
    const [permissions, count] =
      await this.permissionRepository.findAllPermissionsAndCount(pagination)

    const responseDtos = await Promise.all(permissions.map(PermissionMapper.toDto))
    return Pagination.of(pagination, count, responseDtos)
  }

  public async findOne(id: number): Promise<PermissionResponseDto> {
    const permissionEntity = await this.permissionRepository.findOne({ where: { id } })
    if (!permissionEntity) {
      throw new NotFoundException('Permission Not Found!')
    }

    return PermissionMapper.toDto(permissionEntity)
  }
}
