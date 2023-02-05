import { InvalidNameError } from '@/entities/errors';
import { PokemonDTO } from '@/entities/pokemon';
import { Name } from '@/entities/pokemon-team';
import { Either, left, right } from '@/shared';
import { randomUUID } from 'crypto';
import { PokemonTeamDTO } from './pokemon-team-dto';

export class PokemonTeam {
  public readonly id?: string | undefined
  public readonly name: Name
  public readonly pokemons: PokemonDTO[]

  private constructor (id: string, name: Name, pokemons: PokemonDTO[]) {
    this.id = id || randomUUID()
    this.name = name
    this.pokemons = pokemons
  }

  static create (pokemon: PokemonTeamDTO): Either<InvalidNameError, PokemonTeam> {
    const nameOrError = Name.create(pokemon.name)
    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    const name: Name = nameOrError.value as Name

    return right(new PokemonTeam(pokemon.id, name, pokemon.pokemons))
  }
}
