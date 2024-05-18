import { Module } from '@nestjs/common';
import { ManagerModule } from '../manager/manager.module';
import { SchedulerService } from './services/scheduler.service';

@Module({
  imports: [ManagerModule],
  controllers: [],
  providers: [SchedulerService],
  exports: [],
})
export class SchedulerModule {}
