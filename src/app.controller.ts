import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('product')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  @HttpCode(200)
  getHello(): {} {
    return { name: 'bilal' };
  }
}
