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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CenterService } from './center.service';
import { FindFilterDTO } from './dto/findFilter-center.dto';

@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const findCenter = await this.centerService.findOne(id);
    res.statusCode = 200;
    return res.send({
      statusCode: res.statusCode,
      message: '정보 받아오기 완료',
      center: findCenter,
    });
  }

  @Get()
  async findFilter(
    @Query() findFilterDto: FindFilterDTO,
    @Res() res: Response,
  ) {
    const findCenters = await this.centerService.findFilter(findFilterDto);

    res.statusCode = 200;
    res.send({
      statusCode: res.statusCode,
      message: '정보 받아오기 완료',
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
    return this.centerService.findFilter(findFilterDto);
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
