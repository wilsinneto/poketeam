import { RemovePokemonTeam } from '@/use-cases/pokemon-team/remove-pokemon-team'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'
import { RemovePokemonTeamController } from '@/web-controller/remove-pokemon-team-controller'
import { pokemonTeam } from '../database/in-memory'

export const makeRemovePokemonTeamController = (): RemovePokemonTeamController => {
  const inMemoryPokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
  const removePokemonTeamUseCase = new RemovePokemonTeam(inMemoryPokemonTeamRepository)
  const removePokemonTeamController = new RemovePokemonTeamController(removePokemonTeamUseCase)

  return removePokemonTeamController
}
