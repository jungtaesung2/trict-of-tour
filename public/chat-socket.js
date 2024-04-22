const socket = io('http://localhost:4000', {
  path: '/socket.io/', // socket.io 경로 설정, Socket.IO는 기본적으로 "/socket.io/" 경로를 사용하여 서버와 클라이언트 간의 통신을 처리한다.
  transports: ['websocket'], // websocket을 사용하여 통신하겠다고 지정
});

const messageInput = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
  const message = messageInput.value;
  const room = 'general';
  socket.emit('chatMessage', { message, room });
  messageInput.value = '';
};

socket.emit('setnickName');
socket.on('nickName', (nickName) => {
  const nickNameElement = document.getElementById('nickName');
  nickNameElement.textContent = `닉네임: ${nickName}`;
  handleUserNickName(nickName);
});

// 방에 조인
const roomName = 'roomName'; // 조인할 방의 이름을 설정하세요
const nickName = 'yourNickName'; // 유저의 닉네임을 설정하세요
socket.emit('join', { room: roomName, nick: nickName });

// 방에서 나가욤
socket.emit('exit', roomName);

socket.on('chatMessage', (data) => {
  handleChatMessage(data.userId, data.message);
});

const handleChatMessage = (userId, message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(`${userId}: ${message}`));
  messages.appendChild(li);
};
