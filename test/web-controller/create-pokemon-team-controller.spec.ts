import { InvalidNameError } from '@/entities/errors'
import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { CreatePokemonTeam } from '@/use-cases/pokemon-team'
import { InvalidPokemonsQuantity, InvalidSpecieAlreadyExist } from '@/use-cases/pokemon-team/errors'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { InMemoryPokemonTeamRepository } from '@/use-cases/pokemon-team/repository'
import { UseCase } from '@/use-cases/ports'
import { CreatePokemonTeamController } from '@/web-controller'
import { MissingParamError } from '@/web-controller/errors'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'

describe('Create pokemon team web controller', () => {
  const pokemonTeam: PokemonTeamDTO[] = []
  const repository: PokemonTeamRepository = new InMemoryPokemonTeamRepository(pokemonTeam)
  const useCase: UseCase = new CreatePokemonTeam(repository)
  const controller: CreatePokemonTeamController = new CreatePokemonTeamController(useCase)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('should return status code 201 when request contains valid pokemon team data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        pokemons: []
      }
    }

    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({ id: response.body.id, name: 'Any name', pokemons: [] })
  })

  test('should return status code 400 when request contains invalid pokemon team name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'A',
        pokemons: []
      }
    }

    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains invalid pokemons quantity', async () => {
    const requestWithInvalidPOkemonQuantity: HttpRequest = {
      body: {
        name: 'Any name',
        pokemons: [
          { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
          { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
          { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
          { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
          { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
          { id: '', teamId: '', imageUrl: '', name: 'any two', specie: 'any specie' },
          { id: '', teamId: '', imageUrl: '', name: 'any', specie: 'any specie' },
        ],
      }
    }

    const response: HttpResponse = await controller.handle(requestWithInvalidPOkemonQuantity)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidPokemonsQuantity)
  })
  
  test('should return status code 400 when request contains specie already exist', async () => {
    const requestWithInvalidSpecieAlreadyExist: HttpRequest = {
      body: {
        name: 'Any_name',
        pokemons: [
          { id: '', teamId: '', imageUrl: '', name: 'any_name', specie: 'any specie' },
          { id: '', teamId: '', imageUrl: '', name: 'any_name_two', specie: 'any specie' },
        ],
      }
    }

    const response: HttpResponse = await controller.handle(requestWithInvalidSpecieAlreadyExist)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidSpecieAlreadyExist)
  })

  test('should return status code 400 when request is missing pokemon team name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        pokemons: []
      }
    }

    const response: HttpResponse = await controller.handle(requestWithMissingName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        imageUrl: '',
        specie: 'any_specie',
      }
    }

    const controller: CreatePokemonTeamController = new CreatePokemonTeamController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
