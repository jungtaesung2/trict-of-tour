import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // RedisIoAdapter 생성
  const redisIoAdapter = new RedisIoAdapter(app);

  // Redis 연결
  await redisIoAdapter.connectToRedis();

  // WebSocket 어댑터로 사용할 RedisIoAdapter 설정
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3312);
}
bootstrap();
