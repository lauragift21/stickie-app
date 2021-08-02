import { shallowMount, mount } from '@vue/test-utils'
import Index from '../../src/components/Index'

describe('Guide component', () => {
  it('displays a text in component', () => {
    const wrapper = mount(Index)
    wrapper.find('button').trigger('click')
  })
})
