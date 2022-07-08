import { User } from './entities/user.entity';
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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // 회원가입
    return this.userService.create(createUserDto);
  }

  @Post('/email')
  verifyEmail(@Body() email: string) {
    // 이메일 인증 및 중복 확인
    return this.userService.verifyEmail(email);
  }

  @Delete()
  removeUser(@Req() req: Request) {
    // 회원탈퇴
    return this.userService.removeUser(req);
  }

  @Patch()
  updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    // 유저 업데이트
    return this.userService.update(req, updateUserDto);
  }
}
