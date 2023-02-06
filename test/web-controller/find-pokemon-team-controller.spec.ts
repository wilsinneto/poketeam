import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { FindPokemonTeam } from '@/use-cases/pokemon-team'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'
import { UseCase } from '@/use-cases/ports'
import { FindPokemonTeamController } from '@/web-controller'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'

describe('Find pokemon team web controller', () => {
  const pokemonTeam: PokemonTeamDTO[] = []
  const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
  const findPokemonTeamUseCase: UseCase = new FindPokemonTeam(repository)
  const controller: FindPokemonTeamController = new FindPokemonTeamController(findPokemonTeamUseCase)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('should return status code 200 when request contains valid pokemon team data', async () => {
    const findPokemonRequest: HttpRequest = {
      body: {},
      params: {
        name: 'Any name'
      }
    }

    await repository.add({ name: 'Any name', pokemons: [] })

    const response: HttpResponse = await controller.handle(findPokemonRequest)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ id: response.body.id, name: 'Any name', pokemons: [] })
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any another',
      }
    }

    const controller: FindPokemonTeamController = new FindPokemonTeamController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
