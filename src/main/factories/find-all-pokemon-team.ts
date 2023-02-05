import { pokemonTeam } from '@/main/database/in-memory'
import { FindAllPokemonTeam } from '@/use-cases/pokemon-team/find-all-pokemon-team'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'
import { FindAllPokemonTeamController } from '@/web-controller/find-all-pokemon-team-controller'

export const makeFindAllPokemonTeamController = (): FindAllPokemonTeamController => {
  const inMemoryPokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
  const findAllPokemonTeamUseCase = new FindAllPokemonTeam(inMemoryPokemonTeamRepository)
  const findAllPokemonTeamController = new FindAllPokemonTeamController(findAllPokemonTeamUseCase)

  return findAllPokemonTeamController
}
