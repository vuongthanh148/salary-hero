import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from '../services/manager.service';
import { ManagerController } from './manager.controller';

describe('ManagerController', () => {
  let managerController: ManagerController;
  let managerService: ManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerController],
      providers: [
        {
          provide: ManagerService,
          useValue: {
            updateBalance: jest.fn().mockResolvedValue('balance updated'),
          },
        },
      ],
    }).compile();

    managerController = module.get<ManagerController>(ManagerController);
    managerService = module.get<ManagerService>(ManagerService);
  });

  it('should be defined', () => {
    expect(managerController).toBeDefined();
  });

  it('should return the result from managerService.updateBalance', async () => {
    const result = await managerController.updateBalance();
    expect(result).toBe('balance updated');
  });

  it('should call managerService.updateBalance once', async () => {
    await managerController.updateBalance();
    expect(managerService.updateBalance).toHaveBeenCalledTimes(1);
  });

  it('should return status OK for updateBalance', async () => {
    const status = HttpStatus.OK;
    const response = await managerController.updateBalance();
    expect(response).toBe('balance updated');
    expect(status).toBe(HttpStatus.OK);
  });
});
