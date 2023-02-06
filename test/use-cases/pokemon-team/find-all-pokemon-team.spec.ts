import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { FindAllPokemonTeam } from '@/use-cases/pokemon-team'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'

describe('Find all pokemon team use case', () => {
  test('should find empty pokemon team list', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: FindAllPokemonTeam = new FindAllPokemonTeam(repository)

    const response = await useCase.perform()
    const pokemonList = await repository.findAllPokemonTeam()

    expect(pokemonList.length).toBe(0)
    expect(response.value.length).toBe(0)
  })

  test('should find pokemon list with 2 elements', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: FindAllPokemonTeam = new FindAllPokemonTeam(repository)
    
    await repository.add({ name: 'any_name one', pokemons: [] })
    await repository.add({ name: 'any_name two', pokemons: [] })

    const response = await useCase.perform()
    const pokemonList = await repository.findAllPokemonTeam()

    expect(pokemonList.length).toBe(2)
    expect(response.value.length).toBe(2)
  })
})
