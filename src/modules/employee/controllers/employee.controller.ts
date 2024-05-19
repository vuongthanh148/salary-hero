import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { DeleteResult } from 'typeorm';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDTO,
} from '../../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../../utils/infinity-pagination';
import { NullableType } from '../../../utils/types/nullable.type';
import { Employee } from '../domain/employee';
import { CreateEmployeeDTO } from '../dtos/create-employee.dto';
import { QueryEmployeeDTO } from '../dtos/query-employee.dto';
import { UpdateEmployeeDTO } from '../dtos/update-employee.dto';
import { EmployeeService } from '../services/employee.service';

@ApiTags('Employees')
@Controller({
  path: 'employees',
  version: '1',
})
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiCreatedResponse({
    type: Employee,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createEmployee(
    @Body() createEmployeeDTO: CreateEmployeeDTO,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDTO);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Employee),
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryEmployeeDTO,
  ): Promise<InfinityPaginationResponseDTO<Employee>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.employeeService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @ApiOkResponse({
    type: Employee,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Employee['id']): Promise<NullableType<Employee>> {
    return this.employeeService.findOne(id);
  }

  @ApiOkResponse({
    type: Employee,
  })
  @Get(':id/checkin')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  checkIn(@Param('id') id: Employee['id']): Promise<NullableType<Employee>> {
    return this.employeeService.checkIn(id);
  }

  @ApiOkResponse({
    type: Employee,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Employee['id'],
    @Body() updateEmployeeDTO: UpdateEmployeeDTO,
  ): Promise<Employee | null> {
    return this.employeeService.update(id, updateEmployeeDTO);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Employee['id']): Promise<DeleteResult> {
    return this.employeeService.delete(id);
  }
}
