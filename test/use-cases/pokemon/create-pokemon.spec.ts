import { PokemonDTO } from '@/entities/pokemon'
import { CreatePokemon } from '@/use-cases/pokemon'
import { PokemonRepository } from '@/use-cases/pokemon/ports'
import { InMemoryPokemonRepository } from '@/use-cases/pokemon/repository'

describe('Create pokemon use case', () => {
  test('should add pokemon with complete data', async () => {
    const pokemons: PokemonDTO[] = []
    const repository: PokemonRepository = new InMemoryPokemonRepository(pokemons)
    const useCase: CreatePokemon = new CreatePokemon(repository)
    const name = 'any_name'
    const specie = 'any specie'

    const response = await useCase.perform({ id: '', teamId: '', name, imageUrl: '', specie })
    const pokemon = repository.findPokemonByName('any_name')

    expect((await pokemon).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add pokemon with data already registered', async () => {
    const pokemons: PokemonDTO[] = []
    const repository: PokemonRepository = new InMemoryPokemonRepository(pokemons)
    const useCase: CreatePokemon = new CreatePokemon(repository)
    const name = 'any_name'
    const specie = 'any specie'

    await useCase.perform({ id: '', teamId: '', name, imageUrl: '', specie })
    await useCase.perform({ id: '', teamId: '', name, imageUrl: '', specie })
    
    const pokemonList = await repository.findAllPokemons()

    expect(pokemonList.length).toBe(1)
  })

  test('should not add pokemon with invalid specie', async () => {
    const pokemons: PokemonDTO[] = []
    const repository: PokemonRepository = new InMemoryPokemonRepository(pokemons)
    const useCase: CreatePokemon = new CreatePokemon(repository)
    const name = 'any_name'
    const invalidSpecie = ''

    const response = (await useCase.perform({ id: '', teamId: '', name, imageUrl: '', specie: invalidSpecie, })).value as Error
    const pokemon = await repository.findPokemonByName(name)

    expect(pokemon).toBeNull()
    expect(response.name).toEqual('InvalidSpecieError')
  })

  test('should not add pokemon with invalid name', async () => {
    const pokemons: PokemonDTO[] = []
    const repository: PokemonRepository = new InMemoryPokemonRepository(pokemons)
    const useCase: CreatePokemon = new CreatePokemon(repository)
    const invalidName = ''
    const specie = 'any_specie'

    const response = (await useCase.perform({ id: '', teamId: '', name: invalidName, imageUrl: '', specie  })).value as Error
    const pokemon = await repository.findPokemonByName(invalidName)

    expect(pokemon).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
