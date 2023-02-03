
import { PokemonDTO } from '@/entities/pokemon'

import { Either, right } from '@/shared'
import { PokemonRepository } from '@/use-cases/pokemon/ports'
import { UseCase } from '@/use-cases/ports'

export class FindAllPokemons implements UseCase {
  private readonly pokemonRepository: PokemonRepository

  constructor (pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository
  }

  public async perform (): Promise<Either<null, PokemonDTO[]>> {
    const pokemons = await this.pokemonRepository.findAllPokemons()

    return right(pokemons)
  }
}
