import { SQLitePokemonTeamRepository } from '@/external/repositories/sqlite'
import { prisma } from '@/external/repositories/sqlite/helper'
import { RemovePokemonTeam } from '@/use-cases/pokemon-team'
import { RemovePokemonTeamController } from '@/web-controller'

export const makeRemovePokemonTeamController = (): RemovePokemonTeamController => {
  const inMemoryPokemonTeamRepository = new SQLitePokemonTeamRepository(prisma)
  const removePokemonTeamUseCase = new RemovePokemonTeam(inMemoryPokemonTeamRepository)
  const removePokemonTeamController = new RemovePokemonTeamController(removePokemonTeamUseCase)

  return removePokemonTeamController
}
