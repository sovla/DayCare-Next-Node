import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtUserDTO } from 'src/user/dto/jwt-user.dto';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request<
      any,
      {
        id?: number;
      }
    > = context.switchToHttp().getRequest();
    let jwtUser;

    if (req?.cookies?.jwt == null) {
      throw new HttpException('로그인 후 이용가능합니다.', 401);
    }

    try {
      jwtUser = this.jwtService.verify<jwtUserDTO>(req.cookies['jwt']);
    } catch (error) {
      throw new HttpException('JWT 토큰이 만료되었습니다.', 400);
    }

    if (req.body.id == null) {
      throw new HttpException('id 값이 존재하지 않습니다.', 403);
    }

    if (+req.body.id !== +jwtUser.id) {
      throw new HttpException('본인의 글이 아닙니다.', 403);
    }

    return true;
  }
}
