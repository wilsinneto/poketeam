import { PokemonTeamDTO } from '@/entities/pokemon-team'

import { Either, right } from '@/shared'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { UseCase } from '@/use-cases/ports'

export class FindAllPokemonTeam implements UseCase {
  private readonly pokemonTeamRepository: PokemonTeamRepository

  constructor (pokemonTeamRepository: PokemonTeamRepository) {
    this.pokemonTeamRepository = pokemonTeamRepository
  }

  public async perform (): Promise<Either<null, PokemonTeamDTO[]>> {
    const pokemonTeam = await this.pokemonTeamRepository.findAllPokemonTeam()

    return right(pokemonTeam)
  }
}
