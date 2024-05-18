import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ManagerService } from '../../manager/services/manager.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly managerService: ManagerService) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async scheduleBalanceCalculation() {
    await this.managerService.updateBalance();
  }
}
