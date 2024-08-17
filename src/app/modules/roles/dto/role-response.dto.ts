import { ApiProperty } from '@nestjs/swagger'
import { Permission } from '../../permissions/permission.entity'
import { PermissionResponseDto } from '../../permissions/dto/permission-response.dto'

export class RoleResponseDto {
  @ApiProperty({
    type: String,
    description: 'id of the user',
  })
  id: string

  @ApiProperty({
    type: String,
    required: true,
    description: 'name of the role',
  })
  name: string

  @ApiProperty({
    type: String,
    required: true,
    description: 'description of the role',
  })
  description?: string

  @ApiProperty({
    type: [PermissionResponseDto],
    required: true,
    description: 'permissions of the role',
  })
  permissions: PermissionResponseDto[]
}
