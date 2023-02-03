import { UseCase } from '@/use-cases/ports'
import { HttpResponse } from '@/web-controller/ports'
import { ok, serverError } from '@/web-controller/util/http-helper'

export class FindAllPokemonTeamController {
  private readonly useCase: UseCase

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  public async handle (): Promise<HttpResponse> {
    try {
      const response = await this.useCase.perform()

      return ok(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
