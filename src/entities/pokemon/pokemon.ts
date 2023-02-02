import { InvalidNameError, InvalidSpecieError } from '@/entities/errors'
import { Name, PokemonDTO, Specie } from '@/entities/pokemon'
import { Either, left, right } from '@/shared'
import { randomUUID } from 'crypto'

export class Pokemon {
  public readonly id?: string | undefined
  public readonly teamId?: string | undefined
  public readonly name: Name
  public readonly imageUrl?: string | undefined
  public readonly specie: Specie

  private constructor (id: string, teamId: string, name: Name, imageUrl: string, specie: Specie) {
    this.id = id || randomUUID()
    this.teamId = teamId
    this.name = name
    this.imageUrl = imageUrl
    this.specie = specie
  }

  static create (pokemon: PokemonDTO): Either<InvalidNameError | InvalidSpecieError, Pokemon> {
    const nameOrError = Name.create(pokemon.name)
    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    const specieOrError = Specie.create(pokemon.specie)
    if (specieOrError.isLeft()) {
      return left(specieOrError.value)
    }

    const name: Name = nameOrError.value as Name
    const specie: Specie = specieOrError.value as Specie

    return right(new Pokemon(pokemon.id, pokemon.teamId, name, pokemon.imageUrl, specie))
  }
}
