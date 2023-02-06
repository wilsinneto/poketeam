import { adaptRegisterRemovePokemonTeamRoute } from '@/main/adapters'
import { makeRemovePokemonTeamController } from '@/main/factories/remove-pokemon-team'
import { Router } from 'express'

export default (router: Router): void => {
  router.delete('/remove-pokemon-team/:id', adaptRegisterRemovePokemonTeamRoute(makeRemovePokemonTeamController()))
}
