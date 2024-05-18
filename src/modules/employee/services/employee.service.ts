import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Employee } from '../domain/employee';
import { CreateEmployeeDTO } from '../dtos/create-employee.dto';
import { FilterEmployeeDTO, SortEmployeeDTO } from '../dtos/query-employee.dto';
import { EmployeesRepository } from '../infrastructure/repositories/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeesRepository) {}

  async createEmployee(create: CreateEmployeeDTO): Promise<Employee> {
    return this.employeeRepository.create(create);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterEmployeeDTO | null;
    sortOptions?: SortEmployeeDTO[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Employee[]> {
    return this.employeeRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(id: Employee['id']): Promise<NullableType<Employee>> {
    return this.employeeRepository.findOneById(id);
  }

  async update(
    id: Employee['id'],
    payload: Partial<Omit<Employee, 'balance'>>,
  ): Promise<Employee | null> {
    return this.employeeRepository.update(id, payload);
  }

  async checkIn(id: Employee['id']): Promise<Employee | null> {
    return this.employeeRepository.checkIn(id);
  }

  async delete(id: Employee['id']): Promise<DeleteResult> {
    return this.employeeRepository.delete(id);
  }

  updateBalance(id: Employee['id'], balance: number): Promise<Employee | null> {
    return this.employeeRepository.updateBalance(id, balance);
  }
}
