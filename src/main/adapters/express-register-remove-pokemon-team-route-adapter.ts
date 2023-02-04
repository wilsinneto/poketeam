import { HttpRequest } from '@/web-controller/ports'
import { RemovePokemonTeamController } from '@/web-controller/remove-pokemon-team-controller'
import { Request, Response } from 'express'

export const adaptRegisterRemovePokemonTeamRoute = (controller: RemovePokemonTeamController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params
    }

    const httpResponse = await controller.handle(httpRequest)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
