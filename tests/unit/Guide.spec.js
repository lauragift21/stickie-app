import { mount } from '@vue/test-utils'
import Guide from '../../src/components/Guide'

describe('Guide component', () => {
  it('displays a text in component', () => {
    const wrapper = mount(Guide)
    expect(wrapper.text()).toContain('Sticky App Instructions')
  })
})
