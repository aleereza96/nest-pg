import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty({
    type: String,
    description: 'username of the user',
  })
  username: string

  @ApiProperty({
    type: String,
    description: 'id of the user',
  })
  id: string
}
