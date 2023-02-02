import { PokemonDTO } from '@/entities/pokemon'
import { PokemonRepository } from '@/use-cases/pokemon/ports'
import { randomUUID } from 'crypto'

export class InMemoryPokemonRepository implements PokemonRepository {
  private repository: PokemonDTO[]

  constructor (repository: PokemonDTO[]) {
    this.repository = repository
  }

  async add (pokemon: PokemonDTO): Promise<PokemonDTO> {
    const exists = await this.exists(pokemon)

    if (!exists) {
      pokemon.id = randomUUID()

      this.repository.push(pokemon)
    }

    return pokemon
  }

  async findPokemonByName (name: string): Promise<PokemonDTO> {
    const pokemon = this.repository.find(pokemon => pokemon.name === name)

    return pokemon || null
  }

  async findAllPokemons (): Promise<PokemonDTO[]> {
    return this.repository
  }

  async exists (pokemon: PokemonDTO): Promise<boolean> {
    if (await this.findPokemonByName(pokemon.name) === null) {
      return false
    }

    return true
  }
}
