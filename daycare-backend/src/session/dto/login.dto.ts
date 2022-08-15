import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 확인해주세요.' })
  @Length(6, 20, { message: '비밀번호는 6 ~ 20자 사이 입니다.' })
  password: string;

  token: string | undefined;
}
