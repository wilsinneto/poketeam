import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'

describe('In memory Pokemon Team repository', () => {
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
