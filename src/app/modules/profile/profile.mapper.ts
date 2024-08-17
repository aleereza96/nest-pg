import { CreateProfileDto } from './dto/create-profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { ProfileResponseDto } from './dto/profile-response.dto'
import { Profile } from './profile.entity'

export class ProfileMapper {
  public static async toDto(entity: Profile): Promise<ProfileResponseDto> {
    const dto = new ProfileResponseDto()
    dto.id = `${entity.id}`
    dto.firstName = entity.firstName
    dto.lastName = entity.lastName
    dto.email = entity.email
    dto.avatar = entity.avatar
    return dto
  }

  public static toCreateEntity(dto: CreateProfileDto): Profile {
    const entity = new Profile()
    entity.firstName = dto.firstName
    entity.lastName = dto.lastName
    entity.email = dto.email
    entity.avatar = dto.avatar

    return entity
  }

  public static toUpdateEntity(
    entity: Profile,
    dto: UpdateProfileDto,
  ): Profile {
    entity.firstName = dto.firstName
    entity.lastName = dto.lastName
    entity.email = dto.email
    entity.avatar = dto.avatar
    return entity
  }
}
