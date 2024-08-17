import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { User } from './entities/user.entity'

export class UserMapper {
  public static async toDto(entity: User): Promise<UserResponseDto> {
    const dto = new UserResponseDto()

    dto.id = `${entity.id}`
    dto.username = entity.username
    return dto
  }

  public static toCreateEntity(dto: CreateUserDto): User {
    const entity = new User()
    entity.username = dto.username
    entity.password = dto.password
    return entity
  }

  public static toUpdateEntity(entity: User, dto: UpdateUserDto): User {
    entity.username = dto.username

    return entity
  }
}
