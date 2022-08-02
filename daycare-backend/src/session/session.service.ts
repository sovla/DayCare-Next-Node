import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDTO) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });
    if (!findUser) {
      throw new HttpException('아이디와 비밀번호를 확인해주세요.', 401);
    }
    const validatePassword = await bcrypt.compare(
      loginDto.password,
      findUser.password,
    );

    if (!validatePassword) {
      throw new HttpException('비밀번호가 틀립니다.', 401);
    }

    return findUser;
  }

  async silentLogin(id: number) {
    const findUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!findUser) {
      throw new HttpException('존재하지 않는 회원입니다.', 401);
    }

    return findUser;
  }
  async logout(id: number) {
    return true;
  }
}
