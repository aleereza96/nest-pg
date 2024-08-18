
import { UserResponseDto } from "../../user/dto/user-response.dto"
import { TokenDto } from "./token.dto"

export class AuthResponseDto {
  user: UserResponseDto
  permissions: string[]
  token: TokenDto
}
