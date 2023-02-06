import { SQLitePokemonRepository } from '@/external/repositories/sqlite'
import { prisma } from '@/external/repositories/sqlite/helper'
import { CreatePokemon } from '@/use-cases/pokemon'
import { CreatePokemonController } from '@/web-controller'

export const makeCreatePokemonController = (): CreatePokemonController => {
  const sqlitePokemonRepository = new SQLitePokemonRepository(prisma)
  const createPokemonUseCase = new CreatePokemon(sqlitePokemonRepository)
  const createPokemonController = new CreatePokemonController(createPokemonUseCase)

  return createPokemonController
}
