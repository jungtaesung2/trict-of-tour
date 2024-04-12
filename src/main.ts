import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as express from 'express';
import * as http from 'http';
import { join } from 'path';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IoAdapter } from '@nestjs/platform-socket.io/adapters';

async function bootstrap() {
  const port = process.env.RUN_PORT;
  const port2 = process.env.CONNECT_PORT;
  const app = await NestFactory.create<NestApplication>(AppModule);
  const expressApp = app.getHttpAdapter().getInstance() as express.Application;

  const httpServer = http.createServer(expressApp);

  // NestJS에서 WebSocket을 사용할 수 있도록 어댑터 설정
  app.useWebSocketAdapter(new WsAdapter(httpServer));
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useWebSocketAdapter(new WsAdapter());

  // NestJS 애플리케이션의 HTTP 서버를 3312 포트로 열기
  await app.listen(port);
  console.log('http server running on port 3312');

  // Socket.IO 서버 인스턴스 생성
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.useWebSocketAdapter(new IoAdapter(app));

  // 정적 파일을 제공하기 위한 Express 미들웨어 추가
  expressApp.use(express.static(join(__dirname, '..', 'client')));

  // Socket.IO 서버를 4000 포트로 열기
  httpServer.listen(port2, () => {
    console.log('Socket.IO server running on port 4000');
  });
}

bootstrap();
