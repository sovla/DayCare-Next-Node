import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFiles,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
  Req,
  Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CenterService } from './center.service';
import { FindFilterDTO } from './dto/findFilter-center.dto';
import { LikeDto } from './dto/like-center.dto';

@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('id') userId: string | undefined,
    @Res() res: Response,
  ) {
    const { findCenter, isLike } = await this.centerService.findOne(
      +id,
      userId != null ? +userId : undefined,
    );
    res.statusCode = 200;
    return res.send({
      statusCode: res.statusCode,
      message: '정보 받아오기 완료',
      center: {
        ...findCenter,
        isLike,
      },
    });
  }

  @Get('like/:id')
  @UsePipes(ValidationPipe)
  async likeCenter(
    @Query('id') id: string,
    @Param('id') center_id: string,
    @Res() res: Response,
  ) {
    const isLike = await this.centerService.likeCenter({
      id,
      center_id,
    });
    res.statusCode = 200;
    return res.send({
      statusCode: res.statusCode,
      message: '정보 받아오기 완료',
      like: isLike,
    });
  }

  // 거리 기준으로 센터 받아오기
  @Get()
  async findCentersByLocation(
    @Query() findFilterDto: FindFilterDTO,
    @Res() res: Response,
  ) {
    const findCenters = await this.centerService.findCentersByLocation(
      findFilterDto,
    );

    res.statusCode = 200;

    return res.send({
      statusCode: res.statusCode,
      message: '정보 받아오기 완료',
      center: findCenters,
    });
  }

  @Post()
  async findCenters(@Res() res: Response, @Body() body: { title: string }) {
    const findCenters = await this.centerService.findCenters(body.title);

    res.statusCode = 200;

    return res.send({
      message: '정보 받아오기 완료',
      statusCode: res.statusCode,
      center: findCenters.map((v) => ({
        homepage: v.homepage,
        address_detail: v.address_detail,
        tel: v.tel,
        name: v.name,
        image: '일단없음',
        lat: v.lat,
        lng: v.lon,
        school_vehicle: v.school_vehicle,
        type: v.type,
        id: v.id,
      })),
    });
  }

  @Post('/basicInfo')
  @UseInterceptors(FilesInterceptor('files'))
  createBasicInfo(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.centerService.createCenterToExcel(files);
  }

  @Put('/detailInfo')
  @UseInterceptors(FilesInterceptor('files'))
  updateDetailInfo(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.centerService.createCenterToExcelDetail(files);
  }
}
