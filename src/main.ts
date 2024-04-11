import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

async function bootstrap() {
  // NestJS 애플리케이션 생성
  const app = await NestFactory.create(AppModule);

  //Express 애플리케이션 가져오기
  const expressApp = app.getHttpAdapter().getInstance() as express.Application;

  const httpServer = http.createServer(expressApp);

  // NestJS에서 WebSocket을 사용할 수 있도록 어댑터 설정
  app.useWebSocketAdapter(new WsAdapter(httpServer));

  // NestJS 애플리케이션의 HTTP 서버를 3312 포트로 열기
  await app.listen(3312);

  // Socket.IO 서버 인스턴스 생성
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  });

  // // 정적 파일을 제공하기 위한 Express 미들웨어 추가
  // expressApp.use(express.static('src'));

  // Socket.IO 서버를 4000 포트로 열기
  httpServer.listen(4000, () => {
    console.log('Socket.IO server running on port 4000');
  });
}

bootstrap();
