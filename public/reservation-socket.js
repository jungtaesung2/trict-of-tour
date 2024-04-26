const resevationSocket = io('http://localhost:4200', {
  path: '/socket.io/', // socket.io 경로 설정, Socket.IO는 기본적으로 "/socket.io/" 경로를 사용하여 서버와 클라이언트 간의 통신을 처리한다.
  transports: ['websocket'], // websocket을 사용하여 통신하겠다고 지정
});

const reservationmessage = document.getElementById('message');
const reservationMessages = document.getElementById('messages');

resevationSocket.on('connect', () => {
  console.log('서버에 연결되었습니다.');
});

resevationSocket.on('reservationCreated', (data) => {
  console.log('예약이 생성되었습니다.');
  console.log('예약 정보:', data.reservation);
  console.log('예약 내역을 확인하러 가는 링크:', data.reservationUrl);
});

resevationSocket.on('reservationCancelled', (data) => {
  console.log('예약이 취소되었습니다.');
  console.log('취소된 예약 ID:', data.id);
  console.log('취소 날짜:', data.cancellationDate);
});

resevationSocket.on('disconnect', () => {
  console.log('서버와의 연결이 끊어졌습니다.');
});
