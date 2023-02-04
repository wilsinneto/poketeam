import { adaptRegisterRemovePokemonTeamRoute } from '@/main/adapters/express-register-remove-pokemon-team-route-adapter'
import { makeRemovePokemonTeamController } from '@/main/factories/remove-pokemon-team'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/remove-pokemon-team/:id', adaptRegisterRemovePokemonTeamRoute(makeRemovePokemonTeamController()))
}
