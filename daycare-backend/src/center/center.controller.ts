import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UploadedFiles,
  Put,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CenterService } from './center.service';
import { FindFilterDTO } from './dto/findFilter-center.dto';

@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centerService.findOne(id);
  }

  @Get()
  findFilter(@Query() findFilterDto: FindFilterDTO) {
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
