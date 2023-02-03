import { FindAllPokemonsController } from '@/web-controller/find-all-pokemons-controller'
import { Request, Response } from 'express'

export const adaptRegisterFindAllPokemonsRoute = (controller: FindAllPokemonsController) => {
  return async (request: Request, response: Response) => {
    const httpResponse = await controller.handle()

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
