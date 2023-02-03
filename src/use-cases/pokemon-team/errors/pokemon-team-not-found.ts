export class PokemonTeamNotFound extends Error {
  public readonly name = 'PokemonTeamNotFound'

  constructor () {
    super('Pokemon team not found.')
  }
}
    