import { PokemonDTO } from '@/entities/pokemon'
import { FindAllPokemons } from '@/use-cases/pokemon'
import { PokemonRepository } from '@/use-cases/pokemon/ports'
import { InMemoryPokemonRepository } from '@/use-cases/pokemon/repository'

describe('Find all pokemons use case', () => {
  test('should find empty pokemon list', async () => {
    const pokemons: PokemonDTO[] = []
    const repository: PokemonRepository = new InMemoryPokemonRepository(pokemons)
    const useCase: FindAllPokemons = new FindAllPokemons(repository)

    const response = await useCase.perform()
    const pokemonList = await repository.findAllPokemons()

    expect(pokemonList.length).toBe(0)
    expect(response.value.length).toBe(0)
  })

  test('should find pokemon list with 2 elements', async () => {
    const pokemons: PokemonDTO[] = []
    const repository: PokemonRepository = new InMemoryPokemonRepository(pokemons)
    const useCase: FindAllPokemons = new FindAllPokemons(repository)
    
    await repository.add({ id: '', teamId: '', name: 'any_name one', imageUrl: '', specie: 'any_specie one' })
    await repository.add({ id: '', teamId: '', name: 'any_name two', imageUrl: '', specie: 'any_specie two' })

    const response = await useCase.perform()
    const pokemonList = await repository.findAllPokemons()

    expect(pokemonList.length).toBe(2)
    expect(response.value.length).toBe(2)
  })
})
