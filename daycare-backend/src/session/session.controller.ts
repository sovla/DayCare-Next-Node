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
  Req,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginDTO } from './dto/login.dto';
import { JWTGuard } from 'src/user/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async login(
    @Res() res: Response,
    @Body() loginDto: LoginDTO,
    @Req() req: Request,
  ) {
    if (req.cookies['jwt'] && !loginDto?.email) {
      const data = this.jwtService.decode(req.cookies['jwt']);
      const findUser = await this.sessionService.silentLogin(data['id']);
      if (findUser) {
        const result = {
          accessToken: this.jwtService.sign({
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
          }),
        };
        res.statusCode = 200;
        res.setHeader('access-control-expose-headers', 'Set-Cookie');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.cookie('jwt', result.accessToken, {
          sameSite: 'lax',
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1hours
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
    }

    if (!loginDto) {
      return new HttpException('로그인에 필요한 필수값이 없습니다', 400);
    }

    const findUser = await this.sessionService.login(loginDto);

    const accessToken = this.jwtService.sign(
      {
        // 필요한 정보만 sign하여 보내기
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
      },
      {},
    );

    res.statusCode = 200;
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    // JWT Token 을 cookie 저장하기 위해
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // credentials 옵션
    // - same-origin: 같은 출처간 요청에만 인증정보를 담을 수 있다
    // - include : 모든 요청에 인증정보를 담을 수 있다.
    // - omit : 모든 요청에 인증 정보를 담지 않는다
    // 자격 증명 모드 include에 해당 하며 Access-Control-Allow-Credentials = true
    // Access-Control-Allow-Origin !== "*" 와일드 카드가 아니여야 서버에서 보내는 쿠키를 저장할 수 있다.

    res.cookie('jwt', accessToken, {
      sameSite: 'lax',
      httpOnly: true,
      // httpOnly 속성의 경우 자바스크립트 속성에서 접근이 불가하다.
      maxAge: 48 * 60 * 60 * 1000,

      // 24hours
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
      res.setHeader('access-control-expose-headers', 'Set-Cookie');
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
