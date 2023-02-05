import { FindPokemonTeamDTO } from '@/use-cases/pokemon-team/ports'
import { UseCase } from '@/use-cases/ports'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'
import { badRequest, ok, serverError } from '@/web-controller/util/http-helper'

export class FindPokemonTeamController {
  private readonly useCase: UseCase

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const pokemonTeamName: FindPokemonTeamDTO = request.params
      const response = await this.useCase.perform(pokemonTeamName)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      return ok(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
