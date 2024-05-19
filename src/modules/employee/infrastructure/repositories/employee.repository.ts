import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { getDayOfMonth } from '../../../../utils/date';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { Employee } from '../../domain/employee';
import { CreateEmployeeDTO } from '../../dtos/create-employee.dto';
import {
  FilterEmployeeDTO,
  SortEmployeeDTO,
} from '../../dtos/query-employee.dto';
import { EmployeeMapper } from '../../mappers/employee.mapper';
import { EmployeeEntity } from '../entities/employee.entity';

@Injectable()
export class EmployeesRepository {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async create(data: CreateEmployeeDTO): Promise<Employee> {
    const newEmployee = await this.employeeRepository.save(
      this.employeeRepository.create(data),
    );
    return EmployeeMapper.toDomain(newEmployee);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterEmployeeDTO | null;
    sortOptions?: SortEmployeeDTO[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Employee[]> {
    const where: FindOptionsWhere<EmployeeEntity> = {};
    if (filterOptions) {
      const { workType, name } = filterOptions;
      if (workType) {
        where.workType = workType;
      }
      if (name) {
        where.name = name;
      }
    }

    const entities = await this.employeeRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((employee) => EmployeeMapper.toDomain(employee));
  }

  async findOneById(id: Employee['id']): Promise<NullableType<Employee>> {
    const entity = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });

    return entity || null;
  }

  async update(
    id: Employee['id'],
    payload: Partial<Employee>,
  ): Promise<Employee> {
    const employeeEntity = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employeeEntity) {
      throw new Error('Employee not found');
    }

    const updatedEntity = await this.employeeRepository.save(
      this.employeeRepository.create({
        ...employeeEntity,
        ...payload,
      }),
    );

    return EmployeeMapper.toDomain(updatedEntity);
  }

  async updateBalance(id: Employee['id'], balance: number): Promise<Employee> {
    const employeeEntity = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employeeEntity) {
      throw new Error('Employee not found');
    }

    const updatedEntity = await this.employeeRepository.save(
      this.employeeRepository.create({
        ...employeeEntity,
        balance,
      }),
    );

    return EmployeeMapper.toDomain(updatedEntity);
  }

  async checkIn(id: Employee['id']): Promise<Employee> {
    const employeeEntity = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employeeEntity) {
      throw new Error('Employee not found');
    }
    const dayOfMonth = getDayOfMonth(new Date());
    employeeEntity.workDay =
      (employeeEntity.workDay + 1) % (dayOfMonth + 1) || 1;
    const updatedEntity = await this.employeeRepository.save(employeeEntity);

    return EmployeeMapper.toDomain(updatedEntity);
  }

  async delete(id: Employee['id']): Promise<DeleteResult> {
    const employeeEntity = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employeeEntity) {
      throw new Error('Employee not found');
    }

    const deletedEntity = await this.employeeRepository.delete(id);

    return deletedEntity;
  }
}
