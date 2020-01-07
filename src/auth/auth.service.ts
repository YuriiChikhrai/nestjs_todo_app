import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(
    user: string,
    info: { ua: string; ip: string | string[] },
  ) {
    const payload = {
      user,
      browser: info.ua,
      ip: info.ip,
      issuer: 'https://todo.hillel.it',
      maxAge: '7d',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkToken(req: Request, payload: any): Promise<{ user: string }> {
    if (
      (req.headers['user-agent'] === payload.browser,
      payload.ip === req.ip || payload.ip === JSON.stringify(req.ips))
    ) {
      return { user: payload.user };
    }
  }
}
