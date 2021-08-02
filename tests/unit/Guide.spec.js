import { render, screen } from '@testing-library/vue'
import Guide from '../../src/components/Guide'

describe('Guide component', () => {
  it('renders a text in the component', () => {
    render(Guide)
    const text = 'Sticky App Instructions'
    expect(screen.queryByText(text).innerHTML).toMatch(
      /Sticky App Instructions/
    )
  })
})
