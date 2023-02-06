import { SQLitePokemonRepository } from '@/external/repositories/sqlite'
import { prisma } from '@/external/repositories/sqlite/helper'
import { FindAllPokemons } from '@/use-cases/pokemon/find-all-pokemons'
import { FindAllPokemonsController } from '@/web-controller/find-all-pokemons-controller'

export const makeFindAllPokemonsController = (): FindAllPokemonsController => {
  const sqlitePokemonRepository = new SQLitePokemonRepository(prisma)
  const findAllPokemonsUseCase = new FindAllPokemons(sqlitePokemonRepository)
  const findAllPokemonsController = new FindAllPokemonsController(findAllPokemonsUseCase)

  return findAllPokemonsController
}
