import { InvalidNameError, InvalidSpecieError } from '@/entities/errors'
import { PokemonDTO } from '@/entities/pokemon'
import { CreatePokemon } from '@/use-cases/pokemon'
import { PokemonRepository } from '@/use-cases/pokemon/ports'
import { InMemoryPokemonRepository } from '@/use-cases/pokemon/repository'
import { UseCase } from '@/use-cases/ports'
import { CreatePokemonController } from '@/web-controller/create-pokemon-controller'
import { MissingParamError } from '@/web-controller/errors'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'

describe('Create pokemon web controller', () => {
  const pokemons: PokemonDTO[] = []
  const repository: PokemonRepository = new InMemoryPokemonRepository(pokemons)
  const useCase: UseCase = new CreatePokemon(repository)
  const controller: CreatePokemonController = new CreatePokemonController(useCase)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('should return status code 201 when request contains valid pokemon data', async () => {
    const request: HttpRequest = {
      body: {
        teamId: '',
        name: 'Any name',
        imageUrl: '',
        specie: 'any_specie',
      }
    }

    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({ id: response.body.id, teamId: '', name: 'Any name', imageUrl: '', specie: 'any_specie' })
  })

  test('should return status code 400 when request contains invalid pokemon name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        teamId: '',
        name: 'A',
        imageUrl: '',
        specie: 'any_specie',
      }
    }

    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains invalid pokemon specie', async () => {
    const requestWithInvalidSpecie: HttpRequest = {
      body: {
        teamId: '',
        name: 'Any name',
        imageUrl: '',
        specie: '_',
      }
    }

    const response: HttpResponse = await controller.handle(requestWithInvalidSpecie)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidSpecieError)
  })


  test('should return status code 400 when request is missing pokemon name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        teamId: '',
        imageUrl: '',
        specie: 'any_specie',
      }
    }

    const response: HttpResponse = await controller.handle(requestWithMissingName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return status code 400 when request is missing pokemon specie', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        teamId: '',
        name: 'Any name',
        imageUrl: '',
      }
    }

    const response: HttpResponse = await controller.handle(requestWithMissingEmail)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: specie.')
  })

  test('should return status code 400 when request is missing pokemon name and email', async () => {
    const requestWithMissingNameAndEmail: HttpRequest = {
      body: {
        teamId: '',
        imageUrl: '',
      }
    }

    const response: HttpResponse = await controller.handle(requestWithMissingNameAndEmail)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name specie.')
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        teamId: '',
        name: 'Any name',
        imageUrl: '',
        specie: 'any_specie',
      }
    }

    const controller: CreatePokemonController = new CreatePokemonController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
