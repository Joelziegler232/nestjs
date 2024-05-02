import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../../services/users';
import { JwtService } from '../../../helpers/jwt';

@Controller('login')
export class LoginController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      
      const user = await this.userService.authenticateUser({ email, password });

      const jwt = this.jwtService.signJWT(user);

      res.cookie('user', jwt, { maxAge: 60 * 60 * 24 });

      return res.status(200).json({ success: true });
    } catch (error) {
      
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
