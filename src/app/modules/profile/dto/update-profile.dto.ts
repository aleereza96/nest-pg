import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class UpdateProfileDto {
  @ApiProperty({
    type: String,
    description: 'First name of the profile',
  })
  @IsString()
  firstName?: string

  @ApiProperty({
    type: String,
    description: 'Last name of the profile',
  })
  @IsString()
  lastName?: string

  @ApiProperty({
    type: String,
    description: 'Email of the profile',
  })
  @IsEmail()
  email?: string

  @ApiProperty({
    type: String,
    description: 'avatar of the profile',
  })
  @IsString()
  avatar?: string
}
