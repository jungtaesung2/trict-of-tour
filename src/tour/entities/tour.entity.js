"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = void 0;
var typeorm_1 = require("typeorm");
var tourtypes_enum_1 = require("../types/tourtypes.enum");
var class_validator_1 = require("class-validator");
var reservation_entity_1 = require("src/reservation/entities/reservation.entity");
var Tour = function () {
    var _classDecorators = [(0, typeorm_1.Entity)({ name: 'tours' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _regionId_decorators;
    var _regionId_initializers = [];
    var _regionId_extraInitializers = [];
    var _guideId_decorators;
    var _guideId_initializers = [];
    var _guideId_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _tourType_decorators;
    var _tourType_initializers = [];
    var _tourType_extraInitializers = [];
    var _people_decorators;
    var _people_initializers = [];
    var _people_extraInitializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _reservations_decorators;
    var _reservations_initializers = [];
    var _reservations_extraInitializers = [];
    var Tour = _classThis = /** @class */ (function () {
        function Tour_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.regionId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _regionId_initializers, void 0));
            this.guideId = (__runInitializers(this, _regionId_extraInitializers), __runInitializers(this, _guideId_initializers, void 0));
            this.title = (__runInitializers(this, _guideId_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.startDate = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
            this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
            this.price = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.tourType = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _tourType_initializers, void 0));
            this.people = (__runInitializers(this, _tourType_extraInitializers), __runInitializers(this, _people_initializers, void 0));
            this.image = (__runInitializers(this, _people_extraInitializers), __runInitializers(this, _image_initializers, void 0));
            this.content = (__runInitializers(this, _image_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.latitude = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            this.createdAt = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.reservations = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _reservations_initializers, void 0));
            __runInitializers(this, _reservations_extraInitializers);
        }
        return Tour_1;
    }());
    __setFunctionName(_classThis, "Tour");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _regionId_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)({ message: '지역 ID를 입력해주세요.' }), (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'regionId', nullable: false })];
        _guideId_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)({ message: '가이드 ID를 입력해주세요.' }), (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'guideId', nullable: false })];
        _title_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '투어 이름을 입력해주세요.' }), (0, typeorm_1.Column)({ type: 'varchar', nullable: false })];
        _startDate_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '시작일을 입력해주세요' }), (0, typeorm_1.Column)({ type: 'datetime', nullable: false })];
        _endDate_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '만기일을 입력해주세요' }), (0, typeorm_1.Column)({ type: 'datetime', nullable: false })];
        _price_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '가격을 입력해주세요' }), (0, typeorm_1.Column)({ type: 'varchar', nullable: false })];
        _tourType_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '투어타입을 입력해주세요' }), (0, typeorm_1.Column)({ type: 'enum', enum: tourtypes_enum_1.TourType })];
        _people_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '인원을 입력해주세요' }), (0, typeorm_1.Column)({ type: 'varchar', nullable: false }), (0, class_validator_1.Min)(1, { message: '한 명 이상이어야 합니다.' }), (0, class_validator_1.Max)(10, { message: '최대 10명까지 가능합니다.' })];
        _image_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '이미지을 넣어주세요' }), (0, typeorm_1.Column)({ type: 'varchar', nullable: false })];
        _content_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '내용을 입력해주세요' }), (0, typeorm_1.Column)({ type: 'text', nullable: false })];
        _latitude_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)({ message: '위도를 입력해주세요' }), (0, typeorm_1.Column)({ type: 'text', nullable: false })];
        _longitude_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)({ message: '경도를 입력해주세요' }), (0, typeorm_1.Column)({ type: 'text', nullable: false })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'datetime', nullable: false })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'datetime', nullable: false })];
        _reservations_decorators = [(0, typeorm_1.OneToMany)(function () { return reservation_entity_1.Reservation; }, function (reservations) { return reservations.tour; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _regionId_decorators, { kind: "field", name: "regionId", static: false, private: false, access: { has: function (obj) { return "regionId" in obj; }, get: function (obj) { return obj.regionId; }, set: function (obj, value) { obj.regionId = value; } }, metadata: _metadata }, _regionId_initializers, _regionId_extraInitializers);
        __esDecorate(null, null, _guideId_decorators, { kind: "field", name: "guideId", static: false, private: false, access: { has: function (obj) { return "guideId" in obj; }, get: function (obj) { return obj.guideId; }, set: function (obj, value) { obj.guideId = value; } }, metadata: _metadata }, _guideId_initializers, _guideId_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
        __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _tourType_decorators, { kind: "field", name: "tourType", static: false, private: false, access: { has: function (obj) { return "tourType" in obj; }, get: function (obj) { return obj.tourType; }, set: function (obj, value) { obj.tourType = value; } }, metadata: _metadata }, _tourType_initializers, _tourType_extraInitializers);
        __esDecorate(null, null, _people_decorators, { kind: "field", name: "people", static: false, private: false, access: { has: function (obj) { return "people" in obj; }, get: function (obj) { return obj.people; }, set: function (obj, value) { obj.people = value; } }, metadata: _metadata }, _people_initializers, _people_extraInitializers);
        __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _reservations_decorators, { kind: "field", name: "reservations", static: false, private: false, access: { has: function (obj) { return "reservations" in obj; }, get: function (obj) { return obj.reservations; }, set: function (obj, value) { obj.reservations = value; } }, metadata: _metadata }, _reservations_initializers, _reservations_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tour = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tour = _classThis;
}();
exports.Tour = Tour;
