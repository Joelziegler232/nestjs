import { Controller, Delete, Param, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { PokemonService } from "../../../services/pokemon.service"; 

@Controller("pokemon")
export class PokemonController1 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Delete(":id")
  async deletePokemon(@Param("id") id: string, @Res() res: Response) {
    try {
      const pokemonId = parseInt(id, 10);
      const deletedPokemon = await this.pokemonService.deletePokemon(pokemonId);
      return res.status(HttpStatus.OK).json(deletedPokemon);
    } catch (error) {
      console.error("Error al eliminar Pokemon:", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error al eliminar Pokemon" });
    }
  }
}
