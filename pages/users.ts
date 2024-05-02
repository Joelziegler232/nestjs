import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/users';

@Controller('signup')
export class SignupController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      await this.userService.createUser({ email, password });
      return res.redirect('/login');
    } catch (error) {
      return res.redirect('/signup?error=true');
    }
  }
}
