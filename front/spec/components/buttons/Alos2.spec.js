import Alos2 from '~/components/buttons/Alos2.vue'
import { mount } from '@vue/test-utils'

describe('Alos2.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = mount(Alos2)
  })

    describe('クリック', () => {
        test('ボタンをclickしたらonClickをemit', () => {
            wrapper.find('button').trigger('click')
            expect(wrapper.emitted('onClick')).toBeTruthy()
        })
    })
})