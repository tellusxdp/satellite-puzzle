import Facebook from '~/components/buttons/share/Facebook.vue'
import { shallowMount } from '@vue/test-utils'

describe('Facebook.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = shallowMount(Facebook)
  })

  describe('初期状態', () => {
    test('props', () => {
        expect(wrapper.props()).toEqual({url: ""})
    }),
    test('computed', () => {
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: 'http://www.facebook.com/share.php?u=',
            src: ''
        })
    })
  })
  describe('値を設定', () => {
    test('props', () => {
        expect(wrapper.props()).toEqual({url: ''})
        wrapper.setProps({url: 'hogehoge'})
        expect(wrapper.props()).toEqual({url: 'hogehoge'})
    }),
    test('computed', () => {
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: 'http://www.facebook.com/share.php?u=',
            src: ''
        })
        wrapper.setProps({url: 'hogehoge'})
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: 'http://www.facebook.com/share.php?u=hogehoge',
            src: ''
        })
    })
  })
})
