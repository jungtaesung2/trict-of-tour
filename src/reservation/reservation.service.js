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
exports.ReservationService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var reservation_entity_1 = require("../reservation/entities/reservation.entity");
var status_type_1 = require("./types/status.type");
var ReservationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReservationService = _classThis = /** @class */ (function () {
        function ReservationService_1(tourRepository, reservationRepository) {
            this.tourRepository = tourRepository;
            this.reservationRepository = reservationRepository;
        }
        // 02. 예약 작성 메서드
        ReservationService_1.prototype.create = function (CreateReservationDto, userId, tourId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryRunner = this.reservationRepository.manager.connection.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 6, 8, 10]);
                            return [4 /*yield*/, this.createReservation(queryRunner, CreateReservationDto, userId, tourId)];
                        case 4:
                            result = _a.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, result];
                        case 6:
                            error_1 = _a.sent();
                            // 트랜잭션 롤백
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 7:
                            // 트랜잭션 롤백
                            _a.sent();
                            throw error_1; // 에러 재 throw
                        case 8: 
                        // QueryRunner 반환
                        return [4 /*yield*/, queryRunner.release()];
                        case 9:
                            // QueryRunner 반환
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        ReservationService_1.prototype.createReservation = function (queryRunner, // QueryRunner 대신 any 타입으로 지정
        CreateReservationDto, userId, tourId) {
            return __awaiter(this, void 0, void 0, function () {
                var tour, selectDate, isDateValid, pricePerPerson, paymentAmount, firstnameRegex, lastnameRegex, pattern, newReservation, createdReservation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.tourRepository.findOne({ where: { id: tourId } })];
                        case 1:
                            tour = _a.sent();
                            console.log('투어Id', tour);
                            if (!tour) {
                                throw new common_1.NotFoundException('해당하는 투어를 찾지 못하였습니다.');
                            }
                            selectDate = new Date(CreateReservationDto.date);
                            return [4 /*yield*/, this.isDateValid(tourId, selectDate)];
                        case 2:
                            isDateValid = _a.sent();
                            if (!isDateValid) {
                                throw new Error('선택한 날짜에 예약을 할 수 없습니다.');
                            }
                            pricePerPerson = +tour.price.replace(',', '');
                            paymentAmount = +pricePerPerson * CreateReservationDto.people;
                            firstnameRegex = /^[a-zA-Z\s]*$/;
                            lastnameRegex = /^[a-zA-Z\s]*$/;
                            if (!firstnameRegex.test(CreateReservationDto.firstname) ||
                                !lastnameRegex.test(CreateReservationDto.lastname)) {
                                throw new common_1.BadRequestException('영어 이름이 작성되어야 합니다.');
                            }
                            pattern = /^\d{4}-\d{2}-\d{2}$/;
                            if (typeof CreateReservationDto.date !== 'string' ||
                                !pattern.test(CreateReservationDto.date)) {
                                throw new common_1.BadRequestException("날짜 형식이 유효하지 않습니다. 'YYYY-MM-DD' 형식으로 입력해주세요.");
                            }
                            if (!CreateReservationDto.date ||
                                !CreateReservationDto.people ||
                                !CreateReservationDto.firstname ||
                                !CreateReservationDto.lastname ||
                                !CreateReservationDto.specialRequests) {
                                throw new common_1.BadRequestException('날짜,인원수,firstname,lastname, 요청사항은 필수 입력 사항입니다.');
                            }
                            newReservation = this.reservationRepository.create({
                                date: selectDate,
                                paymentAmount: paymentAmount.toString(),
                                people: CreateReservationDto.people,
                                firstname: CreateReservationDto.firstname,
                                lastname: CreateReservationDto.lastname,
                                specialRequests: CreateReservationDto.specialRequests,
                                tour: tour,
                            });
                            return [4 /*yield*/, queryRunner.manager.save(newReservation)];
                        case 3:
                            createdReservation = _a.sent();
                            return [2 /*return*/, {
                                    message: '예약이 성공적으로 완료되었습니다.',
                                    reservation: createdReservation,
                                    // 투어에 대한 간단한 정보들 투어이미지, 투어이름, 투어타입, 투어지역, 가격만 나오게?
                                }];
                    }
                });
            });
        };
        // 01.예약 가능한 날짜 확인 메서드
        ReservationService_1.prototype.isDateValid = function (tourId, reservationDate) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, startDate, endDate;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.tourRepository
                                .createQueryBuilder('tour')
                                .select('tour.startDate', 'startDate')
                                .addSelect('tour.endDate', 'endDate')
                                .where('tour.id = :id', { id: tourId })
                                .getRawOne()];
                        case 1:
                            _a = _b.sent(), startDate = _a.startDate, endDate = _a.endDate;
                            if (!startDate || !endDate) {
                                throw new common_1.NotFoundException('해당하는 투어의 정보를 불러오지 못하였습니다.');
                            }
                            console.log('startDate:', startDate);
                            console.log('endDate:', endDate);
                            return [2 /*return*/, reservationDate >= startDate && reservationDate <= endDate];
                    }
                });
            });
        };
        // 유틸리티 메서드로 현재 시간과 취소 데드라인 비교하기
        ReservationService_1.prototype.isCancellationDeadlinePassed = function (tourStartDate) {
            var currentDate = new Date();
            var cancelDeadline = new Date(tourStartDate.getTime() - 48 * 60 * 60 * 1000);
            console.log('현재날자', currentDate);
            console.log('데드라인', cancelDeadline);
            return currentDate >= cancelDeadline;
        };
        // 취소 가능 여부 확인하기
        ReservationService_1.prototype.canCancelReservation = function (reservationId) {
            return __awaiter(this, void 0, void 0, function () {
                var reservation, tourStartDate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findReservationById(reservationId)];
                        case 1:
                            reservation = _a.sent();
                            tourStartDate = new Date(reservation.date);
                            return [2 /*return*/, !this.isCancellationDeadlinePassed(tourStartDate)];
                    }
                });
            });
        };
        // 02. 예약 취소
        ReservationService_1.prototype.requestCancellation = function (reservationId, cancelReservationDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, reservation, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryRunner = this.reservationRepository.manager.connection.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 8, 10, 12]);
                            return [4 /*yield*/, queryRunner.manager.findOne(reservation_entity_1.Reservation, {
                                    where: { id: reservationId },
                                })];
                        case 4:
                            reservation = _a.sent();
                            if (!reservation) {
                                throw new common_1.NotFoundException('해당 예약을 찾을 수 없습니다.');
                            }
                            if (!cancelReservationDto.cancelReason) {
                                throw new common_1.BadRequestException('취소 이유를 제공해야 합니다.');
                            }
                            return [4 /*yield*/, this.canCancelReservation(reservationId)];
                        case 5:
                            if (!(_a.sent())) {
                                throw new common_1.BadRequestException('예약을 취소할 수 있는 기간이 아닙니다.');
                            }
                            if (reservation.status === status_type_1.Status.CANCEL) {
                                throw new common_1.BadRequestException('이미 취소된 예약입니다.');
                            }
                            // 'active' 컬럼을 false로 설정하여 예약을 비활성화
                            // reservation.active = false;
                            reservation.status = status_type_1.Status.CANCEL;
                            reservation.cancelReason = cancelReservationDto.cancelReason;
                            reservation.cancelledAt = new Date();
                            return [4 /*yield*/, queryRunner.manager.save(reservation)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 7:
                            _a.sent();
                            // 소프트 삭제를 수행하여 deletedAt 컬럼에 삭제 시간 기록
                            // await this.reservationRepository.softDelete(reservationId);
                            return [2 /*return*/, {
                                    message: '해당 예약이 취소되었습니다.',
                                }];
                        case 8:
                            err_1 = _a.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 9:
                            _a.sent();
                            throw err_1;
                        case 10: return [4 /*yield*/, queryRunner.release()];
                        case 11:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        // 예약 조회 메서드
        ReservationService_1.prototype.findAllmyReservations = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.reservationRepository.find({ where: { userId: userId } })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // 특정 예약 상세 조회
        ReservationService_1.prototype.findReservationById = function (reservationId) {
            return __awaiter(this, void 0, void 0, function () {
                var reservation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.reservationRepository.findOne({
                                where: { id: reservationId },
                            })];
                        case 1:
                            reservation = _a.sent();
                            if (!reservation) {
                                throw new common_1.NotFoundException('해당 ID의 예약을 찾을 수 없습니다.');
                            }
                            return [2 /*return*/, reservation];
                    }
                });
            });
        };
        ReservationService_1.prototype.findReservationsByStatus = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                var reservations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log({ status: status });
                            return [4 /*yield*/, this.reservationRepository.find({
                                    where: { status: status },
                                })];
                        case 1:
                            reservations = _a.sent();
                            return [2 /*return*/, reservations];
                    }
                });
            });
        };
        ReservationService_1.prototype.processCompletedReservations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var currentTime, completedReservations, updatePromises, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            currentTime = new Date();
                            return [4 /*yield*/, this.reservationRepository.find({
                                    where: { date: (0, typeorm_1.LessThan)(currentTime), status: (0, typeorm_1.Not)(status_type_1.Status.CANCEL) },
                                })];
                        case 1:
                            completedReservations = _a.sent();
                            updatePromises = completedReservations.map(function (reservation) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            reservation.status = status_type_1.Status.FINISH;
                                            return [4 /*yield*/, this.reservationRepository.save(reservation)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // 모든 예약 상태 변경 작업이 완료될 때까지 기다림
                            return [4 /*yield*/, Promise.all(updatePromises)];
                        case 2:
                            // 모든 예약 상태 변경 작업이 완료될 때까지 기다림
                            _a.sent();
                            console.log('All reservations updated successfully.');
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Error processing completed reservations:', error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return ReservationService_1;
    }());
    __setFunctionName(_classThis, "ReservationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReservationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReservationService = _classThis;
}();
exports.ReservationService = ReservationService;
