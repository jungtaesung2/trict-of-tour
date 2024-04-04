import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { Redis } from 'ioredis';

@Module({
  imports: [ConfigModule],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService): Redis => {
        const redisOptions = {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          // Add other options as needed
        };
        return new Redis(redisOptions);
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
