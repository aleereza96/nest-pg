import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleResponseDto } from './dto/role-response.dto'
import { Role } from './role.entity'
import { PermissionMapper } from '../permissions/permission.mapper'
import { Permission } from '../permissions/permission.entity'

export class RoleMapper {
  public static async toDto(entity: Role): Promise<RoleResponseDto> {
    const dto = new RoleResponseDto()
    dto.id = `${entity.id}`
    dto.name = entity.name
    dto.description = entity.description
    return dto
  }

  public static async toDtoWithRelations(
    entity: Role,
  ): Promise<RoleResponseDto> {
    const dto = new RoleResponseDto()
    dto.id = `${entity.id}`
    dto.name = entity.name
    dto.permissions = await Promise.all(
      entity.permissions.map(PermissionMapper.toDto),
    )
    dto.description = entity.description
    return dto
  }

  public static toCreateEntity(dto: CreateRoleDto): Role {
    const entity = new Role()
    entity.name = dto.name
    entity.permissions = dto.permissions.map(
      (id) => new Permission({ id: +id }),
    )
    entity.description = dto.description
    return entity
  }

  public static toUpdateEntity(entity: Role, dto: UpdateRoleDto): Role {
    entity.name = dto.name
    entity.permissions = dto.permissions.map(
      (id) => new Permission({ id: +id }),
    )
    entity.description = dto.description
    return entity
  }
}
