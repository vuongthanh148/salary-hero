import { Employee } from '../domain/employee';
import { EmployeeEntity } from '../infrastructure/entities/employee.entity';

export class EmployeeMapper {
  static toDomain(raw: EmployeeEntity): Employee {
    const employee = new Employee();
    employee.id = raw.id;
    employee.name = raw.name;
    employee.balance = raw.balance;
    employee.salary = raw.salary;
    employee.workDay = raw.workDay;
    employee.workType = raw.workType;
    employee.createdAt = raw.createdAt;
    employee.updatedAt = raw.updatedAt;
    return employee;
  }

  static toPersistence(Employee: Employee): EmployeeEntity {
    const employeeEntity = new EmployeeEntity();
    if (Employee.id && typeof Employee.id === 'number') {
      employeeEntity.id = Employee.id;
    }
    employeeEntity.id = Employee.id;
    employeeEntity.name = Employee.name;
    employeeEntity.balance = Employee.balance;
    employeeEntity.salary = Employee.salary;
    employeeEntity.workDay = Employee.workDay;
    employeeEntity.workType = Employee.workType;
    employeeEntity.createdAt = Employee.createdAt;
    employeeEntity.updatedAt = Employee.updatedAt;

    return employeeEntity;
  }
}
