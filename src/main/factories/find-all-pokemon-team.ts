import { SQLitePokemonTeamRepository } from '@/external/repositories/sqlite'
import { prisma } from '@/external/repositories/sqlite/helper'
import { FindAllPokemonTeam } from '@/use-cases/pokemon-team'
import { FindAllPokemonTeamController } from '@/web-controller'

export const makeFindAllPokemonTeamController = (): FindAllPokemonTeamController => {
  const sqlitePokemonTeamRepository = new SQLitePokemonTeamRepository(prisma)
  const findAllPokemonTeamUseCase = new FindAllPokemonTeam(sqlitePokemonTeamRepository)
  const findAllPokemonTeamController = new FindAllPokemonTeamController(findAllPokemonTeamUseCase)

  return findAllPokemonTeamController
}
