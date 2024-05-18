import { ApiResponseProperty } from '@nestjs/swagger';

export class Employee {
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'Stephen',
  })
  name: string;

  @ApiResponseProperty({
    type: Number,
    example: 1000,
  })
  balance: number;

  @ApiResponseProperty({
    type: Number,
    example: 10,
  })
  workDay: number;

  @ApiResponseProperty({
    type: String,
    example: 'monthly',
  })
  workType: string;

  @ApiResponseProperty({
    type: Number,
    example: 10000,
  })
  salary: number;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;
}
