import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { CreatePokemonTeam, RemovePokemonTeam } from '@/use-cases/pokemon-team'
import { PokemonTeamNotFound } from '@/use-cases/pokemon-team/errors/pokemon-team-not-found'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'

describe('Remove pokemon team use case', () => {
  test('should return pokemon team not found', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: RemovePokemonTeam = new RemovePokemonTeam(repository)

    const response = await useCase.perform({ id: 'id' })
    const pokemon = await repository.findPokemonTeamById('id')

    expect(pokemon).toBeFalsy()
    expect(response.value).toBeInstanceOf(PokemonTeamNotFound)
  })

  test('should remove pokemon team', async () => {
    const pokemonTeam: PokemonTeamDTO[] = []
    const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
    const useCase: RemovePokemonTeam = new RemovePokemonTeam(repository)
    const createPokemonTeamUseCase: CreatePokemonTeam = new CreatePokemonTeam(repository)
    const name = 'any_name'
    const pokemons = [
      { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
      { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie two' },  
    ]

    const newPokemon = (await createPokemonTeamUseCase.perform({ name, pokemons })).value as PokemonTeamDTO

    const pokemon = await repository.findPokemonTeamById(newPokemon.id)

    const response = await useCase.perform({ id: newPokemon.id })

    expect(pokemon).toBeTruthy()
    expect(response.value).toBeTruthy()
  })
})
