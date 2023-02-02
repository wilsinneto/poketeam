import { InvalidSpecieError } from '@/entities/errors'
import { Either, left, right } from '@/shared'

export class Specie {
  public readonly value: string

  private constructor (name: string) {
    this.value = name
  }

  static create (specie: string): Either<InvalidSpecieError, Specie> {
    if (!Specie.validate(specie)) {
      return left(new InvalidSpecieError(specie))
    }

    return right(new Specie(specie))
  }

  public static validate (specie: string): boolean {
    if (!specie) {
      return false
    }

    if (specie.trim().length < 2 || specie.trim().length > 100) {
      return false
    }

    return true
  }
}
