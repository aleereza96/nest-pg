import { PermissionResponseDto } from './dto/permission-response.dto'
import { Permission } from './permission.entity'

export class PermissionMapper {
  public static async toDto(
    entity: Permission,
  ): Promise<PermissionResponseDto> {
    const dto = new PermissionResponseDto()
    dto.id = `${entity.id}`
    dto.slug = entity.slug
    dto.description = entity.description
    dto.active = entity.active
    return dto
  }
}
