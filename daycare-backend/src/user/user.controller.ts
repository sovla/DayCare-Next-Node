import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
  Res,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtUserDTO } from './dto/jwt-user.dto';
import { JWTGuard } from './guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,

    private jwtService: JwtService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    // 회원가입
    const insertData = await this.userService.create(createUserDto);
    const result = {
      accessToken: this.jwtService.sign({
        id: insertData.id,
        name: insertData.name,
        email: insertData.email,
      }),
    };

    if (insertData) {
      res.statusCode = 200;
      res.cookie('jwt', result.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1hours
      });
      return res.send({
        statusCode: res.statusCode,
        message: `${insertData.name}님의 회원가입에 성공하였습니다.`,
        user: {
          id: insertData.id,
          name: insertData.name,
          email: insertData.email,
        },
      });
    } else {
      throw new HttpException('회원가입에 실패하셨습니다', 400);
    }
  }

  @Post('/email')
  async verifyEmail(@Body('email') email: string, @Res() res: Response) {
    // 이메일 인증 및 중복 확인
    const randomNumber = await this.userService.verifyEmail(email);
    if (randomNumber.length) {
      res.statusCode = 200;
      return res.send({
        statusCode: res.statusCode,
        message: '사용가능한 email입니다.',
        code: randomNumber,
      });
    }
  }

  @Delete()
  @UseGuards(JWTGuard)
  async removeUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body('id') id: number,
  ) {
    const result = await this.userService.removeUser(id);
    if (result) {
      res.statusCode = 200;
      res.cookie('jwt', '', {
        maxAge: 0,
      });
      return res.send({
        statusCode: 200,
        message: '회원 탈퇴 완료',
      });
    }
    // } catch (error) {
    //   if (`${error}`.includes('jwt expires')) {
    //     throw new HttpException('JWT 만료', 400);
    //   }
    // }

    return null;
    // return this.userService.removeUser(jwtUser);
  }

  @Patch()
  @UseGuards(JWTGuard)
  updateUser(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    // 유저 업데이트

    return this.userService.updateUser(req, updateUserDto);
  }
}
