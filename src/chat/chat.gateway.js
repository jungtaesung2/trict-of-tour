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
    var _classDecorators = [(0, websockets_1.WebSocketGateway)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _creat_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _remove_decorators;
    var _handleMessage_decorators;
    var ChatGateway = _classThis = /** @class */ (function () {
        function ChatGateway_1(chatService) {
            this.chatService = (__runInitializers(this, _instanceExtraInitializers), chatService);
        }
        ChatGateway_1.prototype.creat = function (createChatDto) {
            return this.chatService.create(createChatDto);
        };
        ChatGateway_1.prototype.findAll = function () {
            return this.chatService.findAllchat();
        };
        ChatGateway_1.prototype.findOne = function (id) {
            return this.chatService.findOnebyId(id);
        };
        // // 업데이트
        // @SubscribeMessage('')
        // update(@MessageBody() id: number , updateChatDto: UpdateChatDto) {
        //   return this.chatService.update(id, updateChatDto);
        // }
        ChatGateway_1.prototype.remove = function (id) {
            return this.chatService.remove(id);
        };
        ChatGateway_1.prototype.handleMessage = function (client, payload) {
            return 'Hello world!';
        };
        return ChatGateway_1;
    }());
    __setFunctionName(_classThis, "ChatGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _creat_decorators = [(0, websockets_1.SubscribeMessage)('createChat')];
        _findAll_decorators = [(0, websockets_1.SubscribeMessage)('findAllchat')];
        _findOne_decorators = [(0, websockets_1.SubscribeMessage)('findAllchat')];
        _remove_decorators = [(0, websockets_1.SubscribeMessage)('removeChat')];
        _handleMessage_decorators = [(0, websockets_1.SubscribeMessage)('message')];
        __esDecorate(_classThis, null, _creat_decorators, { kind: "method", name: "creat", static: false, private: false, access: { has: function (obj) { return "creat" in obj; }, get: function (obj) { return obj.creat; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMessage_decorators, { kind: "method", name: "handleMessage", static: false, private: false, access: { has: function (obj) { return "handleMessage" in obj; }, get: function (obj) { return obj.handleMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatGateway = _classThis;
}();
exports.ChatGateway = ChatGateway;
