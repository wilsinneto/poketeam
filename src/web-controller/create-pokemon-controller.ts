import { PokemonDTO } from '@/entities/pokemon'
import { UseCase } from '@/use-cases/ports'
import { MissingParamError } from '@/web-controller/errors'
import { HttpRequest, HttpResponse } from '@/web-controller/ports'
import { badRequest, created, serverError } from '@/web-controller/util/http-helper'

export class CreatePokemonController {
  private readonly useCase: UseCase

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!(request.body.name) || !(request.body.specie)) {
        let missingParam = !(request.body.name) ? 'name ' : ''
        missingParam += !(request.body.specie) ? 'specie' : ''

        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const userData: PokemonDTO = request.body
      const response = await this.useCase.perform(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      return created(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
