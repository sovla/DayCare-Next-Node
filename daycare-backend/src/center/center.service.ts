import { Injectable } from '@nestjs/common';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';

@Injectable()
export class CenterService {
  create(createCenterDto: CreateCenterDto) {
    return 'This action adds a new center';
  }

  findAll() {
    return `This action returns all center`;
  }

  findOne(id: number) {
    return `This action returns a #${id} center`;
  }

  update(id: number, updateCenterDto: UpdateCenterDto) {
    return `This action updates a #${id} center`;
  }

  remove(id: number) {
    return `This action removes a #${id} center`;
  }
}
