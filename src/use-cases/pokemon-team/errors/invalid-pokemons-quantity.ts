export class InvalidPokemonsQuantity extends Error {
  public readonly name = 'InvalidPokemonsQuantity'

  constructor () {
    super('Invalid pokemon quantity.')
  }
}
    