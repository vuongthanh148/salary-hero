import { Module } from '@nestjs/common';
import { EmployeeModule } from '../employee/employee.module';
import { ManagerController } from './controllers/manager.controller';
import { ManagerService } from './services/manager.service';

@Module({
  imports: [EmployeeModule],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
