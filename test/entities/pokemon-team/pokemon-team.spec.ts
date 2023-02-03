import { InvalidNameError } from '@/entities/errors'
import { PokemonTeam } from '@/entities/pokemon-team'
import { left } from '@/shared'

describe('Pokemon Team domain entity', () => {
  test('should not create pokemon with invalid name (too few characters)', () => {
    const invalidName = 'O        '

    const error = PokemonTeam.create({ name: invalidName, pokemons: [] }).value as Error

    expect(error.name).toEqual('InvalidNameError')
  })

  test('should not create pokemon with invalid name (too many characters)', () => {
    const invalidName = 'O'.repeat(121)
    const error = PokemonTeam.create({ name: invalidName, pokemons: [] })
    expect(error).toEqual(left(new InvalidNameError(invalidName)))
  })

  test('should create pokemon team with valid data', () => {
    const validName = 'any_name'
    const pokemons = [{
      id: '',
      name: 'any_name',
      teamId: '',
      imageUrl: '',
      specie: 'any_specie'
    }]

    const pokemonTeam: PokemonTeam = PokemonTeam.create({ name: validName, pokemons }).value as PokemonTeam

    expect(pokemonTeam.name.value).toEqual(validName)
    expect(pokemonTeam.pokemons.length).toBe(1)
  })
})
