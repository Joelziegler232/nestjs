import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from "../../../services/users"; 

@Controller('signup')
export class SignupController {
  constructor(private readonly userService: UserService) {} 

  @Post()
  async createUser(@Body('email') email: string, @Body('password') password: string, @Res() res: Response) {
    try {
      
      const newUser = await this.userService.createUser({ email, password }); 

      return res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user' });
    }
  }
}
