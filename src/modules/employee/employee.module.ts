import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeEntity } from './infrastructure/entities/employee.entity';
import { EmployeesRepository } from './infrastructure/repositories/employee.repository';
import { EmployeeService } from './services/employee.service';

// const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeesRepository],
  exports: [EmployeeService],
})
export class EmployeeModule {}
