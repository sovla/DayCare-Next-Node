import { Module, CacheModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/domain/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '300s',
      },
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
