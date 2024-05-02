import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MileagesService } from '../mileages/mileages.service';
import { CreateMileageDto } from '../mileages/dto/create-mileages.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userinfo.decorator';
// import { AuthGuard } from '../common/auth.guard';

@Controller('mileages')
export class MileagesController {
    constructor(private readonly mileageService: MileagesService) {}
    //충전
    @Post('/:userId') 
    async chargeMileage(@Param('userId') userId: number, @Body() mileageAmount: number) {
        return this.mileageService.chargeMileage(userId, mileageAmount);
    }

    // 마일리지 조회
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findmyMileage(@UserInfo() user) {
        return this.mileageService.findmyMileage(user.id)
    }

    // 마일리지 상세정보
    @Get('/history')
    @UseGuards(AuthGuard('jwt'))
    async findmyMileageHistory(@UserInfo() user) {
        console.log(user)
        return this.mileageService.findmyMileageHistory(user.id);
    }
}