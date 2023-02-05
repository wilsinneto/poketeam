import { adaptRegisterFindAllPokemonTeamRoute } from '@/main/adapters/express-register-find-all-pokemon-team-route-adapter'
import { makeFindAllPokemonTeamController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/find-all-pokemon-team', adaptRegisterFindAllPokemonTeamRoute(makeFindAllPokemonTeamController()))
}
