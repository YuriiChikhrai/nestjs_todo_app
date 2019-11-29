import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `
      <html>
        <head>
          <title>
            Hillel TODO-APP backend
          </title>
        </head>
        <body>
          <h1>Here will be documentation to work with service</h1>
        </body>
      </html>
    `;
  }
}
