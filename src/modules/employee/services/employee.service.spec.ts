import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Employee } from '../domain/employee';
import { CreateEmployeeDTO } from '../dtos/create-employee.dto';
import { FilterEmployeeDTO, SortEmployeeDTO } from '../dtos/query-employee.dto';
import {
  EmployeeEntity,
  WorkType,
} from '../infrastructure/entities/employee.entity';
import { EmployeesRepository } from '../infrastructure/repositories/employee.repository';
import { EmployeeService } from './employee.service';

const createEmployeeDTO: CreateEmployeeDTO = {
  name: 'Stephen',
  balance: 10,
  workType: WorkType.Monthly,
  salary: 50,
};
const createdEmployee: EmployeeEntity = {
  id: '00c51492-04f7-4451-9715-cf1146262cbf',
  name: 'Stephen',
  balance: 10,
  workType: WorkType.Monthly,
  salary: 50,
  workDay: 0,
  createdAt: new Date('2024-05-18 17:31:30.919886'),
  updatedAt: new Date('2024-05-18 17:31:30.919886'),
};

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: EmployeesRepository,
          useValue: {
            create: jest.fn(),
            findManyWithPagination: jest.fn(),
            findOneById: jest.fn(),
            update: jest.fn(),
            updateBalance: jest.fn(),
            checkIn: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<EmployeesRepository>(EmployeesRepository);
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
    expect(employeeRepository).toBeDefined();
  });

  describe('createEmployee', () => {
    it('should call repository.create and return the result', async () => {
      jest
        .spyOn(employeeRepository, 'create')
        .mockResolvedValue(createdEmployee);

      const result = await employeeService.createEmployee(createEmployeeDTO);

      expect(employeeRepository.create).toHaveBeenCalledWith(createEmployeeDTO);
      expect(result).toEqual(createdEmployee);
    });
  });

  describe('findManyWithPagination', () => {
    it('should call repository.findManyWithPagination and return the result', async () => {
      const filterOptions: FilterEmployeeDTO = {
        /* properties */
      };
      const sortOptions: SortEmployeeDTO[] = [
        /* properties */
      ];
      const paginationOptions: IPaginationOptions = { page: 1, limit: 10 };
      const employees: Employee[] = [createdEmployee];

      jest
        .spyOn(employeeRepository, 'findManyWithPagination')
        .mockResolvedValue(employees);

      const result = await employeeService.findManyWithPagination({
        filterOptions,
        sortOptions,
        paginationOptions,
      });

      expect(employeeRepository.findManyWithPagination).toHaveBeenCalledWith({
        filterOptions,
        sortOptions,
        paginationOptions,
      });
      expect(result).toEqual(employees);
    });
  });

  describe('findOne', () => {
    it('should call repository.findOneById and return the result', async () => {
      const id = 'some-id';
      const employee: Employee = {
        /* properties */
      } as Employee;

      jest.spyOn(employeeRepository, 'findOneById').mockResolvedValue(employee);

      const result = await employeeService.findOne(id);

      expect(employeeRepository.findOneById).toHaveBeenCalledWith(id);
      expect(result).toEqual(employee);
    });
  });

  describe('update', () => {
    it('should call repository.update and return the result', async () => {
      const id = 'some-id';
      const payload: Partial<Omit<Employee, 'balance'>> = {
        /* properties */
      };
      const updatedEmployee: Employee = {
        /* properties */
      } as Employee;

      jest
        .spyOn(employeeRepository, 'update')
        .mockResolvedValue(updatedEmployee);

      const result = await employeeService.update(id, payload);

      expect(employeeRepository.update).toHaveBeenCalledWith(id, payload);
      expect(result).toEqual(updatedEmployee);
    });
  });

  describe('updateBalance', () => {
    it('should call repository.updateBalance and return the result', async () => {
      const id = 'some-id';
      const balance = 100;
      const updatedEmployee: Employee = {
        /* properties */
      } as Employee;

      jest
        .spyOn(employeeRepository, 'updateBalance')
        .mockResolvedValue(updatedEmployee);

      const result = await employeeService.updateBalance(id, balance);

      expect(employeeRepository.updateBalance).toHaveBeenCalledWith(
        id,
        balance,
      );
      expect(result).toEqual(updatedEmployee);
    });
  });

  describe('checkIn', () => {
    it('should call repository.checkIn and return the result', async () => {
      const id = 'some-id';
      const checkedInEmployee: Employee = {
        /* properties */
      } as Employee;

      jest
        .spyOn(employeeRepository, 'checkIn')
        .mockResolvedValue(checkedInEmployee);

      const result = await employeeService.checkIn(id);

      expect(employeeRepository.checkIn).toHaveBeenCalledWith(id);
      expect(result).toEqual(checkedInEmployee);
    });
  });

  describe('delete', () => {
    it('should call repository.delete and return the result', async () => {
      const id = 'some-id';
      const deleteResult: DeleteResult = { affected: 1 } as DeleteResult;

      jest.spyOn(employeeRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await employeeService.delete(id);

      expect(employeeRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteResult);
    });
  });
});
