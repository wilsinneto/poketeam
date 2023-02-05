
import { PokemonTeamDTO } from '@/entities/pokemon-team'

import { Either, left, right } from '@/shared'
import { FindPokemonTeamDTO, PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { UseCase } from '@/use-cases/ports'
import { PokemonTeamNotFound } from './errors'

export class FindPokemonTeam implements UseCase {
  private readonly pokemonTeamRepository: PokemonTeamRepository

  constructor (pokemonTeamRepository: PokemonTeamRepository) {
    this.pokemonTeamRepository = pokemonTeamRepository
  }

  public async perform (request: FindPokemonTeamDTO):
    Promise<Either<PokemonTeamNotFound, PokemonTeamDTO>> {
    const pokemonTeam = await this.pokemonTeamRepository.findPokemonTeamByName(request.name)

    if (!pokemonTeam) {
      return left(new PokemonTeamNotFound())
    }

    return right(pokemonTeam)
  }
}
