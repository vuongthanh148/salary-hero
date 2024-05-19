import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ManagerService } from '../services/manager.service';

@ApiTags('Manager')
@Controller({
  path: 'manager',
  version: '1',
})
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiOkResponse({})
  @Get('update-balance')
  @HttpCode(HttpStatus.OK)
  updateBalance() {
    return this.managerService.updateBalance();
  }
}
