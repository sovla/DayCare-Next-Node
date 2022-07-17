import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const findCategoryList = await this.categoryService.findAll();
    res.statusCode = 200;
    return res.send({
      statusCode: res.statusCode,
      message: '카테고리 불러오기 완료',
      category: findCategoryList,
    });
  }
}
