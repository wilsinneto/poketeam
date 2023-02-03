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
      if (!request.body.id) {
        const missingParam = !(request.body.id) ? 'id' : ''

        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const removePokemonTeamData: RemovePokemonTeamDTO = request.body
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
