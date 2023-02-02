import { Specie } from '@/entities/pokemon'

describe('Specie validation', () => {
  test('should not accept null strings', () => {
    const specie: null = null
    expect(Specie.validate(specie)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const specie: string = ''
    expect(Specie.validate(specie)).toBeFalsy()
  })

  test('should not accept specie less than 2 chars', () => {
    const specie: string = 'l'
    expect(Specie.validate(specie)).toBeFalsy()
  })

  test('should not accept specie larger than 100 chars', () => {
    const specie: string = 'l'.repeat(101)
    expect(Specie.validate(specie)).toBeFalsy()
  })

  test('should accept valid specie', () => {
    const specie: string = 'One name'
    expect(Specie.validate(specie)).toBeTruthy()
  })
})
