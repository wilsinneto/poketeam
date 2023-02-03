import { CreatePokemonTeam } from '@/use-cases/pokemon-team/create-pokemon-team'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'
import { CreatePokemonTeamController } from '@/web-controller/create-pokemon-team-controller'
import { pokemonTeam } from '../database/in-memory'

export const makeCreatePokemonTeamController = (): CreatePokemonTeamController => {
  const inMemoryPokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
  const createPokemonTeamUseCase = new CreatePokemonTeam(inMemoryPokemonTeamRepository)
  const createPokemonTeamController = new CreatePokemonTeamController(createPokemonTeamUseCase)

  return createPokemonTeamController
}
