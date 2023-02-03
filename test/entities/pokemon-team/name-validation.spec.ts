import { Name } from '@/entities/pokemon-team'

describe('Pokemon Team - Name validation', () => {
  test('should not accept null strings', () => {
    const name: null = null
    expect(Name.validate(name)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const name: string = ''
    expect(Name.validate(name)).toBeFalsy()
  })

  test('should not accept name less than 3 chars', () => {
    const name: string = 'll'
    expect(Name.validate(name)).toBeFalsy()
  })

  test('should not accept name larger than 150 chars', () => {
    const name: string = 'l'.repeat(151)
    expect(Name.validate(name)).toBeFalsy()
  })

  test('should accept valid name', () => {
    const name: string = 'One name'
    expect(Name.validate(name)).toBeTruthy()
  })
})
