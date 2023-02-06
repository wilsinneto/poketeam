import { adaptRegisterFindPokemonTeamRoute } from '@/main/adapters'
import { makeFindPokemonTeamController } from '@/main/factories/find-pokemon-team'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/find-pokemon-team/:name', adaptRegisterFindPokemonTeamRoute(makeFindPokemonTeamController()))
}
