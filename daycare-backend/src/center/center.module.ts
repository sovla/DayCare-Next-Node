import { Center } from './entities/center.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Center])],
  exports: [TypeOrmModule],
  controllers: [CenterController],
  providers: [CenterService],
})
export class CenterModule {}
