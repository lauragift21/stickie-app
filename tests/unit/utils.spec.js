import { randomColorGenerator } from '../../src/utils/index.js'

describe('generate random color', () => {
  it('should return a color', () => {
    const color = randomColorGenerator()
    expect(color).toBeDefined()
  })
})
