"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var ChatGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)(4000, { namespace: 'chat' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleConnection_decorators;
    var _handleSetNickName_decorators;
    var _handleJoin_decorators;
    var _handleExist_decorators;
    var _handleGetUserList_decorators;
    var _handleMessage_decorators;
    var ChatGateway = _classThis = /** @class */ (function () {
        function ChatGateway_1() {
            this.server = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _server_initializers, void 0));
            this.connectedClients = (__runInitializers(this, _server_extraInitializers), {});
            this.clientNickName = {};
            this.roomUsers = {};
        }
        ChatGateway_1.prototype.handleConnection = function (client) {
            // 이미 연결된 클라이언트인지 확인
            if (this.connectedClients[client.id]) {
                client.disconnect(true);
                return;
            }
            this.connectedClients[client.id] = true;
            console.log('New client connected');
        };
        ChatGateway_1.prototype.handleSetNickName = function (client, nick) {
            this.clientNickName[client.id] = nick;
            console.log('닉네임 설정', nick);
        };
        ChatGateway_1.prototype.handleJoin = function (client, room) {
            if (client.rooms.has(room)) {
                return;
            }
            client.join(room);
            if (!this.roomUsers[room]) {
                this.roomUsers[room] = [];
            }
            this.roomUsers[room].push(this.clientNickName[client.id]);
            this.server
                .to(room)
                .emit('userjoined', { userId: this.clientNickName[client.id], room: room });
            this.server
                .to(room)
                .emit('userList', { room: room, userList: this.roomUsers[room] });
            this.server.emit('userList'),
                { room: null, userList: Object.keys(this.connectedClients) };
        };
        ChatGateway_1.prototype.handleExist = function (client, room) {
            var _a;
            // 방에 접속되어 있지 않은 경우 무시!!!
            if (!client.rooms.has(room)) {
                return;
            }
            client.leave(room);
            var index = (_a = this.roomUsers[room]) === null || _a === void 0 ? void 0 : _a.indexOf(this.clientNickName[client.id]);
            {
                this.roomUsers[room].splice(index, 1);
                this.server.to(room).emit('userLeft'),
                    { userId: this.clientNickName[client.id] };
                // 떠난 이후 방에 남아 있는 있는 userList 에도 반영이 될테니깐
                this.server
                    .to(room)
                    .emit('userList', { room: room, userList: this.roomUsers[room] });
                // 모든 방의 유저 목록을 업데이트하여 emit
                this.server.emit('userList', {
                    room: null,
                    userList: Object.keys(this.connectedClients),
                });
            }
        };
        ChatGateway_1.prototype.handleGetUserList = function (client, room) {
            this.server
                .to(room)
                .emit('userList', { room: room, userList: this.roomUsers[room] });
        };
        ChatGateway_1.prototype.handleMessage = function (client, data) {
            // 클라이언트가 보낸 채팅 메시지를 해당 방으로 전달하기!
            this.server.to(data.room).emit('chatMessage', {
                userId: this.clientNickName[client.id],
                message: data.message,
                room: data.room,
            });
        };
        return ChatGateway_1;
    }());
    __setFunctionName(_classThis, "ChatGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleConnection_decorators = [];
        _handleSetNickName_decorators = [(0, websockets_1.SubscribeMessage)('setnickName')];
        _handleJoin_decorators = [(0, websockets_1.SubscribeMessage)('join')];
        _handleExist_decorators = [(0, websockets_1.SubscribeMessage)('exit')];
        _handleGetUserList_decorators = [(0, websockets_1.SubscribeMessage)('getUserList')];
        _handleMessage_decorators = [(0, websockets_1.SubscribeMessage)('chatMessage')];
        __esDecorate(_classThis, null, _handleConnection_decorators, { kind: "method", name: "handleConnection", static: false, private: false, access: { has: function (obj) { return "handleConnection" in obj; }, get: function (obj) { return obj.handleConnection; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleSetNickName_decorators, { kind: "method", name: "handleSetNickName", static: false, private: false, access: { has: function (obj) { return "handleSetNickName" in obj; }, get: function (obj) { return obj.handleSetNickName; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleJoin_decorators, { kind: "method", name: "handleJoin", static: false, private: false, access: { has: function (obj) { return "handleJoin" in obj; }, get: function (obj) { return obj.handleJoin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleExist_decorators, { kind: "method", name: "handleExist", static: false, private: false, access: { has: function (obj) { return "handleExist" in obj; }, get: function (obj) { return obj.handleExist; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleGetUserList_decorators, { kind: "method", name: "handleGetUserList", static: false, private: false, access: { has: function (obj) { return "handleGetUserList" in obj; }, get: function (obj) { return obj.handleGetUserList; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMessage_decorators, { kind: "method", name: "handleMessage", static: false, private: false, access: { has: function (obj) { return "handleMessage" in obj; }, get: function (obj) { return obj.handleMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatGateway = _classThis;
}();
exports.ChatGateway = ChatGateway;
