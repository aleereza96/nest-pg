import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'name of the role',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    type: String,
    required: true,
    description: 'description of the role',
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    type: Array,
    required: true,
    description: 'permissions of the role',
  })
  @IsArray()
  @IsOptional()
  permissions?: string[]
}
