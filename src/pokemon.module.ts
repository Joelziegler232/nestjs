import { Module } from '@nestjs/common';
import { PokemonController1 } from '../pages/api/pokemon/[id].json';
import { PokemonController2 } from '../pages/api/pokemon/[id]';
import { PokemonController3 } from '../pages/api/pokemon/index.json';
import { PokemonController4 } from '../pages/api/pokemon';
import { UserServiceDB } from "../db/users";
import { PokemonService } from "../services/pokemon.service";
import { UserService } from "../services/users";

@Module({
  controllers: [
    PokemonController1,
    PokemonController2,
    PokemonController3,
    PokemonController4
  ],
  providers: [PokemonService, UserService, UserServiceDB],
})
export class PokemonModule {}
