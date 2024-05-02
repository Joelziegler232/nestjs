import { Module } from '@nestjs/common';
import { PokemonController1 } from '../pages/api/pokemon/[id].json';
import { PokemonController2 } from '../pages/api/pokemon/[id]';
import { PokemonController3 } from '../pages/api/pokemon/index.json';
import { PokemonController4 } from '../pages/api/pokemon';
import { UserServiceDB } from '../db/users';
import { PokemonService } from '../services/pokemon.service';
import { UserService } from '../services/users';
import { LoginController } from './api/poke/auth';
import { SignupController } from './api/poke/users';
import { JwtService } from '../helpers/jwt';
import { AuthMiddleware } from './api/poke/auth.middleware';

@Module({
  controllers: [
    PokemonController1,
    PokemonController2,
    PokemonController3,
    PokemonController4,
    LoginController,
    SignupController,
  ],
  providers: [
    PokemonService,
    UserService,
    UserServiceDB,
    JwtService,
    AuthMiddleware,
  ],
})
export class PokemonModule {}
