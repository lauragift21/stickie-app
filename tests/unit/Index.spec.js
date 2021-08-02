import { render, screen } from '@testing-library/vue'
import Index from '../../src/components/Index'
jest.mock('../../src/components/Index')

describe('Index', () => {
  it('should render Index page', () => {
    render(Index)
    expect(Index).toMatchSnapshot()
  })
})
