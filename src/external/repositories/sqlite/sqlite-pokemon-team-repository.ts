import { PokemonDTO } from "@/entities/pokemon";
import { PokemonTeamDTO } from "@/entities/pokemon-team";
import { PokemonTeamRepository } from "@/use-cases/pokemon-team/ports";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export class SQLitePokemonTeamRepository implements PokemonTeamRepository {
  private repository: PrismaClient
  
  constructor(repository: PrismaClient) {
    this.repository = repository
  }

  async add(pokemonTeam: PokemonTeamDTO): Promise<PokemonTeamDTO> {
    const exists = await this.exists(pokemonTeam)

    if (exists) {
      return pokemonTeam
    }

    const pokemonTeamId = randomUUID()

    await this.repository.pokemonTeam.create({
      data: {
        id: pokemonTeamId,
        name: pokemonTeam.name
      }
    })

    for await (const pokemon of pokemonTeam.pokemons) {
      await this.repository.pokemon.update({
        where: {
          id: pokemon.id
        },
        data: {
          teamId: pokemonTeamId
        }
      })
    }

    return await this.repository.pokemonTeam.findUnique({
      where: {
        id: pokemonTeamId
      },
      include: {
        pokemons: true
      }
    })
  }

  async findPokemonTeamByName(name: string): Promise<PokemonTeamDTO> {
    const pokemon = await this.repository.pokemonTeam.findUnique({
      where: {
        name
      },
      include: {
        pokemons: true
      }
    })

    return pokemon || null
  }

  async findPokemonTeamById(id: string): Promise<boolean> {
    const pokemon = await this.repository.pokemonTeam.findUnique({
      where: {
        id
      }
    })

    return pokemon ? true : false
  }

  async findAllPokemonTeam(): Promise<PokemonTeamDTO[]> {
    return await this.repository.pokemonTeam.findMany({
      include: {
        pokemons: true
      }
    })
  }

  async exists(pokemonTeam: PokemonTeamDTO): Promise<boolean> {
    const pokemonOrNull = await this.repository.pokemonTeam.findUnique({
      where: {
        name: pokemonTeam.name
      }
    })

    if (!pokemonOrNull) {
      return false
    }

    return true
  }

  async isMoreSix(pokemons: PokemonDTO[]): Promise<boolean> {
    return pokemons.length > 6
  }

  async specieAlreadyExist(pokemons: PokemonDTO[]): Promise<boolean> {
    let alreadyExist = false

    for (const element of pokemons) {
      const pokemon = pokemons.find(item => item.specie === element.specie && item.name !== element.name)

      if (pokemon) {
        alreadyExist = true
        break
      }
    }

    return alreadyExist
  }

  async remove(id: string): Promise<boolean> {
    await this.repository.pokemonTeam.delete({
      where: {
        id
      }
    })

    return true
  }
}