import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { CreatePokemonTeam } from '@/use-cases/pokemon-team/create-pokemon-team'
import { PokemonTeamNotFound } from '@/use-cases/pokemon-team/errors/pokemon-team-not-found'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { RemovePokemonTeam } from '@/use-cases/pokemon-team/remove-pokemon-team'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'
import { UseCase } from '@/use-cases/ports'
import { CreatePokemonTeamController } from '@/web-controller/create-pokemon-team-controller'
import { MissingParamError } from '@/web-controller/errors'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'
import { RemovePokemonTeamController } from '@/web-controller/remove-pokemon-team-controller'

describe('Remove pokemon team web controller', () => {
  const pokemonTeam: PokemonTeamDTO[] = []
  const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
  const createPokemonTeamUseCase: UseCase = new CreatePokemonTeam(repository)
  const removePokemonTeamUseCase: UseCase = new RemovePokemonTeam(repository)
  const createController: CreatePokemonTeamController = new CreatePokemonTeamController(createPokemonTeamUseCase)
  const removeController: RemovePokemonTeamController = new RemovePokemonTeamController(removePokemonTeamUseCase)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('should return status code 200 when pokemon team is removed', async () => {
    const requestCreatePokemonTeam: HttpRequest = {
      body: {
        name: 'name another',
        pokemons: []
      }
    }

    const responseCreatePokemonTeam: HttpResponse = await createController.handle(requestCreatePokemonTeam)

    const requestRemovePokemonTeam: HttpRequest = {
      body: {},
      params: {
        id: responseCreatePokemonTeam.body.id
      }
    }

    const responseRemovePokemonTeam = await removeController.handle(requestRemovePokemonTeam)

    expect(responseRemovePokemonTeam.statusCode).toBe(200)
    expect(responseRemovePokemonTeam.body).toBeTruthy()
  })

  test('should return status code 400 when request not found pokemon team by id', async () => {
    const requestWithMissingId: HttpRequest = {
      body: {},
      params: {
        id: 'id'
      }
    }

    const response: HttpResponse = await removeController.handle(requestWithMissingId)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(PokemonTeamNotFound)
  })

  test('should return status code 400 when request is missing pokemon team id', async () => {
    const requestWithMissingId: HttpRequest = {
      body: {},
      params: {}
    }

    const response: HttpResponse = await removeController.handle(requestWithMissingId)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: id.')
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        id: 'id'
      }
    }

    const controller: RemovePokemonTeamController = new RemovePokemonTeamController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
