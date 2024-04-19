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
exports.TourService = void 0;
var common_1 = require("@nestjs/common");
var TourService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TourService = _classThis = /** @class */ (function () {
        function TourService_1(tourRepository, regionRepository) {
            this.tourRepository = tourRepository;
            this.regionRepository = regionRepository;
        }
        TourService_1.prototype.createTour = function (createTourDto) {
            return __awaiter(this, void 0, void 0, function () {
                var guideId, regionId, title, startDate, endDate, price, tourType, people, image, content, latitude, longitude, region, pattern, pattern2, today, newStartDate, newEndDate, tour;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            guideId = createTourDto.guideId, regionId = createTourDto.regionId, title = createTourDto.title, startDate = createTourDto.startDate, endDate = createTourDto.endDate, price = createTourDto.price, tourType = createTourDto.tourType, people = createTourDto.people, image = createTourDto.image, content = createTourDto.content, latitude = createTourDto.latitude, longitude = createTourDto.longitude;
                            return [4 /*yield*/, this.regionRepository.findOne({
                                    where: { id: regionId },
                                })];
                        case 1:
                            region = _a.sent();
                            if (region) {
                                throw new common_1.BadRequestException('지역이 존재하지 않습니다.');
                            }
                            pattern = /^\d{4}-\d{2}-\d{2}$/;
                            pattern2 = /^\d{4}-\d{2}-\d{2}$/;
                            if (typeof startDate !== 'string' || !pattern.test(startDate)) {
                                throw new common_1.BadRequestException("날짜 형식이 유효하지 않습니다. 'YYYY-MM-DD' 형식으로 입력해주세요. 시작일입니다.");
                            }
                            if (typeof endDate !== 'string' || !pattern2.test(endDate)) {
                                throw new common_1.BadRequestException("날짜 형식이 유효하지 않습니다. 'YYYY-MM-DD' 형식으로 입력해주세요. 만기일입니다.");
                            }
                            today = new Date();
                            newStartDate = new Date(startDate);
                            newEndDate = new Date(endDate);
                            if (isNaN(newStartDate.getTime())) {
                                throw new common_1.BadRequestException('유효한 시작일 날짜 형식이 아닙니다.');
                            }
                            if (isNaN(newEndDate.getTime())) {
                                throw new common_1.BadRequestException('유효한 만기일 날짜 형식이 아닙니다.');
                            }
                            if (newStartDate.getTime() > today.getTime()) {
                                throw new common_1.BadRequestException('시작일은 오늘 이후여야 합니다.');
                            }
                            if (newEndDate.getTime() <= newStartDate.getTime()) {
                                throw new common_1.BadRequestException('만기일은 시작일 이후여야 합니다.');
                            }
                            return [4 /*yield*/, this.tourRepository.save({
                                    guideId: guideId,
                                    regionId: regionId,
                                    title: title,
                                    startDate: startDate,
                                    endDate: endDate,
                                    price: price,
                                    tourType: tourType,
                                    people: people,
                                    image: image,
                                    content: content,
                                    latitude: latitude,
                                    longitude: longitude,
                                })];
                        case 2:
                            tour = _a.sent();
                            return [2 /*return*/, tour];
                    }
                });
            });
        };
        // 투어 조회
        TourService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, "This action returns all tour"];
                });
            });
        };
        // 투어 상세 조회
        TourService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, "This action returns a #".concat(id, " tour")];
                });
            });
        };
        // 투어 수정 guideId: number
        TourService_1.prototype.updateTour = function (id, updateTourDto) {
            return __awaiter(this, void 0, void 0, function () {
                var title, image, tour;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            title = updateTourDto.title, image = updateTourDto.image;
                            return [4 /*yield*/, this.tourRepository.findOneBy({ id: id })];
                        case 1:
                            tour = _a.sent();
                            if (!tour) {
                                throw new common_1.NotFoundException('등록된 투어를 찾을 수 없습니다.');
                            }
                            return [4 /*yield*/, this.tourRepository.update(id, {
                                    title: title,
                                    image: image,
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.tourRepository.findOneBy({ id: id })];
                    }
                });
            });
        };
        // 투어 삭제
        TourService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, "This action removes a #".concat(id, " tour")];
                });
            });
        };
        return TourService_1;
    }());
    __setFunctionName(_classThis, "TourService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TourService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TourService = _classThis;
}();
exports.TourService = TourService;
// function InjectableRepository(
//   Tour: typeof Tour,
// ): (
//   target: typeof TourService,
//   propertyKey: undefined,
//   parameterIndex: 0,
// ) => void {
//   throw new Error('Function not implemented.');
// }
