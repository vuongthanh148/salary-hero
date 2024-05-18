import { NestFactory } from '@nestjs/core';
import { EmployeeSeedService } from './employee/employee-seed.service';
import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);
  console.log('CALLING');
  await app.get(EmployeeSeedService).run();
  await app.close();
};

void runSeed();
