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
exports.Reservation = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
// import { User } from './user.entity';
var tour_entity_1 = require("src/tour/entities/tour.entity");
var status_type_1 = require("../types/status.type");
var review_entity_1 = require("src/reviews/entities/review.entity");
var Reservation = function () {
    var _classDecorators = [(0, typeorm_1.Entity)({ name: 'reservations' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _paymentAmount_decorators;
    var _paymentAmount_initializers = [];
    var _paymentAmount_extraInitializers = [];
    var _specialRequests_decorators;
    var _specialRequests_initializers = [];
    var _specialRequests_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _people_decorators;
    var _people_initializers = [];
    var _people_extraInitializers = [];
    var _firstname_decorators;
    var _firstname_initializers = [];
    var _firstname_extraInitializers = [];
    var _lastname_decorators;
    var _lastname_initializers = [];
    var _lastname_extraInitializers = [];
    var _cancelReason_decorators;
    var _cancelReason_initializers = [];
    var _cancelReason_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _cancelledAt_decorators;
    var _cancelledAt_initializers = [];
    var _cancelledAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _tour_decorators;
    var _tour_initializers = [];
    var _tour_extraInitializers = [];
    var _reviews_decorators;
    var _reviews_initializers = [];
    var _reviews_extraInitializers = [];
    var Reservation = _classThis = /** @class */ (function () {
        function Reservation_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.paymentAmount = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _paymentAmount_initializers, void 0));
            this.specialRequests = (__runInitializers(this, _paymentAmount_extraInitializers), __runInitializers(this, _specialRequests_initializers, void 0));
            this.date = (__runInitializers(this, _specialRequests_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            this.people = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _people_initializers, void 0));
            this.firstname = (__runInitializers(this, _people_extraInitializers), __runInitializers(this, _firstname_initializers, void 0));
            this.lastname = (__runInitializers(this, _firstname_extraInitializers), __runInitializers(this, _lastname_initializers, void 0));
            this.cancelReason = (__runInitializers(this, _lastname_extraInitializers), __runInitializers(this, _cancelReason_initializers, void 0));
            this.status = (__runInitializers(this, _cancelReason_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            // @UpdateDateColumn()
            // updatedAt: Date;
            this.cancelledAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _cancelledAt_initializers, void 0)); // 추가된 cancelledAt 속성
            this.deletedAt = (__runInitializers(this, _cancelledAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // @ManyToOne(() => User, (user) => user.reservations)
            // @JoinColumn({ name: 'userId' })
            // user: User;
            this.tour = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _tour_initializers, void 0));
            this.reviews = (__runInitializers(this, _tour_extraInitializers), __runInitializers(this, _reviews_initializers, void 0));
            __runInitializers(this, _reviews_extraInitializers);
        }
        return Reservation_1;
    }());
    __setFunctionName(_classThis, "Reservation");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _userId_decorators = [(0, class_validator_1.IsNumber)(), (0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _paymentAmount_decorators = [(0, class_validator_1.IsString)(), (0, typeorm_1.Column)({ type: 'varchar', nullable: false })];
        _specialRequests_decorators = [(0, class_validator_1.IsString)(), (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }), (0, class_validator_1.IsNotEmpty)({ message: '답변을 입력해주세요' })];
        _date_decorators = [(0, class_validator_1.IsDate)(), (0, typeorm_1.Column)({ type: 'date', nullable: false })];
        _people_decorators = [(0, class_validator_1.IsNumber)(), (0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _firstname_decorators = [(0, class_validator_1.IsString)(), (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: false }), (0, class_validator_1.IsNotEmpty)({ message: '이름을 영어로 입력해주세요' })];
        _lastname_decorators = [(0, class_validator_1.IsString)(), (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: false }), (0, class_validator_1.IsNotEmpty)({ message: '성을 영어로 입력해주세요' })];
        _cancelReason_decorators = [(0, class_validator_1.IsString)(), (0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _status_decorators = [(0, class_validator_1.IsEnum)(status_type_1.Status), (0, typeorm_1.Column)({ type: 'enum', enum: status_type_1.Status, default: status_type_1.Status.ONGOING })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _cancelledAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _tour_decorators = [(0, typeorm_1.ManyToOne)(function () { return tour_entity_1.Tour; }, function (tour) { return tour.reservations; }), (0, typeorm_1.JoinColumn)({ name: 'tourId', referencedColumnName: 'id' })];
        _reviews_decorators = [(0, typeorm_1.OneToMany)(function () { return review_entity_1.Review; }, function (reviews) { return reviews.reservations; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _paymentAmount_decorators, { kind: "field", name: "paymentAmount", static: false, private: false, access: { has: function (obj) { return "paymentAmount" in obj; }, get: function (obj) { return obj.paymentAmount; }, set: function (obj, value) { obj.paymentAmount = value; } }, metadata: _metadata }, _paymentAmount_initializers, _paymentAmount_extraInitializers);
        __esDecorate(null, null, _specialRequests_decorators, { kind: "field", name: "specialRequests", static: false, private: false, access: { has: function (obj) { return "specialRequests" in obj; }, get: function (obj) { return obj.specialRequests; }, set: function (obj, value) { obj.specialRequests = value; } }, metadata: _metadata }, _specialRequests_initializers, _specialRequests_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _people_decorators, { kind: "field", name: "people", static: false, private: false, access: { has: function (obj) { return "people" in obj; }, get: function (obj) { return obj.people; }, set: function (obj, value) { obj.people = value; } }, metadata: _metadata }, _people_initializers, _people_extraInitializers);
        __esDecorate(null, null, _firstname_decorators, { kind: "field", name: "firstname", static: false, private: false, access: { has: function (obj) { return "firstname" in obj; }, get: function (obj) { return obj.firstname; }, set: function (obj, value) { obj.firstname = value; } }, metadata: _metadata }, _firstname_initializers, _firstname_extraInitializers);
        __esDecorate(null, null, _lastname_decorators, { kind: "field", name: "lastname", static: false, private: false, access: { has: function (obj) { return "lastname" in obj; }, get: function (obj) { return obj.lastname; }, set: function (obj, value) { obj.lastname = value; } }, metadata: _metadata }, _lastname_initializers, _lastname_extraInitializers);
        __esDecorate(null, null, _cancelReason_decorators, { kind: "field", name: "cancelReason", static: false, private: false, access: { has: function (obj) { return "cancelReason" in obj; }, get: function (obj) { return obj.cancelReason; }, set: function (obj, value) { obj.cancelReason = value; } }, metadata: _metadata }, _cancelReason_initializers, _cancelReason_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _cancelledAt_decorators, { kind: "field", name: "cancelledAt", static: false, private: false, access: { has: function (obj) { return "cancelledAt" in obj; }, get: function (obj) { return obj.cancelledAt; }, set: function (obj, value) { obj.cancelledAt = value; } }, metadata: _metadata }, _cancelledAt_initializers, _cancelledAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _tour_decorators, { kind: "field", name: "tour", static: false, private: false, access: { has: function (obj) { return "tour" in obj; }, get: function (obj) { return obj.tour; }, set: function (obj, value) { obj.tour = value; } }, metadata: _metadata }, _tour_initializers, _tour_extraInitializers);
        __esDecorate(null, null, _reviews_decorators, { kind: "field", name: "reviews", static: false, private: false, access: { has: function (obj) { return "reviews" in obj; }, get: function (obj) { return obj.reviews; }, set: function (obj, value) { obj.reviews = value; } }, metadata: _metadata }, _reviews_initializers, _reviews_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Reservation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Reservation = _classThis;
}();
exports.Reservation = Reservation;
