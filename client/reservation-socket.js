const socket = io('http://localhost:4000', { transports: ['websocket'] }); // 서버주소가 http 프로토콜임을 유의

const message = document.getElementById('message');
const messages = document.getElementById('messages');

socket.on('connect', () => {
  console.log('서버에 연결되었습니다.');
});

socket.on('reservationCreated', (data) => {
  console.log('예약이 생성되었습니다.');
  console.log('예약 정보:', data.reservation);
  console.log('예약 내역을 확인하러 가는 링크:', data.reservationUrl);
});

socket.on('reservationCancelled', (data) => {
  console.log('예약이 취소되었습니다.');
  console.log('취소된 예약 ID:', data.id);
  console.log('취소 날짜:', data.cancellationDate);
});

socket.on('disconnect', () => {
  console.log('서버와의 연결이 끊어졌습니다.');
});
