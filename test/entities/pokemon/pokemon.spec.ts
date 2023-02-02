import { InvalidNameError, InvalidSpecieError } from '@/entities/errors'
import { Pokemon } from '@/entities/pokemon'
import { left } from '@/shared'

describe('Pokemon domain entity', () => {
  test('should not create pokemon with invalid name (too few characters)', () => {
    const invalidName = 'O        '

    const error = Pokemon.create({ id: '', teamId: '', name: invalidName, specie: 'any', imageUrl: '' }).value as Error

    expect(error.name).toEqual('InvalidNameError')
  })

  test('should not create pokemon with invalid name (too many characters)', () => {
    const invalidName = 'O'.repeat(121)
    const error = Pokemon.create({ id: '', teamId: '', name: invalidName, specie: 'any', imageUrl: '' })
    expect(error).toEqual(left(new InvalidNameError(invalidName)))
  })

  test('should not create pokemon with invalid specie (too few characters)', () => {
    const invalidSpecie = 'A        '

    const error = Pokemon.create({ id: '', teamId: '', name: 'any', specie: invalidSpecie, imageUrl: '' }).value as Error

    expect(error.name).toEqual('InvalidSpecieError')
  })

  test('should not create pokemon with invalid specie (too many characters)', () => {
    const invalidSpecie = 'O'.repeat(101)
    const error = Pokemon.create({ id: '', teamId: '', name: 'any', specie: invalidSpecie, imageUrl: '' })
    expect(error).toEqual(left(new InvalidSpecieError(invalidSpecie)))
  })

  test('should create pokemon with valid data', () => {
    const validName = 'any_name'
    const validSpecie = 'any'

    const pokemon: Pokemon = Pokemon.create({ id: '', teamId: '', name: validName, imageUrl: '', specie: validSpecie }).value as Pokemon

    expect(pokemon.name.value).toEqual(validName)
    expect(pokemon.specie.value).toEqual(validSpecie)
  })
})
