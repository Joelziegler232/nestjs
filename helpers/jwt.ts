import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  private readonly secret: string = 'contra';

  // Método para firmar un JWT
  public signJWT(payload: any): string {
    return jwt.sign(payload, this.secret);
  }

  // Método para verificar un JWT
  public verifyJWT(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      console.error('Error al verificar el JWT:', error.message);
      return null;
    }
  }
}
