import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from '../../manager/services/manager.service';
import { SchedulerService } from './scheduler.service';

jest.mock('cron', () => ({
  CronJob: jest.fn(),
}));

describe('SchedulerService', () => {
  let schedulerService: SchedulerService;
  let managerService: ManagerService;

  beforeEach(async () => {
    jest.setSystemTime(new Date(2023, 11, 25, 23, 59, 59));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulerService,
        {
          provide: ManagerService,
          useValue: {
            updateBalance: jest.fn(),
          },
        },
      ],
    }).compile();

    schedulerService = module.get<SchedulerService>(SchedulerService);
    managerService = module.get<ManagerService>(ManagerService);
  });

  it('should be defined', () => {
    expect(schedulerService).toBeDefined();
  });

  it('should call managerService.updateBalance when scheduleBalanceCalculation is executed', async () => {
    await schedulerService.scheduleBalanceCalculation();
    expect(managerService.updateBalance).toHaveBeenCalledTimes(1);
  });
});
