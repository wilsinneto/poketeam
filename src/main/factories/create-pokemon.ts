import { CreatePokemon } from '@/use-cases/pokemon'
import { InMemoryPokemonRepository } from '@/use-cases/pokemon/repository'
import { CreatePokemonController } from '@/web-controller/create-pokemon-controller'
import { pokemons } from '../database/in-memory'

export const makeCreatePokemonController = (): CreatePokemonController => {
  const inMemoryPokemonRepository = new InMemoryPokemonRepository(pokemons)
  const createPokemonUseCase = new CreatePokemon(inMemoryPokemonRepository)
  const createPokemonController = new CreatePokemonController(createPokemonUseCase)

  return createPokemonController
}
