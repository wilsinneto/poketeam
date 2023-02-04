import { FindAllPokemonTeamController } from '@/web-controller/find-all-pokemon-team-controller'
import { Request, Response } from 'express'

export const adaptRegisterFindAllPokemonTeamRoute = (controller: FindAllPokemonTeamController) => {
  return async (request: Request, response: Response) => {
    const httpResponse = await controller.handle()

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
