import { ApiProperty } from '@nestjs/swagger'

export class ProfileResponseDto {
  @ApiProperty({
    type: String,
    description: 'id of the profile',
  })
  id: string

  @ApiProperty({
    type: String,
    description: 'First name of the profile',
  })
  firstName: string

  @ApiProperty({
    type: String,
    description: 'Last name of the profile',
  })
  lastName: string

  @ApiProperty({
    type: String,
    description: 'Email of the profile',
  })
  email: string

  @ApiProperty({
    type: String,
    description: 'avatar of the profile',
  })
  avatar: string
}
