import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { RedisClientOptions } from 'redis'
import { redisStore } from 'cache-manager-redis-yet'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          url: configService.get('cache.redisUrl'),
          ttl: configService.get('cache.ttl'),
        }),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class CacheManagerModule {}
