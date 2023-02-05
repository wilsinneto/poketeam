import { pokemonTeam } from '@/main/database/in-memory'
import { FindPokemonTeam } from '@/use-cases/pokemon-team/find-pokemon-team'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'
import { FindPokemonTeamController } from '@/web-controller/find-pokemon-team-controller'

export const makeFindPokemonTeamController = (): FindPokemonTeamController => {
  const inMemoryPokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
  const findPokemonTeamUseCase = new FindPokemonTeam(inMemoryPokemonTeamRepository)
  const findPokemonTeamController = new FindPokemonTeamController(findPokemonTeamUseCase)

  return findPokemonTeamController
}
