import { adaptRegisterFindAllPokemonsRoute } from '@/main/adapters'
import { makeFindAllPokemonsController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/find-all-pokemons', adaptRegisterFindAllPokemonsRoute(makeFindAllPokemonsController()))
}
