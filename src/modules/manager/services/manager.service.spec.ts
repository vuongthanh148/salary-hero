import { Test, TestingModule } from '@nestjs/testing';
import { CHUNK_CALCULATE_BALANCE } from '../../../utils/constants';
import { getDayOfMonth } from '../../../utils/date';
import { WorkType } from '../../employee/infrastructure/entities/employee.entity';
import { EmployeeService } from '../../employee/services/employee.service';
import { ManagerService } from './manager.service';

jest.mock('../../../utils/date', () => ({
  getDayOfMonth: jest.fn(),
}));

describe('ManagerService', () => {
  let managerService: ManagerService;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManagerService,
        {
          provide: EmployeeService,
          useValue: {
            findManyWithPagination: jest.fn(),
            updateBalance: jest.fn(),
          },
        },
      ],
    }).compile();

    managerService = module.get<ManagerService>(ManagerService);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(managerService).toBeDefined();
  });

  it('should update employee balances correctly', async () => {
    const mockEmployees = [
      {
        id: 1,
        workDay: 10,
        workType: WorkType.Monthly,
        salary: 3000,
      },
      {
        id: 2,
        workDay: 10,
        workType: WorkType.Daily,
        salary: 100,
      },
    ];

    (getDayOfMonth as jest.Mock).mockReturnValue(30);
    (employeeService.findManyWithPagination as jest.Mock)
      .mockResolvedValueOnce(mockEmployees)
      .mockResolvedValueOnce([]);

    await managerService.updateBalance();

    expect(employeeService.findManyWithPagination).toHaveBeenCalled();

    expect(employeeService.updateBalance).toHaveBeenCalledWith(
      1,
      1000, // 10 * (3000 / 30)
    );
    expect(employeeService.updateBalance).toHaveBeenCalledWith(
      2,
      1000, // 10 * (100 / 1)
    );
  });

  it('should handle pagination correctly', async () => {
    const mockEmployees = new Array(CHUNK_CALCULATE_BALANCE).fill({
      id: 1,
      workDay: 10,
      workType: WorkType.Monthly,
      salary: 3000,
    });

    (getDayOfMonth as jest.Mock).mockReturnValue(15);
    (employeeService.findManyWithPagination as jest.Mock)
      .mockResolvedValueOnce(mockEmployees)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(mockEmployees);

    await managerService.updateBalance();

    expect(employeeService.findManyWithPagination).toHaveBeenCalledTimes(2);
    expect(employeeService.updateBalance).toHaveBeenCalledTimes(
      CHUNK_CALCULATE_BALANCE,
    );
  });

  it('should handle invalid work types', async () => {
    const mockEmployees = [
      {
        id: 1,
        workDay: 10,
        workType: 'InvalidType',
        salary: 3000,
      },
    ];

    (getDayOfMonth as jest.Mock).mockReturnValue(15);
    (employeeService.findManyWithPagination as jest.Mock)
      .mockResolvedValueOnce(mockEmployees)
      .mockResolvedValueOnce([]);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await managerService.updateBalance();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Employee 1 have invalid working type: InvalidType.',
    );

    expect(employeeService.updateBalance).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
