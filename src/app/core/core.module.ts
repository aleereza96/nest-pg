import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { CacheManagerModule } from './cache/cache-manager.module'

@Module({
  imports: [DatabaseModule, CacheManagerModule],
})
export class CoreModule {}
