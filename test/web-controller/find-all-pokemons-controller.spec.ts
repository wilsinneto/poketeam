import { PokemonDTO } from '@/entities/pokemon'
import { CreatePokemon, FindAllPokemons } from '@/use-cases/pokemon'
import { PokemonRepository } from '@/use-cases/pokemon/ports'
import { InMemoryPokemonRepository } from '@/use-cases/pokemon/repository'
import { UseCase } from '@/use-cases/ports'
import { CreatePokemonController, FindAllPokemonsController } from '@/web-controller'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'

describe('Find all pokemons web controller', () => {
  const pokemons: PokemonDTO[] = []
  const repository: PokemonRepository = new InMemoryPokemonRepository(pokemons)
  const useCase: UseCase = new FindAllPokemons(repository)
  const controller: FindAllPokemonsController = new FindAllPokemonsController(useCase)

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
    const useCase: UseCase = new CreatePokemon(repository)
    const createPokemonController: CreatePokemonController = new CreatePokemonController(useCase)

    const request: HttpRequest = {
      body: {
        teamId: '',
        name: 'Any name',
        imageUrl: '',
        specie: 'any_specie',
      }
    }

    await createPokemonController.handle(request)

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
