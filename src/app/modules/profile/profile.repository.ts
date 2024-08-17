import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Profile } from './profile.entity'
import { BaseRepository } from 'src/app/shared/repository/base-repository'

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor(private dataSource: DataSource) {
    super(Profile, dataSource)
  }
}
