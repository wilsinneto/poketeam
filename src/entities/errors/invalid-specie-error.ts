export class InvalidSpecieError extends Error {
  public readonly name = 'InvalidSpecieError'
  
  constructor (specie: string) {
    super('Invalid specie: ' + specie + '.')
  }
}
  