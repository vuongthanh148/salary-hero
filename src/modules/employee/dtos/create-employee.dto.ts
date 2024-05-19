import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { WorkType } from '../infrastructure/entities/employee.entity';

export class CreateEmployeeDTO {
  @ApiProperty({
    type: String,
    example: 'Stephen',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    example: 1000,
  })
  @IsNumber()
  balance: number;

  @ApiProperty({
    type: Number,
    example: 10,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  workDay?: number;

  @ApiProperty({
    type: 'enum',
    enum: WorkType,
    example: WorkType.Monthly,
  })
  @IsEnum(WorkType)
  workType: string;

  @ApiProperty({
    type: Number,
    example: 10000.7,
  })
  @IsNumber()
  salary: number;
}
