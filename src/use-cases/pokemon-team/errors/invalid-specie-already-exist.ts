export class InvalidSpecieAlreadyExist extends Error {
  public readonly name = 'InvalidSpecieAlreadyExist'

  constructor () {
    super('Invalid specie already exist.')
  }
}
    