import {pad} from './fn'

describe('fn utils global', () => {


  it('should return string with 2 length', () => {
    expect(
      pad(9)
    ).toHaveLength(2)
  })

  it('should contains caracter "p"', () => {
    expect(
      pad(9, 'p')
    ).toContain('p')
  })
})
