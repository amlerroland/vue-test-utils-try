import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Counter)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
