import { CreateUserDto } from '../user/dto/create-user.dto'
import { RegisterDto } from './dto/register.dto'

export class AuthMapper {
  public static toCreateUserDto(dto: RegisterDto): CreateUserDto {
    const userDto = new CreateUserDto()
    userDto.username = dto.username
    userDto.password = dto.password
    return userDto
  }
}
