import { SQLitePokemonTeamRepository } from '@/external/repositories/sqlite'
import { prisma } from '@/external/repositories/sqlite/helper'
import { CreatePokemonTeam } from '@/use-cases/pokemon-team'
import { CreatePokemonTeamController } from '@/web-controller'

export const makeCreatePokemonTeamController = (): CreatePokemonTeamController => {
  const sqlitePokemonTeamRepository = new SQLitePokemonTeamRepository(prisma)
  const createPokemonTeamUseCase = new CreatePokemonTeam(sqlitePokemonTeamRepository)
  const createPokemonTeamController = new CreatePokemonTeamController(createPokemonTeamUseCase)

  return createPokemonTeamController
}
