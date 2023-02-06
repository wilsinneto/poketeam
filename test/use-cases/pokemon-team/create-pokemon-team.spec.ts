import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { CreatePokemonTeam } from '@/use-cases/pokemon-team'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'

describe('Create pokemon team use case', () => {
  test('should add pokemon team with complete data', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: CreatePokemonTeam = new CreatePokemonTeam(repository)
    const name = 'any_name'
    const pokemons = [
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie two' },  
    ]

    const response = await useCase.perform({ name, pokemons })
    const pokemon = await repository.findPokemonTeamByName('any_name')

    expect(pokemon.pokemons.length).toBe(2)
    expect(pokemon.name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add pokemon team with data already registered', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: CreatePokemonTeam = new CreatePokemonTeam(repository)
    const name = 'any_name'

    await useCase.perform({ name, pokemons: [] })
    await useCase.perform({ name, pokemons: [] })
    
    const pokemonList = await repository.findAllPokemonTeam()

    expect(pokemonList.length).toBe(1)
  })

  test('should not add pokemon with invalid pokemon quantity', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: CreatePokemonTeam = new CreatePokemonTeam(repository)
    const name = 'any_name'
    const pokemons = [
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
    ]

    const response = (await useCase.perform({ name, pokemons })).value as Error
    const pokemon = await repository.findPokemonTeamByName(name)

    expect(pokemon).toBeNull()
    expect(response.name).toEqual('InvalidPokemonsQuantity')
  })

  test('should not add pokemon with specie already exist', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: CreatePokemonTeam = new CreatePokemonTeam(repository)
    const name = 'any'
    const pokemons = [
      { id: '', teamId: '', imageUrl: '', name: 'any one', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },  
    ]

    const response = (await useCase.perform({ name, pokemons })).value as Error
    const pokemon = await repository.findPokemonTeamByName(name)

    expect(pokemon).toBeNull()
    expect(response.name).toEqual('InvalidSpecieAlreadyExist')
  })
})
