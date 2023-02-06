import { SQLitePokemonTeamRepository } from '@/external/repositories/sqlite'
import { prisma } from '@/external/repositories/sqlite/helper'
import { FindPokemonTeam } from '@/use-cases/pokemon-team/find-pokemon-team'
import { FindPokemonTeamController } from '@/web-controller/find-pokemon-team-controller'

export const makeFindPokemonTeamController = (): FindPokemonTeamController => {
  const inMemoryPokemonTeamRepository = new SQLitePokemonTeamRepository(prisma)
  const findPokemonTeamUseCase = new FindPokemonTeam(inMemoryPokemonTeamRepository)
  const findPokemonTeamController = new FindPokemonTeamController(findPokemonTeamUseCase)

  return findPokemonTeamController
}
