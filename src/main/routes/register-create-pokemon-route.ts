import { adaptRegisterCreatePokemonRoute } from '@/main/adapters'
import { makeCreatePokemonController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/create-pokemon', adaptRegisterCreatePokemonRoute(makeCreatePokemonController()))
}
