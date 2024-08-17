import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { UserMapper } from './user.mapper'
import { HashHelper } from 'src/app/shared/helpers/hash.helper'
import { UserResponseDto } from './dto/user-response.dto'
import { PaginationRequest } from 'src/app/shared/interfaces/pagination.interface'
import { Pagination } from 'src/app/shared/helpers/pagination.helper'
import { ProfileService } from '../profile/profile.service'
import { CreateProfileDto } from '../profile/dto/create-profile.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    let user = UserMapper.toCreateEntity(createUserDto)
    user.password = await HashHelper.encrypt(user.password)
    const profile = await this.createNewProfile()
    user.profileId = +profile.id
    user = await this.userRepository.save(user)
    return UserMapper.toDto(user)
  }

  public async findAll(pagination: PaginationRequest) {
    const [users, count] =
      await this.userRepository.findAllUsersAndCount(pagination)

    const responseDtos = await Promise.all(users.map(UserMapper.toDto))
    return Pagination.of(pagination, count, responseDtos)
  }

  public async findOne(id: number): Promise<UserResponseDto> {
    const userEntity = await this.userRepository.findOne({ where: { id } })
    if (!userEntity) {
      throw new NotFoundException('User Not Found!')
    }

    return UserMapper.toDto(userEntity)
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    let user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('User Not Found!')
    }
    user = UserMapper.toUpdateEntity(user, updateUserDto)
    user = await this.userRepository.save(user)
    return UserMapper.toDto(user)
  }

  public async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    const profileId = +user.profileId
    await this.profileService.remove(profileId)
    return await this.userRepository.delete(user)
  }

  private async createNewProfile() {
    const newProfileDto: CreateProfileDto = {
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
    }
    return await this.profileService.create(newProfileDto)
  }
}
