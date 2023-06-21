import {Controller, Get, Req} from '@nestjs/common';
import {AppService} from './app.service';
import {Request} from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): any {
    const clientIp =
      request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(`Request from IP: ${clientIp}`);
    return 'hello';
  }
}
