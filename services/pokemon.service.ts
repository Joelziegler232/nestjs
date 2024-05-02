import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export type Pokemon = {
  id: number;
  name: string;
};

@Injectable()
export class PokemonService {
  private pokemonList: Pokemon[] = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' },
    { id: 5, name: 'Charmeleon' },
    { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' },
    { id: 8, name: 'Wartortle' },
    { id: 9, name: 'Blastoise' },
  ];

  findPokemonById(id: number): Pokemon {
    const pokemon = this.pokemonList.find(p => p.id === id);
    if (!pokemon) {
      throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
    }
    return pokemon;
  }

  findPokemonByName(name: string): Pokemon {
    const pokemon = this.pokemonList.find(p => p.name === name);
    if (!pokemon) {
      throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
    }
    return pokemon;
  }

  getPokemonList(page = 1, pageSize = 5): { list: Pokemon[]; count: number } {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return {
      list: this.pokemonList.slice(startIndex, endIndex),
      count: this.pokemonList.length,
    };
  }

  addPokemon(pokemon: Pokemon): Pokemon {
    const existingPokemon = this.pokemonList.find(p => p.id === pokemon.id);
    if (existingPokemon) {
      throw new BadRequestException('Pokemon already exists');
    }
    this.pokemonList.push(pokemon);
    return pokemon;
  }

  deletePokemon(pokemonId: number): Pokemon {
    const index = this.pokemonList.findIndex(pokemon => pokemon.id === pokemonId);
    if (index === -1) {
      throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
    }
    return this.pokemonList.splice(index, 1)[0];
  }
}
