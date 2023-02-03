import { pokemons } from '@/main/database/in-memory'
import { FindAllPokemons } from '@/use-cases/pokemon/find-all-pokemons'
import { InMemoryPokemonRepository } from '@/use-cases/pokemon/repository'
import { FindAllPokemonsController } from '@/web-controller/find-all-pokemons-controller'

export const makeFindAllPokemonsController = (): FindAllPokemonsController => {
  const inMemoryPokemonRepository = new InMemoryPokemonRepository(pokemons)
  const findAllPokemonsUseCase = new FindAllPokemons(inMemoryPokemonRepository)
  const findAllPokemonsController = new FindAllPokemonsController(findAllPokemonsUseCase)

  return findAllPokemonsController
}
