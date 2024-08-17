import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProfileDto } from './dto/create-profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ProfileRepository } from './profile.repository'
import { ProfileMapper } from './profile.mapper'
import { ProfileResponseDto } from './dto/profile-response.dto'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async create(
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileResponseDto> {
    let profile = ProfileMapper.toCreateEntity(createProfileDto)

    profile = await this.profileRepository.save(profile)
    return ProfileMapper.toDto(profile)
  }

  public async findOne(id: number): Promise<ProfileResponseDto> {
    const profileEntity = await this.profileRepository.findOne({
      where: { id },
    })
    if (!profileEntity) {
      throw new NotFoundException('Profile Not Found!')
    }

    return ProfileMapper.toDto(profileEntity)
  }

  public async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    let profile = await this.profileRepository.findOne({ where: { id } })
    if (!profile) {
      throw new NotFoundException('Profile Not Found!')
    }
    profile = ProfileMapper.toUpdateEntity(profile, updateProfileDto)
    profile = await this.profileRepository.save(profile)
    return ProfileMapper.toDto(profile)
  }

  public async remove(id: number) {
    const profile = await this.profileRepository.findOne({ where: { id } })
    return await this.profileRepository.delete(profile)
  }
}
