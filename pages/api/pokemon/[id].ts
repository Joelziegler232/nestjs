import { Controller, Post, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { PokemonService } from "../../../services/pokemon.service";

@Controller("pokemon")
export class PokemonController2 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post(":id/delete")
  async deletePokemon(@Param("id") id: string, @Res() res: Response) {
    try {
      const pokemonId = parseInt(id, 10);
      await this.pokemonService.deletePokemon(pokemonId);
      return res.sendStatus(204); // Retorna un código de estado 204 (No Content) después de eliminar el Pokémon
    } catch (error) {
      console.error("Error al eliminar Pokémon:", error);
      return res.status(500).json({ message: "Error al eliminar Pokémon" });
    }
  }
}
