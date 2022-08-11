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

  @Get('/:id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const findUser = await this.userService.findOne(+id);
    res.statusCode = 200;
    return res.send({
      statusCode: res.statusCode,
      message: `유저 정보 불러오기 완료`,
      user: findUser,
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    // 회원가입
    const insertData = await this.userService.create(createUserDto);

    if (!insertData) {
      throw new HttpException('회원가입에 실패하셨습니다', 400);
    }
    const accessToken = this.jwtService.sign({
      // JWT 토큰 사인
      id: insertData.id,
      name: insertData.name,
      email: insertData.email,
    });

    res.statusCode = 200;
    res.cookie('jwt', accessToken, {
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 48 * 60 * 60 * 1000, // 2days
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
  async updateUser(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    // 유저 업데이트
    console.log(updateUserDto);
    const saveUser = await this.userService.updateUser(updateUserDto);
    res.statusCode = 200;

    return res.send({
      statusCode: res.statusCode,
      message: '변경완료',
      user: saveUser,
    });
  }
}
