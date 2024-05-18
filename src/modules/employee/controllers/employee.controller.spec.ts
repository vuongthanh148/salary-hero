import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { Employee } from '../domain/employee';
import { CreateEmployeeDTO } from '../dtos/create-employee.dto';
import { SortEmployeeDTO } from '../dtos/query-employee.dto';
import { UpdateEmployeeDTO } from '../dtos/update-employee.dto';
import { WorkType } from '../infrastructure/entities/employee.entity';
import { EmployeeService } from '../services/employee.service';
import { EmployeeController } from './employee.controller';

const createEmployeeDTO: CreateEmployeeDTO = {
  name: 'Stephen',
  balance: 10,
  workType: WorkType.Monthly,
  salary: 50,
};
const createdEmployee: Employee = {
  id: '00c51492-04f7-4451-9715-cf1146262cbf',
  name: 'Stephen',
  balance: 10,
  workType: WorkType.Monthly,
  salary: 50,
  workDay: 0,
  createdAt: new Date('2024-05-18 17:31:30.919886'),
  updatedAt: new Date('2024-05-18 17:31:30.919886'),
};

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            createEmployee: jest.fn(),
            findManyWithPagination: jest.fn(),
            findOne: jest.fn(),
            checkIn: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createEmployee', () => {
    it('should call service.createEmployee and return the result', async () => {
      jest.spyOn(service, 'createEmployee').mockResolvedValue(createdEmployee);

      const result = await controller.createEmployee(createEmployeeDTO);

      expect(service.createEmployee).toHaveBeenCalledWith(createEmployeeDTO);
      expect(result).toEqual(createdEmployee);
    });
  });

  describe('findAll', () => {
    it('should call service.findManyWithPagination with default pagination options', async () => {
      jest.spyOn(service, 'findManyWithPagination').mockResolvedValue([]);

      await controller.findAll({});

      expect(service.findManyWithPagination).toHaveBeenCalledWith({
        filterOptions: undefined,
        sortOptions: undefined,
        paginationOptions: { page: 1, limit: 10 },
      });
    });

    it('should call service.findManyWithPagination with provided pagination options', async () => {
      const query = {
        page: 2,
        limit: 20,
        filters: {
          workType: WorkType.Daily,
          name: 'Stephen',
        },
        sort: [
          {
            orderBy: 'name',
            order: 'asc',
          } as SortEmployeeDTO,
        ],
      };

      jest.spyOn(service, 'findManyWithPagination').mockResolvedValue([]);

      await controller.findAll(query);

      expect(service.findManyWithPagination).toHaveBeenCalledWith({
        filterOptions: query.filters,
        sortOptions: query.sort,
        paginationOptions: { page: query.page, limit: query.limit },
      });
    });

    it('should limit maximum limit to 50', async () => {
      const query = { limit: 100 };

      jest.spyOn(service, 'findManyWithPagination').mockResolvedValue([]);

      await controller.findAll(query);

      expect(service.findManyWithPagination).toHaveBeenCalledWith(
        expect.objectContaining({ paginationOptions: { limit: 50, page: 1 } }),
      );
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with the provided id', async () => {
      const id = 'some-id';

      jest.spyOn(service, 'findOne').mockResolvedValue(createdEmployee);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(createdEmployee);
    });
  });

  describe('checkIn', () => {
    it('should call service.checkIn with the provided id', async () => {
      const id = 'some-id';

      jest.spyOn(service, 'checkIn').mockResolvedValue(createdEmployee);

      const result = await controller.checkIn(id);

      expect(service.checkIn).toHaveBeenCalledWith(id);
      expect(result).toEqual(createdEmployee);
    });
  });

  describe('update', () => {
    it('should call service.update with the provided id and payload', async () => {
      const id = 'some-id';
      const updateEmployeeDTO: UpdateEmployeeDTO = {
        /* properties */
      };
      const updatedEmployee: Employee | null = createdEmployee;

      jest.spyOn(service, 'update').mockResolvedValue(updatedEmployee);

      const result = await controller.update(id, updateEmployeeDTO);

      expect(service.update).toHaveBeenCalledWith(id, updateEmployeeDTO);
      expect(result).toEqual(updatedEmployee);
    });
  });

  describe('remove', () => {
    it('should call service.delete with the provided id', async () => {
      const id = 'some-id';
      const deleteResult: DeleteResult = { affected: 1 } as DeleteResult;

      jest.spyOn(service, 'delete').mockResolvedValue(deleteResult);

      const result = await controller.remove(id);

      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteResult);
    });
  });
});
