import { adaptRegisterCreatePokemonTeamRoute } from '@/main/adapters'
import { makeCreatePokemonTeamController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/create-pokemon-team', adaptRegisterCreatePokemonTeamRoute(makeCreatePokemonTeamController()))
}
