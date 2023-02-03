import { PokemonDTO } from "@/entities/pokemon/pokemon-dto";

export interface PokemonTeamDTO {
  id?: string | undefined,
  name: string,
  pokemons: PokemonDTO[]
}