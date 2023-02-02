import { PokemonDTO } from '@/entities/pokemon'

export interface PokemonRepository {
  add(pokemon: PokemonDTO): Promise<PokemonDTO>
  findPokemonByName(name: string): Promise<PokemonDTO>
  findAllPokemons(): Promise<PokemonDTO[]>
  exists(pokemon: PokemonDTO): Promise<boolean>
}
