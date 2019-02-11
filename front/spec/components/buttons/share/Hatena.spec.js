import Hatena from '~/components/buttons/share/Hatena.vue'
import { shallowMount } from '@vue/test-utils'

describe('Hatena.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = shallowMount(Hatena)
  })

  const defaultValue = {url: '', title: ''}
  const input = {url: 'url_sample', title: 'title_sample'}

  describe('初期状態', () => {
    test('props', () => {
        expect(wrapper.props()).toEqual(defaultValue)
    }),
    test('computed', () => {
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: 'http://b.hatena.ne.jp/add?mode=confirm&url=&title=',
            src: ''
        })
    })
  })
  describe('値を設定', () => {
    test('props', () => {
        expect(wrapper.props()).toEqual(defaultValue)
        wrapper.setProps(input)
        expect(wrapper.props()).toEqual(input)
    }),
    test('computed', () => {
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: 'http://b.hatena.ne.jp/add?mode=confirm&url=&title=',
            src: ''
        })
        wrapper.setProps(input)
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: `http://b.hatena.ne.jp/add?mode=confirm&url=${input.url}&title=${input.title}`,
            src: ''
        })
    })
  })
})
