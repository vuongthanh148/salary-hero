import { faker } from '@faker-js/faker';
import {
  EmployeeEntity,
  WorkType,
} from '../../../../modules/employee/infrastructure/entities/employee.entity';

export function createRandomEmployee(): EmployeeEntity {
  const employee = new EmployeeEntity();
  employee.name = faker.internet.userName();
  employee.salary = faker.number.float({ min: 1000, max: 30000 });
  employee.workDay = faker.number.int({ max: 31, min: 1 });
  employee.workType = faker.helpers.enumValue(WorkType);
  employee.balance = faker.number.float();
  return employee;
}

export const EMPLOYEE_LIST: EmployeeEntity[] = faker.helpers.multiple(
  createRandomEmployee,
  {
    count: 148,
  },
);
