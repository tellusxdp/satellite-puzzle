import Twitter from '~/components/buttons/share/Twitter.vue'
import { shallowMount } from '@vue/test-utils'

describe('Twitter.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = shallowMount(Twitter)
  })

  const defaultValue = {
    url: '',
    via: '',
    related: '',
    hashtags: '',
    text: '',
  }

  describe('初期状態', () => {
    test('props', () => {
        expect(wrapper.props()).toEqual(defaultValue)
    }),
    test('computed', () => {
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: 'https://twitter.com/share?url=&via=&related=&hashtags=&text=',
            src: ''
        })
    })
  })
  describe('値を設定', () => {
    const input = {
        url: 'sample_url',
        via: 'sample_via',
        related: 'samole_related',
        hashtags: 'sample_hashtags',
        text: 'sample_text',
      }
    test('props', () => {
        expect(wrapper.props()).toEqual(defaultValue)
        wrapper.setProps(input)
        expect(wrapper.props()).toEqual(input)
    }),
    test('computed', () => {
            
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: 'https://twitter.com/share?url=&via=&related=&hashtags=&text=',
            src: ''
        })
        wrapper.setProps(input)
        expect(wrapper.find('[href]').attributes()).toEqual({
            href: `https://twitter.com/share?url=${input.url}&via=${input.via}&related=${input.related}&hashtags=${input.hashtags}&text=${input.text}`,
            src: ''
        })
    })
  })
})
