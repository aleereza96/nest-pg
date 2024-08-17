import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleRepository } from './role.repository'
import { RoleMapper } from './role.mapper'
import { RoleResponseDto } from './dto/role-response.dto'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'
import { Pagination } from 'src/app/shared/helpers/pagination.helper'
import { CreateProfileDto } from '../profile/dto/create-profile.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) {}

  public async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    let role = RoleMapper.toCreateEntity(createRoleDto)

    role = await this.roleRepository.save(role)
    return RoleMapper.toDto(role)
  }

  public async findAll(pagination: PaginationRequest) {
    const [roles, count] =
      await this.roleRepository.findAllRolesAndCount(pagination)

    const responseDtos = await Promise.all(roles.map(RoleMapper.toDto))
    return Pagination.of(pagination, count, responseDtos)
  }

  public async findOne(id: number): Promise<RoleResponseDto> {
    const roleEntity = await this.roleRepository.findOneRole(id)
    if (!roleEntity) {
      throw new NotFoundException('Role Not Found!')
    }

    return RoleMapper.toDto(roleEntity)
  }

  public async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    let role = await this.roleRepository.findOneRole(id)
    if (!role) {
      throw new NotFoundException('Role Not Found!')
    }
    role = RoleMapper.toUpdateEntity(role, updateRoleDto)
    role = await this.roleRepository.save(role)
    return RoleMapper.toDto(role)
  }

  public async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } })
    return await this.roleRepository.delete(role)
  }
}
