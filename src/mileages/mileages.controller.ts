import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MileagesService } from '../mileages/mileages.service';
import { CreateMileageDto } from '../mileages/dto/create-mileages.dto';
// import { AuthGuard } from '../common/auth.guard';

@Controller('mileages')
export class MileagesController {
    constructor(private readonly mileageService: MileagesService) {}

    // 생성
    @Post('/:userId')
    // @UseGuards(AuthGuard())
    async chargeMileage(@Param('userId') userId: number, mileageId:number, @Body() createMileageDto: CreateMileageDto) {
        return this.mileageService.create(userId, mileageId, createMileageDto);
    }

    // 마일리지 조회
    @Get('/:mileageId')
    // @UseGuards(AuthGuard())
    async findmyMileage(@Param('mileageId') mileageId:number, userId : number) {
        return this.mileageService.findmyMileage(mileageId, userId);
    }

    // 마일리지 상세조회
    @Get('/:mileageId')
    // @UseGuards(AuthGuard())
    async findOne(@Param('mileageId') mileageId: number, userId : number) {
        return this.mileageService.findOne(mileageId, userId);
    }
}