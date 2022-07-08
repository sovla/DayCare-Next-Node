import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '이름을 확인해주세요.' })
  @Length(2, 20)
  name: string;

  @IsNotEmpty({ message: '비밀번호를 확인해주세요.' })
  @Length(6, 20, { message: '비밀번호는 6 ~ 20자 사이 입니다.' })
  password: string;

  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @IsNotEmpty({
    message: '인증코드를 확인해주세요.',
  })
  verificationCode: string;
}
