import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpException,
  Res,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginDTO } from './dto/login.dto';
import { JWTGuard } from 'src/user/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async login(@Body() loginDto: LoginDTO, @Res() res: Response) {
    const findUser = await this.sessionService.login(loginDto);
    if (findUser) {
      const result = {
        accessToken: this.jwtService.sign({
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
        }),
      };
      res.statusCode = 200;
      res.cookie('jwt', result.accessToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000, // 1hours
      });
      return res.send({
        statusCode: res.statusCode,
        message: `${findUser.name}님 로그인 성공하셨습니다.`,
        user: {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
        },
      });
    }
    return;
  }

  @Delete()
  @UseGuards(JWTGuard)
  async logout(
    @Body(
      'id',
      new ParseIntPipe({
        exceptionFactory: (error) => {
          throw new HttpException('올바른 id 값을 입력해주세요', 400);
        },
      }),
    )
    id: number,
    @Res() res: Response,
  ) {
    const result = await this.sessionService.logout(id);
    if (result) {
      res.cookie('jwt', '', {
        maxAge: 0,
      });

      res.statusCode = 200;

      return res.send({
        statusCode: 200,
        message: '로그아웃 성공하셨습니다',
      });
    }
    return;
  }
}
