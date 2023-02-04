import { RemovePokemonTeamDTO } from '@/use-cases/pokemon-team/ports'
import { UseCase } from '@/use-cases/ports'
import { MissingParamError } from '@/web-controller/errors'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'
import { badRequest, ok, serverError } from '@/web-controller/util/http-helper'

export class RemovePokemonTeamController {
  private readonly useCase: UseCase

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.params.id) {
        const missingParam = !(request.params.id) ? 'id' : ''

        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const removePokemonTeamData: RemovePokemonTeamDTO = request.params
      const response = await this.useCase.perform(removePokemonTeamData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      return ok(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
