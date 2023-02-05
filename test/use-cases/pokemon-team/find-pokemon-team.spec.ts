import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { CreatePokemonTeam } from '@/use-cases/pokemon-team/create-pokemon-team'
import { FindPokemonTeam } from '@/use-cases/pokemon-team/find-pokemon-team'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'

describe('Find pokemon team use case', () => {
  test('should return pokemon not found with id invalid', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: FindPokemonTeam = new FindPokemonTeam(repository)
    const invalidName = 'any another'

    const response = (await useCase.perform({ name: invalidName })).value as Error
    const pokemonTeamResult = await repository.findPokemonTeamByName(invalidName)

    expect(pokemonTeamResult).toBeNull()
    expect(response.name).toEqual('PokemonTeamNotFound')
  })

  test('should find pokemon team with id valid', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: FindPokemonTeam = new FindPokemonTeam(repository)
    const createPokemonUseCase: CreatePokemonTeam = new CreatePokemonTeam(repository)
    const name = 'any_name'
    const pokemons = []

    await createPokemonUseCase.perform({ name, pokemons })

    const response = await useCase.perform({ name })
    const pokemonResult = await repository.findPokemonTeamByName(name)

    expect(pokemonResult).toBeTruthy()
    expect(response.value.name).toEqual(name)
  })
})
