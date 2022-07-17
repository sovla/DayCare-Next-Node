import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CenterModule } from './center/center.module';
import { ReviewModule } from './review/review.module';
import { ReplyModule } from './reply/reply.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { CategoryModule } from './category/category.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    CenterModule,
    ReviewModule,
    ReplyModule,
    UserModule,
    SessionModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
