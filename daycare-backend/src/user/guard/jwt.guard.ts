import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { jwtUserDTO } from '../dto/jwt-user.dto';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (request?.cookies?.jwt == null) {
      throw new HttpException('accessToken 값이 올바르지 않습니다.', 401);
    }
    try {
      const jwtUser = this.jwtService.verify<jwtUserDTO>(
        request.cookies['jwt'],
      );
    } catch (error) {
      throw new HttpException('JWT 토큰이 만료되었습니다.', 400);
    }

    return true;
  }
}
