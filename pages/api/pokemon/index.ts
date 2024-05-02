import { Controller, Post, Body, Res, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { PokemonService } from "../../../services/pokemon.service";
import { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists } from "../../../helpers/errors";

@Controller("pokemon")
export class PokemonController4 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async addPokemon(@Body() body: { id: number, name: string }, @Res() res: Response) {
    const { id, name } = body;

    // Validar entrada
    if (!id || !name) {
      throw new HttpException(invalidInput, HttpStatus.BAD_REQUEST);
    }
    if (name.length > 30) {
      throw new HttpException(nameTooLong, HttpStatus.BAD_REQUEST);
    }
    if (name.length < 3) {
      throw new HttpException(nameTooShort, HttpStatus.BAD_REQUEST);
    }

    // Verificar si el Pokémon ya existe
    const existingPokemon = await this.pokemonService.findPokemonById(id) || await this.pokemonService.findPokemonByName(name);
    if (existingPokemon) {
      throw new HttpException(pokemonAlreadyExists, HttpStatus.BAD_REQUEST);
    }

    // Agregar el Pokémon
    try {
      const pokemon = { id, name };
      await this.pokemonService.addPokemon(pokemon);
      return res.redirect("/pokemons");
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
