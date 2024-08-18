import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator"
import { EqualsProperty } from "src/app/shared/helpers/utils"


export class RegisterDto {
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
  @IsString()
  @MinLength(4)
  @IsStrongPassword()
  password: string

  @ApiProperty({
    type: String,
    required: true,
    description: 'confirm password of the user',
  })
  @IsNotEmpty()
  @EqualsProperty('password')
  confirmPassword: string
}
