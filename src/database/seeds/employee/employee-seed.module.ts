import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeEntity } from '../../../modules/employee/infrastructure/entities/employee.entity';
import { EmployeeSeedService } from './employee-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  providers: [EmployeeSeedService],
  exports: [EmployeeSeedService],
})
export class EmployeeSeedModule {}
