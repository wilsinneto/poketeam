import { PokemonDTO } from "@/entities/pokemon";
import { PokemonRepository } from "@/use-cases/pokemon/ports";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export class SQLitePokemonRepository implements PokemonRepository {
  private repository: PrismaClient
  
  constructor(repository: PrismaClient) {
    this.repository = repository
  }

  async add(pokemon: PokemonDTO): Promise<PokemonDTO> {
    const exists = await this.exists(pokemon)
    
    if (exists) {
      return pokemon
    }

    const newPokemon = await this.repository.pokemon.create({
      data: {
        id: randomUUID(),
        teamId: pokemon.teamId || null,
        name: pokemon.name,
        imageUrl: pokemon.imageUrl,
        specie: pokemon.specie
      }
    })
  
    return newPokemon
  }
 
  async findPokemonByName(name: string): Promise<PokemonDTO> {
    return await this.repository.pokemon.findUnique({
      where: {
        name
      }
    })
  }
 
  async findAllPokemons(): Promise<PokemonDTO[]> {
    const result = await this.repository.pokemon.findMany()

    return result
  }

  async exists(pokemon: PokemonDTO): Promise<boolean> {
    const pokemonOrNull = await this.repository.pokemon.findUnique({
      where: {
        name: pokemon.name
      }
    })

    if (!pokemonOrNull) {
      return false
    }

    return true
  }
}