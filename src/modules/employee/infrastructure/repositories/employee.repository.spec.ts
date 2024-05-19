import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { Employee } from '../../domain/employee';
import { CreateEmployeeDTO } from '../../dtos/create-employee.dto';
import {
  FilterEmployeeDTO,
  SortEmployeeDTO,
} from '../../dtos/query-employee.dto';
import { EmployeeMapper } from '../../mappers/employee.mapper';
import { EmployeeEntity, WorkType } from '../entities/employee.entity';
import { EmployeesRepository } from './employee.repository';

jest.mock('typeorm', () => {
  const actualTypeOrm = jest.requireActual('typeorm');
  return {
    ...actualTypeOrm,
    Repository: jest.fn().mockImplementation(() => ({
      save: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    })),
  };
});
const createEmployeeDTO: CreateEmployeeDTO = {
  name: 'Stephen',
  balance: 10,
  workType: WorkType.Monthly,
  salary: 50,
};
const createdEntity: EmployeeEntity = {
  id: '00c51492-04f7-4451-9715-cf1146262cbf',
  name: 'Stephen',
  balance: 10,
  workType: WorkType.Monthly,
  salary: 50,
  workDay: 0,
  createdAt: new Date('2024-05-18 17:31:30.919886'),
  updatedAt: new Date('2024-05-18 17:31:30.919886'),
};
const domainEmployee = {
  id: '00c51492-04f7-4451-9715-cf1146262cbf',
  name: 'Stephen',
  balance: 10,
  workType: WorkType.Monthly,
  salary: 50,
  workDay: 0,
  createdAt: new Date('2024-05-18 17:31:30.919886'),
  updatedAt: new Date('2024-05-18 17:31:30.919886'),
} as Employee;

