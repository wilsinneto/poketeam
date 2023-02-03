import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'

describe('In memory Pokemon Team repository', () => {
  test('should return false if specie not exist', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const sut = new InMemoryPokemonTeamRepository(pokemonTeam)
    const pokemons = [
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie two' }
    ]

    const pokemon = await sut.specieAlreadyExist(pokemons)
    expect(pokemon).toBeFalsy()
  })

  test('should return true if specie exist', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const sut = new InMemoryPokemonTeamRepository(pokemonTeam)
    const pokemons = [
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' }
    ]

    const pokemon = await sut.specieAlreadyExist(pokemons)
    expect(pokemon).toBeTruthy()
  })

  test('should return false if pokemon quantity less than or equal to 6', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const sut = new InMemoryPokemonTeamRepository(pokemonTeam)
    const pokemons = [
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' }
    ]

    const pokemon = await sut.isMoreSix(pokemons)
    expect(pokemon).toBeFalsy()
  })

  test('should return true if greater than 6', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const sut = new InMemoryPokemonTeamRepository(pokemonTeam)
    const pokemons = [
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
    ]

    const pokemon = await sut.specieAlreadyExist(pokemons)
    expect(pokemon).toBeTruthy()
  })

  test('should return null if pokemon team is not found', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const sut = new InMemoryPokemonTeamRepository(pokemonTeam)
    const pokemon = await sut.findPokemonTeamByName('any')
    expect(pokemon).toBeNull()
  })

  test('should return pokemon team if it is found in the repository', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const name = 'any_name'
    const pokemons = []
    const sut = new InMemoryPokemonTeamRepository(pokemonTeam)

    await sut.add({ name, pokemons })
    const pokemon = await sut.findPokemonTeamByName('any_name')

    expect(pokemon.name).toBe('any_name')
  })

  test('should return all pokemons team in the repository', async () => {
    const pokemonTeam: PokemonTeamDTO[] = [
      { name: 'any_name', pokemons: [] },
      { name: 'second_name', pokemons: [] }
    ]

    const sut = new InMemoryPokemonTeamRepository(pokemonTeam)
    const returnedPokemonTeam = await sut.findAllPokemonTeam()

    expect(returnedPokemonTeam.length).toBe(2)
  })
})
