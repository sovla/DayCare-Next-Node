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
import { Cache } from 'cache-manager';
import { jwtUserDTO } from './dto/jwt-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({
      where: {
        id,
        delete_account: 0,
      },
      relations: {
        reviews: true,
        reply: true,
      },
      loadEagerRelations: false,
      select: {
        id: true,
        email: true,
        name: true,
        center_likes: true,
        reply: true,
        reviews: true,
        reply_likes: true,
        likes: true,
      },
    });
    if (!findUser) {
      throw new HttpException(
        '올바르지 않은 유저 정보입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return findUser;
  }

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

    createUserDto.password = await this.transformPassword(
      createUserDto.password,
    );

    const verificationCode = await this.cacheManager.get(createUserDto.email);
    if (!verificationCode) {
      throw new HttpException(
        '이메일 중복체크 및 인증코드가 발급되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (verificationCode !== createUserDto.verificationCode) {
      throw new HttpException(
        '이메일 인증코드가 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const insertData = await this.userRepository.save({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
    });

    return insertData;
  }

  async transformPassword(password: string): Promise<string> {
    // 해싱이란 특정 알고리즘을 통해 인간이 해독하지 못하는 문자열로 변형
    // 해싱 특징
    // 1. 단방향이다. 되돌릴 수 없다
    // 2. 동일한 입력값 동일한 출력 값을 갖는다
    // 3. 입력값의 일부만 변경되어도 전혀 다른 출력값을 갖는다
    // ++ 이러한 특징에 Salt라는 랜덤한 값을 추가해 보안을 강화한다
    // bcrypt.hash(문자열,Salt문자열 길이)
    return await bcrypt.hash(password, 10);
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

    this.cacheManager.set(email, random, { ttl: 300 });
    // 이메일 인증코드 캐시에 저장

    return random;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const findUser = await this.userRepository.findOne({
      where: {
        id: updateUserDto.id,
        delete_account: 0,
      },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });

    if (!findUser) {
      throw new HttpException(
        '올바르지 않은 유저 정보입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updateUserDto?.password) {
      updateUserDto.password = await this.transformPassword(
        updateUserDto.password,
      );
    }

    const saveUser = await this.userRepository.save({
      id: findUser.id,
      name: updateUserDto?.name ?? findUser.name,
      password: updateUserDto?.password ?? findUser.password,
    });

    return await this.userRepository.findOne({
      where: { id: findUser.id },
      select: { id: true, name: true, email: true },
    });
  }

  async removeUser(id: number) {
    const findUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (findUser.delete_account === 0) {
      await this.userRepository.save({ ...findUser, delete_account: 1 });
      return true;
    } else if (findUser.delete_account === 1) {
      throw new HttpException('이미 탈퇴처리된 회원입니다.', 400);
    } else {
      throw new HttpException('존재하지 않는 회원입니다.', 400);
    }
  }

  async tokenValidateUser(payload: jwtUserDTO) {
    const userFind = await this.userRepository.find({
      where: { id: payload.id },
    });
    return userFind;
  }
}
