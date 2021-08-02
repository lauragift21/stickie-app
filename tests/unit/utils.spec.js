import { render, screen } from '@testing-library/vue'
import { randomColorGenerator } from '../../src/utils/index.js'

describe('generate random color', () => {
  it('should return a snapshot', () => {
    const color = randomColorGenerator()
    expect(color).toMatchSnapshot()
  })
})
