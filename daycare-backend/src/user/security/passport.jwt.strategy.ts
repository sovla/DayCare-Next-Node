import { jwtUserDTO } from './../dto/jwt-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }

  async validate(payload: jwtUserDTO, done: VerifiedCallback): Promise<any> {
    const user = await this.userService.tokenValidateUser(payload);
    if (!user) {
      return done(
        new UnauthorizedException({ message: 'user does not exist' }),
        false,
      );
    }

    return done(null, user);
  }
}
