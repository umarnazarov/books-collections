import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  login() {
    return { message: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect() {
    return { message: 'Logged successfull' };
  }

  @Get('status')
  status(@Req() req: Request) {
    if (req.user) {
      return {
        message: 'Authenticated',
      };
    } else {
      return {
        message: 'Not Authenticated',
      };
    }
  }
}
