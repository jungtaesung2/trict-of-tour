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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
//   import { BoardGuard } from 'src/board/guards/board.guard';
//   import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
//   @UseGuards(JwtAuthGuard, BoardGuard)
var ReservationController = function () {
    var _classDecorators = [(0, common_2.Controller)('/reservations')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _CreateReservation_decorators;
    var _editReservaition_decorators;
    var _findAllmyReservations_decorators;
    var _getReservationsByStatus_decorators;
    var _findOne_decorators;
    var ReservationController = _classThis = /** @class */ (function () {
        function ReservationController_1(ReservationService, TourService) {
            this.ReservationService = (__runInitializers(this, _instanceExtraInitializers), ReservationService);
            this.TourService = TourService;
        }
        ReservationController_1.prototype.CreateReservation = function (tourId, CreateReservationDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, tour, isValidDate, _a, message, reservation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = req.user;
                            return [4 /*yield*/, this.TourService.findOne(+tourId)];
                        case 1:
                            tour = _b.sent();
                            console.log('투어정보', tour);
                            if (!tour) {
                                throw new common_1.NotFoundException('해당하는 투어를 찾지 못하였습니다.');
                            }
                            return [4 /*yield*/, this.ReservationService.isDateValid(tourId, new Date(CreateReservationDto.date))];
                        case 2:
                            isValidDate = _b.sent();
                            if (!isValidDate) {
                                throw new common_1.BadRequestException('예약할 수 없는 날짜입니다.');
                            }
                            return [4 /*yield*/, this.ReservationService.create(CreateReservationDto, userId, tourId)];
                        case 3:
                            _a = _b.sent(), message = _a.message, reservation = _a.reservation;
                            return [2 /*return*/, { statusCode: 200, message: message, reservation: reservation }];
                    }
                });
            });
        };
        ReservationController_1.prototype.editReservaition = function (reservationId, cancelReservationDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, canCancel, cancellationResult, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            userId = req.user;
                            return [4 /*yield*/, this.ReservationService.canCancelReservation(reservationId)];
                        case 1:
                            canCancel = _a.sent();
                            if (!canCancel) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.ReservationService.requestCancellation(reservationId, cancelReservationDto, userId)];
                        case 2:
                            cancellationResult = _a.sent();
                            return [2 /*return*/, cancellationResult];
                        case 3: return [2 /*return*/, { statusCode: 200, message: '해당 예약은 취소할 수 없습니다.' }];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            return [2 /*return*/, { message: "".concat(error_1) }];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        // 예약 목록 전체 조회
        ReservationController_1.prototype.findAllmyReservations = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ReservationService.findAllmyReservations(userId)];
                });
            });
        };
        // 예약 상태에 따라 조회
        ReservationController_1.prototype.getReservationsByStatus = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ReservationService.findReservationsByStatus(status)];
                });
            });
        };
        // 예약 상세 조회
        ReservationController_1.prototype.findOne = function (reservationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ReservationService.findReservationById(reservationId)];
                });
            });
        };
        return ReservationController_1;
    }());
    __setFunctionName(_classThis, "ReservationController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _CreateReservation_decorators = [(0, common_2.Post)('/:tourId')];
        _editReservaition_decorators = [(0, common_2.Patch)('/:reservationId/cancel')];
        _findAllmyReservations_decorators = [(0, common_2.Get)()];
        _getReservationsByStatus_decorators = [(0, common_2.Get)('/status')];
        _findOne_decorators = [(0, common_2.Get)('/:reservationId')];
        __esDecorate(_classThis, null, _CreateReservation_decorators, { kind: "method", name: "CreateReservation", static: false, private: false, access: { has: function (obj) { return "CreateReservation" in obj; }, get: function (obj) { return obj.CreateReservation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _editReservaition_decorators, { kind: "method", name: "editReservaition", static: false, private: false, access: { has: function (obj) { return "editReservaition" in obj; }, get: function (obj) { return obj.editReservaition; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllmyReservations_decorators, { kind: "method", name: "findAllmyReservations", static: false, private: false, access: { has: function (obj) { return "findAllmyReservations" in obj; }, get: function (obj) { return obj.findAllmyReservations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getReservationsByStatus_decorators, { kind: "method", name: "getReservationsByStatus", static: false, private: false, access: { has: function (obj) { return "getReservationsByStatus" in obj; }, get: function (obj) { return obj.getReservationsByStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReservationController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReservationController = _classThis;
}();
exports.ReservationController = ReservationController;
