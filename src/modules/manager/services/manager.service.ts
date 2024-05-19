import { Injectable } from '@nestjs/common';
import { CHUNK_CALCULATE_BALANCE } from '../../../utils/constants';
import { getDayOfMonth } from '../../../utils/date';
import { WorkType } from '../../employee/infrastructure/entities/employee.entity';
import { EmployeeService } from '../../employee/services/employee.service';

@Injectable()
export class ManagerService {
  constructor(private readonly employeeService: EmployeeService) {}

  async updateBalance() {
    console.log('UPDATE EMPLOYEE BALANCE STARTED:', new Date());

    let hasNextPage = true;
    let updatedCount = 0,
      currentPage = 0;
    const dayOfMonth = getDayOfMonth(new Date());

    while (hasNextPage) {
      currentPage++;
      const employeeList = await this.employeeService.findManyWithPagination({
        paginationOptions: {
          page: currentPage,
          limit: CHUNK_CALCULATE_BALANCE,
        },
        sortOptions: [
          {
            orderBy: 'updatedAt',
            order: 'desc',
          },
        ],
      });
      hasNextPage = employeeList.length === CHUNK_CALCULATE_BALANCE;

      const updateBalancePromises = employeeList.map((emp) => {
        const { workDay, workType, salary } = emp;
        let totalWorkDay = 1;

        switch (workType) {
          case WorkType.Monthly:
            totalWorkDay = dayOfMonth;
            break;
          case WorkType.Daily:
            totalWorkDay = 1;
            break;
          default:
            totalWorkDay = 0;
        }

        if (!totalWorkDay) {
          console.log(
            `Employee ${emp.id} have invalid working type: ${workType}.`,
          );
        } else {
          const newBalance = workDay * (salary / totalWorkDay);
          return this.employeeService.updateBalance(emp.id, newBalance);
        }
      });
      console.log('START COMMIT DATA');
      await Promise.all(updateBalancePromises);

      updatedCount += Math.min(CHUNK_CALCULATE_BALANCE, employeeList.length);
      console.log('UPDATED EMPLOYEE:', updatedCount);
    }
    console.log('UPDATE EMPLOYEE BALANCE FINISHED.');
  }
}
