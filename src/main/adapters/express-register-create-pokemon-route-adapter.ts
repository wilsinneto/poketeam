import { CreatePokemonController } from '@/web-controller'
import { HttpRequest } from '@/web-controller/ports'
import { Request, Response } from 'express'

export const adaptRegisterCreatePokemonRoute = (controller: CreatePokemonController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }

    const httpResponse = await controller.handle(httpRequest)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
