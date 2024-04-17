import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as http from 'http';
import { join } from 'path';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IoAdapter } from '@nestjs/platform-socket.io/adapters';

async function bootstrap() {
  const port = process.env.PORT || 3312; // 포트 설정
  const app = await NestFactory.create<NestApplication>(AppModule);

  // NestJS 애플리케이션의 HTTP 서버 인스턴스 가져오기
  const expressApp = app.getHttpAdapter().getInstance() as express.Application;

  // IoAdapter를 사용하여 Socket.IO 어댑터 설정
  app.useWebSocketAdapter(new IoAdapter());

  // 정적 파일을 제공하기 위한 Express 미들웨어 추가
  expressApp.use(express.static(join(__dirname, '..', 'client')));

  // CORS 옵션 설정
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);

  // NestJS 애플리케이션의 HTTP 서버를 지정된 포트로 열기
  const server = await app.listen(port);
  console.log(`Server running on port ${port}`);

  // Socket.IO 서버 생성 및 HTTP 서버와 연결
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.log('Socket.IO client connected');
    // 여기에 Socket.IO 이벤트 핸들러를 추가할 수 있습니다.
  });
}

bootstrap();
