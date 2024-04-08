import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MileagesService } from '../mileages/mileages.service';
import{CreateMileageDto} from '../mileages/dto/create-mileages.dto';


@Controller('mileages')
export class MileagesController {
    constructor(
        private readonly mileageService : MileagesService) {}
        // 유저도 나중에 필요할지도?
        // 생성
        @Post('/:userId')
        async chargeMileage(@Param('userId') userId: number, mileageId:number, @Body() createMileageDto: CreateMileageDto) {
            return this.mileageService.create(userId, mileageId, createMileageDto);
        }

        // 조회
        @Get('/:mileageId')
        async findmyMileage(@Param('mileageId') mileageId:number)
        {return this.mileageService.findmyMileage(mileageId)}
}

