import { DeleteReplyDTO } from './dto/delete-reply.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { JWTGuard } from 'src/review/guard/jwt.guard';
import { Response } from 'express';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get('/like/:reply_id')
  async likeReply(
    @Param('reply_id') reply_id: number,
    @Query('id') id: number,
    @Res() res: Response,
  ) {
    const result = await this.replyService.likeReply(+reply_id, +id);

    res.statusCode = 200;

    return res.send({
      message: '좋아요 완료',
      statusCode: res.statusCode,
      like: result,
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JWTGuard)
  async writeReply(
    @Body() createReplyDto: CreateReplyDto,
    @Res() res: Response,
  ) {
    const saveReply = await this.replyService.writeReply(createReplyDto);
    if (!saveReply) {
      throw new HttpException('댓글 작성 실패', 401);
    }

    res.statusCode = 200;
    return res.send({
      message: '댓글 작성 완료',
      statusCode: res.statusCode,
      reply: saveReply,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const findReplys = await this.replyService.findOne(+id);

    res.statusCode = 200;
    return res.send({
      message: '댓글 불러오기 완료',
      statusCode: res.statusCode,
      reply: findReplys,
    });
  }

  @Patch()
  @UseGuards(JWTGuard)
  @UsePipes(ValidationPipe)
  async updateReply(
    @Body() updateReplyDto: UpdateReplyDto,
    @Res() res: Response,
  ) {
    const saveReply = await this.replyService.updateReply(updateReplyDto);

    res.statusCode = 200;

    return res.send({
      statusCode: res.statusCode,
      message: '댓글 변경 완료',
      Reply: saveReply,
    });
  }

  @Delete()
  @UsePipes(ValidationPipe)
  @UseGuards(JWTGuard)
  async removeReply(
    @Body() deleteReplyDto: DeleteReplyDTO,
    @Res() res: Response,
  ) {
    const result = await this.replyService.removeReply(deleteReplyDto);
    if (!result) {
      throw new HttpException('댓글 삭제 실패', 401);
    }
    res.statusCode = 200;
    return res.send({
      statusCode: res.statusCode,
      message: '댓글 삭제 완료',
    });
  }
}
