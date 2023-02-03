import { InvalidNameError } from '@/entities/errors'

import { PokemonTeam, PokemonTeamDTO } from '@/entities/pokemon-team'

import { Either, left, right } from '@/shared'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { UseCase } from '@/use-cases/ports'
import { InvalidPokemonsQuantity, InvalidSpecieAlreadyExist } from './errors'

export class CreatePokemonTeam implements UseCase {
  private readonly pokemonTeamRepository: PokemonTeamRepository

  constructor (pokemonTeamRepository: PokemonTeamRepository) {
    this.pokemonTeamRepository = pokemonTeamRepository
  }

  public async perform (request: PokemonTeamDTO):
    Promise<Either<InvalidNameError | InvalidPokemonsQuantity | InvalidSpecieAlreadyExist, PokemonTeamDTO>> {
    const pokemonTeamOrError: Either<InvalidNameError, PokemonTeam> = PokemonTeam.create(request)

    if (pokemonTeamOrError.isLeft()) {
      return left(pokemonTeamOrError.value)
    }

    const pokemonTeam = await this.pokemonTeamRepository.findPokemonTeamByName(request.name)
    const isMoreSix = await this.pokemonTeamRepository.isMoreSix(request.pokemons)

    if (isMoreSix) {
      return left(new InvalidPokemonsQuantity())
    }

    if (!pokemonTeam) {
      const specieAlreadyExist = await this.pokemonTeamRepository.specieAlreadyExist(request.pokemons)

      if (specieAlreadyExist) {
        return left(new InvalidSpecieAlreadyExist())
      }

      const newPokemonTeam = await this.pokemonTeamRepository.add(request)

      return right(newPokemonTeam)
    }

    return right(pokemonTeam)
  }
}