describe('EmployeesRepository', () => {
  let employeeRepository: Repository<EmployeeEntity>;
  let employeesRepository: EmployeesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesRepository,
        EmployeeMapper,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(EmployeeEntity),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    employeeRepository = module.get<Repository<EmployeeEntity>>(
      getRepositoryToken(EmployeeEntity),
    );
    employeesRepository = module.get<EmployeesRepository>(EmployeesRepository);
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      jest
        .spyOn(employeeRepository, 'save')
        .mockResolvedValueOnce(createdEntity);

      jest.spyOn(EmployeeMapper, 'toDomain').mockReturnValue(domainEmployee);

      const result = await employeesRepository.create(createEmployeeDTO);

      expect(EmployeeMapper.toDomain).toHaveBeenCalledWith(createdEntity);
      expect(result).toEqual(domainEmployee);
    });
  });

  describe('findManyWithPagination', () => {
    it('should find employees with pagination', async () => {
      const filterOptions: FilterEmployeeDTO = {
        /* properties */
      };
      const sortOptions: SortEmployeeDTO[] = [
        /* properties */
      ];
      const paginationOptions: IPaginationOptions = { page: 1, limit: 10 };
      const foundEntities = [createdEntity];
      const domainEmployees = [domainEmployee] as Employee[];

      jest
        .spyOn(employeeRepository, 'find')
        .mockResolvedValueOnce(foundEntities);

      expect(EmployeeMapper.toDomain).toHaveBeenCalledWith(createdEntity);

      const result = await employeesRepository.findManyWithPagination({
        filterOptions,
        sortOptions,
        paginationOptions,
      });

      expect(employeeRepository.find).toHaveBeenCalled();
      expect(result).toEqual(domainEmployees);
    });
  });

  describe('findOneById', () => {
    it('should find one employee by id', async () => {
      const id = 'some-id';
      const foundEntities = createdEntity;
      jest
        .spyOn(employeeRepository, 'findOne')
        .mockResolvedValueOnce(foundEntities);

      expect(EmployeeMapper.toDomain).toHaveBeenCalledWith(foundEntities);

      const result = await employeesRepository.findOneById(id);

      expect(employeeRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(EmployeeMapper.toDomain).toHaveBeenCalledWith(foundEntities);
      expect(result).toEqual(domainEmployee);
    });

    it('should return null if employee is not found', async () => {
      const id = 'some-id';

      jest.spyOn(employeeRepository, 'findOne').mockResolvedValueOnce(null);

      const result = await employeesRepository.findOneById(id);

      expect(employeeRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an existing employee', async () => {
      const id = 'some-id';
      const payload = {
        /* properties */
      } as Partial<Employee>;
      const existingEntity = createdEntity;
      const updatedEntity = createdEntity;

      jest
        .spyOn(employeeRepository, 'findOne')
        .mockResolvedValueOnce(existingEntity);
      jest
        .spyOn(employeeRepository, 'save')
        .mockResolvedValueOnce(updatedEntity);

      const result = await employeesRepository.update(id, payload);

      expect(employeeRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(domainEmployee);
    });

    it('should throw an error if employee is not found', async () => {
      const id = 'some-id';
      const payload = {
        /* properties */
      } as Partial<Employee>;

      jest.spyOn(employeeRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(employeesRepository.update(id, payload)).rejects.toThrow(
        'Employee not found',
      );
    });
  });

  describe('updateBalance', () => {
    it('should update the balance of an existing employee', async () => {
      const id = 'some-id';
      const balance = 100;
      const existingEntity = createdEntity;
      const updatedEntity = createdEntity;

      jest
        .spyOn(employeeRepository, 'findOne')
        .mockResolvedValueOnce(existingEntity);
      jest
        .spyOn(employeeRepository, 'save')
        .mockResolvedValueOnce(updatedEntity);

      const result = await employeesRepository.updateBalance(id, balance);

      expect(employeeRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(EmployeeMapper.toDomain).toHaveBeenCalledWith(updatedEntity);
      expect(result).toEqual(domainEmployee);
    });

    it('should throw an error if employee is not found', async () => {
      const id = 'some-id';
      const balance = 100;

      jest.spyOn(employeeRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        employeesRepository.updateBalance(id, balance),
      ).rejects.toThrow('Employee not found');
    });
  });

  describe('checkIn', () => {
    it('should update the workDay of an existing employee', async () => {
      const id = 'some-id';
      const existingEntity = { ...createdEntity, workDay: 5 };
      const updatedEntity = { ...createdEntity, workDay: 6 };

      // jest
      //   .spyOn(global, 'Date')
      //   .mockImplementation(
      //     () => new Date('2024-05-19T00:00:00Z') as unknown as string,
      //   );

      jest
        .spyOn(employeeRepository, 'findOne')
        .mockResolvedValueOnce(existingEntity);
      jest
        .spyOn(employeeRepository, 'save')
        .mockResolvedValueOnce(updatedEntity);

      const result = await employeesRepository.checkIn(id);

      expect(employeeRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(updatedEntity.workDay).toBe(6);
      expect(EmployeeMapper.toDomain).toHaveBeenCalledWith(updatedEntity);
      expect(result).toEqual(domainEmployee);
    });

    it('should throw an error if employee is not found', async () => {
      const id = 'some-id';

      jest.spyOn(employeeRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(employeesRepository.checkIn(id)).rejects.toThrow(
        'Employee not found',
      );
    });
  });

  describe('delete', () => {
    it('should delete an existing employee', async () => {
      const id = 'some-id';
      const deleteResult = { affected: 1 } as DeleteResult;

      jest
        .spyOn(employeeRepository, 'findOne')
        .mockResolvedValueOnce(createdEntity);
      jest
        .spyOn(employeeRepository, 'delete')
        .mockResolvedValueOnce(deleteResult);

      const result = await employeesRepository.delete(id);

      expect(employeeRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(employeeRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteResult);
    });

    it('should throw an error if employee is not found', async () => {
      const id = 'some-id';

      jest.spyOn(employeeRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(employeesRepository.delete(id)).rejects.toThrow(
        'Employee not found',
      );
    });
  });
});
