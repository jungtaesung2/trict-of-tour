"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var reservation_entity_1 = require("../entities/reservation.entity");
var class_validator_1 = require("class-validator");
var CreateReservationDto = function () {
    var _a;
    var _classSuper = (0, mapped_types_1.PickType)(reservation_entity_1.Reservation, [
        "date",
        "paymentAmount",
        "people",
        "firstname",
        "lastname",
        "specialRequests",
    ]);
    var _paymentAmount_decorators;
    var _paymentAmount_initializers = [];
    var _paymentAmount_extraInitializers = [];
    var _people_decorators;
    var _people_initializers = [];
    var _people_extraInitializers = [];
    var _firstname_decorators;
    var _firstname_initializers = [];
    var _firstname_extraInitializers = [];
    var _lastname_decorators;
    var _lastname_initializers = [];
    var _lastname_extraInitializers = [];
    var _specialRequests_decorators;
    var _specialRequests_initializers = [];
    var _specialRequests_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(CreateReservationDto, _super);
            function CreateReservationDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.paymentAmount = __runInitializers(_this, _paymentAmount_initializers, void 0);
                _this.people = (__runInitializers(_this, _paymentAmount_extraInitializers), __runInitializers(_this, _people_initializers, void 0));
                _this.firstname = (__runInitializers(_this, _people_extraInitializers), __runInitializers(_this, _firstname_initializers, void 0));
                _this.lastname = (__runInitializers(_this, _firstname_extraInitializers), __runInitializers(_this, _lastname_initializers, void 0));
                _this.specialRequests = (__runInitializers(_this, _lastname_extraInitializers), __runInitializers(_this, _specialRequests_initializers, void 0));
                __runInitializers(_this, _specialRequests_extraInitializers);
                return _this;
            }
            return CreateReservationDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _paymentAmount_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _people_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _firstname_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '이름을 영어로 입력해주세요' })];
            _lastname_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '성을 영어로 입력해주세요' })];
            _specialRequests_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '답변을 입력해주세요' })];
            __esDecorate(null, null, _paymentAmount_decorators, { kind: "field", name: "paymentAmount", static: false, private: false, access: { has: function (obj) { return "paymentAmount" in obj; }, get: function (obj) { return obj.paymentAmount; }, set: function (obj, value) { obj.paymentAmount = value; } }, metadata: _metadata }, _paymentAmount_initializers, _paymentAmount_extraInitializers);
            __esDecorate(null, null, _people_decorators, { kind: "field", name: "people", static: false, private: false, access: { has: function (obj) { return "people" in obj; }, get: function (obj) { return obj.people; }, set: function (obj, value) { obj.people = value; } }, metadata: _metadata }, _people_initializers, _people_extraInitializers);
            __esDecorate(null, null, _firstname_decorators, { kind: "field", name: "firstname", static: false, private: false, access: { has: function (obj) { return "firstname" in obj; }, get: function (obj) { return obj.firstname; }, set: function (obj, value) { obj.firstname = value; } }, metadata: _metadata }, _firstname_initializers, _firstname_extraInitializers);
            __esDecorate(null, null, _lastname_decorators, { kind: "field", name: "lastname", static: false, private: false, access: { has: function (obj) { return "lastname" in obj; }, get: function (obj) { return obj.lastname; }, set: function (obj, value) { obj.lastname = value; } }, metadata: _metadata }, _lastname_initializers, _lastname_extraInitializers);
            __esDecorate(null, null, _specialRequests_decorators, { kind: "field", name: "specialRequests", static: false, private: false, access: { has: function (obj) { return "specialRequests" in obj; }, get: function (obj) { return obj.specialRequests; }, set: function (obj, value) { obj.specialRequests = value; } }, metadata: _metadata }, _specialRequests_initializers, _specialRequests_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateReservationDto = CreateReservationDto;
