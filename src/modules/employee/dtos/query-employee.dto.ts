import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, plainToInstance } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Employee } from '../domain/employee';
import { WorkType } from '../infrastructure/entities/employee.entity';

export class FilterEmployeeDTO {
  @ApiPropertyOptional({ type: WorkType })
  @IsOptional()
  workType?: WorkType;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  name?: string;
}

export class SortEmployeeDTO {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Employee;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryEmployeeDTO {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterEmployeeDTO, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterEmployeeDTO)
  filters?: FilterEmployeeDTO | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortEmployeeDTO, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortEmployeeDTO)
  sort?: SortEmployeeDTO[] | null;
}
