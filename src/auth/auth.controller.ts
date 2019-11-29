import {
  Controller,
  Post,
  Body,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { receiveLoginDto } from './dto/generate_jwt_dto';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  generateJwt(@Body() body: receiveLoginDto, @Req() req: Request) {
    return this.authService.generateToken(body.value, {
      ua: req.headers['user-agent'],
      ip: req.ip || req.ips,
    });
  }
}
