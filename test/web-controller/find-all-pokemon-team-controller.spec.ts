import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { CreatePokemonTeam } from '@/use-cases/pokemon-team/create-pokemon-team'
import { FindAllPokemonTeam } from '@/use-cases/pokemon-team/find-all-pokemon-team'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'
import { UseCase } from '@/use-cases/ports'
import { CreatePokemonTeamController } from '@/web-controller/create-pokemon-team-controller'
import { FindAllPokemonTeamController } from '@/web-controller/find-all-pokemon-team-controller'
import { FindAllPokemonsController } from '@/web-controller/find-all-pokemons-controller'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'

describe('Find all pokemon team web controller', () => {
  const pokemonTeam: PokemonTeamDTO[] = []
  const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
  const useCase: UseCase = new FindAllPokemonTeam(repository)
  const controller: FindAllPokemonTeamController = new FindAllPokemonTeamController(useCase)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('should return status code 200 with empty pokemon list', async () => {
    const response: HttpResponse = await controller.handle()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual([])
  })

  test('should return status code 200 with list with a pokemon', async () => {
    const useCase: UseCase = new CreatePokemonTeam(repository)
    const createPokemonTeamController: CreatePokemonTeamController = new CreatePokemonTeamController(useCase)

    const request: HttpRequest = {
      body: {
        name: 'Any name',
        pokemons: [],
      }
    }

    await createPokemonTeamController.handle(request)

    const response: HttpResponse = await controller.handle()

    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toEqual(1)
  })

  test('should return status code 500 when server raises', async () => {
    const controller: FindAllPokemonsController = new FindAllPokemonsController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle()

    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
