import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// We use class-transformer in ORM entity and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an ORM entity directly in response.
import { ApiResponseProperty } from '@nestjs/swagger';

export enum WorkType {
  Monthly = 'monthly',
  Daily = 'daily',
}

@Entity({
  name: 'employee',
})
export class EmployeeEntity {
  @ApiResponseProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'Stephen',
  })
  @Column({ type: String, unique: false, nullable: false })
  name: string;

  @ApiResponseProperty({
    type: Number,
    example: 1000,
  })
  @Column({ type: 'real', unique: false, nullable: false })
  balance: number;

  @ApiResponseProperty({
    type: Number,
    example: 10,
  })
  @Column({ type: Number, unique: false, nullable: false })
  workDay: number;

  @ApiResponseProperty({
    type: String,
    example: WorkType.Monthly,
  })
  @Column({ type: 'enum', enum: WorkType, unique: false, nullable: false })
  workType: string;

  @ApiResponseProperty({
    type: Number,
    example: 10000.5,
  })
  @Column({ type: 'real', unique: false, nullable: false })
  salary: number;

  @ApiResponseProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiResponseProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
