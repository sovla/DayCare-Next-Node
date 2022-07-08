import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';
import { Center } from 'src/domain/center.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Center])],
  exports: [TypeOrmModule],
  controllers: [CenterController],
  providers: [CenterService],
})
export class CenterModule {}
