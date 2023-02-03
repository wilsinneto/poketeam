import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { UseCase } from '@/use-cases/ports'
import { MissingParamError } from '@/web-controller/errors'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'
import { badRequest, created, serverError } from '@/web-controller/util/http-helper'

export class CreatePokemonTeamController {
  private readonly useCase: UseCase

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.name) {
        let missingParam = !(request.body.name) ? 'name' : ''

        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const pokemonTeamData: PokemonTeamDTO = request.body
      const response = await this.useCase.perform(pokemonTeamData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      return created(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
