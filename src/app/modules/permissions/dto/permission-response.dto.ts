import { ApiProperty } from '@nestjs/swagger'

export class PermissionResponseDto {
  @ApiProperty({
    type: String,
    description: 'id of the permission',
  })
  id: string

  @ApiProperty({
    type: String,
    description: 'Slug of the permission',
  })
  slug: string

  @ApiProperty({
    type: String,
    description: 'Description of the permission',
  })
  description: string

  @ApiProperty({
    type: String,
    description: 'active property of the permission',
  })
  active: boolean
}
