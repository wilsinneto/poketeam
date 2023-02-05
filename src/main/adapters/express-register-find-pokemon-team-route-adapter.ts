import { FindPokemonTeamController } from '@/web-controller/find-pokemon-team-controller'
import { Request, Response } from 'express'

export const adaptRegisterFindPokemonTeamRoute = (controller: FindPokemonTeamController) => {
  return async (request: Request, response: Response) => {
    const httpResponse = await controller.handle(request)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
