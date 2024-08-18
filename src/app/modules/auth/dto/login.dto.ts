import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Username of the user',
  })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({
    type: String,
    required: true,
    description: 'password of the user',
  })
  @IsNotEmpty()
  password: string
}
