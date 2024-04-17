import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  console.log('레디스연결확인', redisIoAdapter);

  // CORS 설정
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4000'], // 허용할 오리진 설정
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 인증 정보를 포함할지 여부
  });

  const expressApp = app.getHttpAdapter().getInstance() as express.Application;
  // 정적 파일을 제공하기 위한 Express 미들웨어 추가
  expressApp.use(express.static(join(__dirname, '..', 'client')));

  await app.listen(3312); // Main application listens on port 3312
  console.log('Main application is running on port 3312');
}

bootstrap();
