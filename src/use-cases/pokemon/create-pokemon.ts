import { InvalidNameError, InvalidSpecieError } from '@/entities/errors'

import { Pokemon, PokemonDTO } from '@/entities/pokemon'

import { Either, left, right } from '@/shared'
import { PokemonRepository } from '@/use-cases/pokemon/ports'
import { UseCase } from '@/use-cases/ports'

export class CreatePokemon implements UseCase {
  private readonly pokemonRepository: PokemonRepository

  constructor (pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository
  }

  public async perform (request: PokemonDTO):
    Promise<Either<InvalidNameError | InvalidSpecieError, PokemonDTO>> {
    const userOrError: Either<InvalidNameError | InvalidSpecieError, Pokemon> = Pokemon.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const isExists = await this.pokemonRepository.findPokemonByName(request.name)

    if (!isExists) {
      const newPokemon = await this.pokemonRepository.add(request)

      return right(newPokemon)
    }

    return right(isExists)
  }
}
