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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

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
      accessToken: await this.jwtService.sign({
        id: insertData.identifiers,
        name: createUserDto.name,
        email: createUserDto.email,
      }),
    };

    if (insertData) {
      res.statusCode = 200;
      res.cookie('jwt', result.accessToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000, // 1hours
      });
      return res.send({
        statusCode: res.statusCode,
        message: `${createUserDto.name}님의 회원가입에 성공하였습니다.`,
        user: {
          name: createUserDto.name,
          email: createUserDto.email,
        },
      });
    } else {
      throw new HttpException('회원가입에 실패하셨습니다', 400);
    }
  }

  @Post('/email')
  async verifyEmail(@Body('email') email: string, @Res() res: Response) {
    // 이메일 인증 및 중복 확인
    if (await this.userService.verifyEmail(email)) {
      res.statusCode = 200;
      return res.send({
        statusCode: res.statusCode,
        message: '사용가능한 email입니다.',
      });
    }
  }

  @Delete()
  removeUser(@Req() req: Request, @Res() res: Response) {
    // 회원탈퇴
    return this.userService.removeUser(req);
  }

  @Patch()
  updateUser(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    // 유저 업데이트
    return this.userService.updateUser(req, updateUserDto);
  }
}
