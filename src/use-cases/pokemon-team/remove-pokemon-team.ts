import { Either, left, right } from '@/shared'
import { PokemonTeamRepository, RemovePokemonTeamDTO } from '@/use-cases/pokemon-team/ports'
import { UseCase } from '@/use-cases/ports'
import { PokemonTeamNotFound } from './errors/pokemon-team-not-found'

export class RemovePokemonTeam implements UseCase {
  private readonly pokemonTeamRepository: PokemonTeamRepository

  constructor (pokemonTeamRepository: PokemonTeamRepository) {
    this.pokemonTeamRepository = pokemonTeamRepository
  }

  public async perform (request: RemovePokemonTeamDTO):
    Promise<Either<PokemonTeamNotFound, boolean>> {
    const pokemonTeam = await this.pokemonTeamRepository.findPokemonTeamById(request.id)

    if (!pokemonTeam) {
      return left(new PokemonTeamNotFound())
    }

    await this.pokemonTeamRepository.remove(request.id)

    return right(true)
  }
}
