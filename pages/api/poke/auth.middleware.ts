import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../../helpers/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const jwt = req.cookies['user'];
    if (!jwt) {
      throw new UnauthorizedException('Missing JWT');
    }
    if (this.jwtService.verifyJWT(jwt)) {
      next();
    } else {
      throw new UnauthorizedException('Invalid JWT');
    }
  }
}
