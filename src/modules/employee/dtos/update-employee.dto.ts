import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { WorkType } from '../infrastructure/entities/employee.entity';

export class UpdateEmployeeDTO {
  @ApiProperty({
    type: String,
    example: 'Stephen',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  workDay?: number;

  @ApiProperty({
    type: 'enum',
    enum: WorkType,
    example: WorkType.Monthly,
  })
  @IsEnum(WorkType)
  @IsOptional()
  workType?: string;

  @ApiProperty({
    type: Number,
    example: 10000,
  })
  @IsNumber()
  @IsOptional()
  salary?: number;
}
