import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { EmployeeEntity } from '../../../modules/employee/infrastructure/entities/employee.entity';
import { EMPLOYEE_LIST } from './factories/employee.factory';

@Injectable()
export class EmployeeSeedService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private repository: Repository<EmployeeEntity>,
  ) {}

  async run() {
    const count = await this.repository.count({});

    if (!count) {
      await this.repository.save(this.repository.create(EMPLOYEE_LIST));
    }
  }
}
