import { PokemonTeamDTO } from '@/entities/pokemon-team'
import { PokemonTeamRepository } from '@/use-cases/pokemon-team/ports'
import { randomUUID } from 'crypto'

export class InMemoryPokemonTeamRepository implements PokemonTeamRepository {
  private repository: PokemonTeamDTO[]

  constructor (repository: PokemonTeamDTO[]) {
    this.repository = repository
  }

  async add (pokemon: PokemonTeamDTO): Promise<PokemonTeamDTO> {
    const exists = await this.exists(pokemon)

    if (!exists) {
      pokemon.id = randomUUID()

      this.repository.push(pokemon)
    }

    return pokemon
  }

  async findPokemonTeamByName (name: string): Promise<PokemonTeamDTO> {
    const pokemon = this.repository.find(pokemon => pokemon.name === name)

    return pokemon || null
  }

  async findAllPokemonTeam (): Promise<PokemonTeamDTO[]> {
    return this.repository
  }

  async exists (pokemon: PokemonTeamDTO): Promise<boolean> {
    if (await this.findPokemonTeamByName(pokemon.name) === null) {
      return false
    }

    return true
  }
}
