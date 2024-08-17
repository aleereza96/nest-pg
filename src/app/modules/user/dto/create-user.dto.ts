import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator"


export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'username of the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    type: String,
    required: true,
    description: 'password of the user',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string
}
