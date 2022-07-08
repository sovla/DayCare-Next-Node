import { JwtService } from '@nestjs/jwt';
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Request } from 'express';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userFind: User = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (userFind) {
      throw new HttpException(
        '이미 사용중인 Email입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const privateUser = await this.transformPassword(createUserDto);

    const verificationCode = await this.cacheManager.get(createUserDto.email);
    if (!verificationCode) {
      throw new HttpException(
        '이메일 중복체크 및 인증코드가 발급되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (verificationCode !== createUserDto.verificationCode) {
      console.log(verificationCode);
      throw new HttpException(
        '이메일 인증코드가 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const insertData = await this.userRepository.insert({
      email: privateUser.email,
      name: privateUser.name,
      password: privateUser.password,
    });

    return insertData;
  }

  async transformPassword(user: CreateUserDto): Promise<CreateUserDto> {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }

  async verifyEmail(email: string) {
    const findUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (findUser) {
      throw new HttpException(
        '이미 사용중인 email입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const transporter = nodemailer.createTransport({
      // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
      service: 'gmail',
      // host를 gmail로 설정
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        // Gmail 주소 입력,
        user: process.env.NODEMAILER_USER,
        // Gmail 패스워드 입력
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const random: string = (Math.random() * 900000 + 100000).toFixed();
    await transporter.sendMail({
      // 보내는 곳의 이름과, 메일 주소를 입력
      from: `"DayCare " <${process.env.NODEMAILER_USER}>`,
      // 받는 곳의 메일 주소를 입력
      to: email,
      // 보내는 메일의 제목을 입력
      subject: 'DayCare 메일 인증 요청입니다.',
      // 보내는 메일의 내용을 입력
      // text: 일반 text로 작성된 내용
      // html: html로 작성된 내용
      html: `<p>인증번호 : [<b>${random}</b>]</p>`,
    });

    this.cacheManager.set(email, random, { ttl: 3000 });
    // 이메일 인증코드 캐시에 저장

    return true;
  }

  updateUser(req: Request, updateUserDto: UpdateUserDto) {
    return `This action updates a `;
  }

  removeUser(req: Request) {
    return `This action removes a # user`;
  }
}
