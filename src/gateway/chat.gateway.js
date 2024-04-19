// chat.gateway.js

class ChatGateway {
  constructor() {
    this.connectedClients = {};
    this.clientNickName = {};
    this.roomUsers = {};
  }

  handleConnection(client) {
    if (this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }
    this.connectedClients[client.id] = true;
    console.log('New client connected');
  }

  handleSetNickName(client, nick) {
    this.clientNickName[client.id] = nick;
    console.log('닉네임 설정', nick);
  }

  handleJoin(client, room) {
    if (client.rooms.has(room)) {
      return;
    }
    client.join(room);
    if (!this.roomUsers[room]) {
      this.roomUsers[room] = [];
    }
    this.roomUsers[room].push(this.clientNickName[client.id]);
    client.emit('userjoined', {
      userId: this.clientNickName[client.id],
      room: room,
    });
    client.emit('userList', { room: room, userList: this.roomUsers[room] });
    client.emit('userList', {
      room: null,
      userList: Object.keys(this.connectedClients),
    });
  }

  handleExist(client, room) {
    if (!client.rooms.has(room)) {
      return;
    }
    client.leave(room);
    const index = this.roomUsers[room].indexOf(this.clientNickName[client.id]);
    if (index !== -1) {
      this.roomUsers[room].splice(index, 1);
      client.emit('userLeft', { userId: this.clientNickName[client.id] });
      client.emit('userList', { room: room, userList: this.roomUsers[room] });
      client.emit('userList', {
        room: null,
        userList: Object.keys(this.connectedClients),
      });
    }
  }

  handleGetUserList(client, room) {
    client.emit('userList', { room: room, userList: this.roomUsers[room] });
  }

  handleMessage(client, data) {
    client.to(data.room).emit('chatMessage', {
      userId: this.clientNickName[client.id],
      message: data.message,
      room: data.room,
    });
  }
}

// 클래스를 직접 내보냅니다.
window.ChatGateway = ChatGateway;
