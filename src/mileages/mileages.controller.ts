import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MileagesService } from '../mileages/mileages.service';
import { CreateMileageDto } from '../mileages/dto/create-mileages.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userinfo.decorator';
// import { AuthGuard } from '../common/auth.guard';
@Controller('mileages')
export class MileagesController {
    constructor(private readonly mileageService: MileagesService) {}
    //마일리지 충전
    @Post('/:userId')
    @UseGuards(AuthGuard('jwt'))
    async chargeMileage(@UserInfo() user, @Body() mileageAmount: number) {
        return this.mileageService.addMileage(user.id, mileageAmount, '충전');
    }
    // 마일리지 조회
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findmyMileage(@UserInfo() user) {
        return this.mileageService.findmyMileage(user.id)
    }
    // 마일리지 내역조회
    @Get('/history')
    @UseGuards(AuthGuard('jwt'))
    async findmyMileageHistory(@UserInfo() user) {
        return this.mileageService.findmyMileageHistory(user.id);
    }
}