import { CreatePokemon } from '@/use-cases/pokemon'
import { InMemoryPokemonRepository } from '@/use-cases/pokemon/repository'
import { CreatePokemonController } from '@/web-controller/create-pokemon-controller'

export const makeCreatePokemonController = (): CreatePokemonController => {
  const inMemoryPokemonRepository = new InMemoryPokemonRepository([])
  const createPokemonUseCase = new CreatePokemon(inMemoryPokemonRepository)
  const createPokemonController = new CreatePokemonController(createPokemonUseCase)

  return createPokemonController
}
