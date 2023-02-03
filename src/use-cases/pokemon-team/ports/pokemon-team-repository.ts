import { PokemonTeamDTO } from '@/entities/pokemon-team'

export interface PokemonTeamRepository {
  add(pokemon: PokemonTeamDTO): Promise<PokemonTeamDTO>
  findPokemonTeamByName(name: string): Promise<PokemonTeamDTO>
  findAllPokemonTeam(): Promise<PokemonTeamDTO[]>
  exists(pokemon: PokemonTeamDTO): Promise<boolean>
}
