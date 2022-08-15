import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 파일 다운로드
  // http://localhost:3000/file/[savedPath]?fn=[fileName]
  // http://localhost:3000/file/202104/12312541515151.xlsx?fn=다운받을원본파일명.xlsx
  @Get('/upload/:name')
  async download(
    @Res() res: Response,
    @Param('name') name: string,
    @Query('fn') fileName,
  ) {
    res.download(`./upload/${name}`, fileName);
  }
}
