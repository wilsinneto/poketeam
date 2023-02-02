import { PokemonDTO } from '@/entities/pokemon'
import { InMemoryPokemonRepository } from '@/use-cases/pokemon/repository'

describe('In memory Pokemon repository', () => {
  test('should return null if pokemon is not found', async () => {
    const pokemons: PokemonDTO[] = []
    const sut = new InMemoryPokemonRepository(pokemons)
    const pokemon = await sut.findPokemonByName('any')
    expect(pokemon).toBeNull()
  })

  test('should return pokemon if it is found in the repository', async () => {
    const pokemons: PokemonDTO[] = []
    const name = 'any_name'
    const imageUrl = 'http://image.png'
    const specie = 'abc'
    const sut = new InMemoryPokemonRepository(pokemons)

    await sut.add({ teamId: '', name, imageUrl, specie })
    const pokemon = await sut.findPokemonByName('any_name')

    expect(pokemon.name).toBe('any_name')
  })

  test('should return all pokemons in the repository', async () => {
    const pokemons: PokemonDTO[] = [
      { teamId: '', name: 'any_name', specie: 'any', imageUrl: 'http://image.png' },
      { teamId: '', name: 'second_name', specie: 'second', imageUrl: 'http://image2.png' }
    ]

    const sut = new InMemoryPokemonRepository(pokemons)
    const returnedPokemons = await sut.findAllPokemons()

    expect(returnedPokemons.length).toBe(2)
  })
})
