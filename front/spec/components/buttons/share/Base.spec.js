import BaseButton from '~/components/buttons/share/Base.vue'
import { mount } from '@vue/test-utils'

describe('Base.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = null
    wrapper = mount(BaseButton)
  })

  describe('初期状態', () => {
    test('props', () => {
      expect(wrapper.props()).toEqual({href: '', src: ''}) 
    })
    test('aタグ', () => {
      expect(wrapper.find('a').attributes()).toEqual({href: '', rel: 'nofollow', target: '_blank'}) 
    })
    test('img', () => {
      expect(wrapper.find('img').attributes()).toEqual({src: ''}) 
    })
  })
  describe('propsに値を設定', () => {
    test('設定後の状態を確認', () => {
      // 初期状態を確認
      expect(wrapper.props()).toEqual({href: '', src: ''}) // 初期状態確認
      // 値を設定
      expect(wrapper.setProps({href: 'sample_href', src: 'sample_src'}))
      // 設定後の状態確認
      expect(wrapper.props()).toEqual({href: 'sample_href', src: 'sample_src'})
      expect(wrapper.find('a').attributes()).toEqual({href: 'sample_href', rel: 'nofollow', target: '_blank'}) 
      expect(wrapper.find('img').attributes()).toEqual({src: 'sample_src'}) 
    })
  })
})