import ClickButton from '~/components/buttons/ClickButton.vue'
import { mount } from '@vue/test-utils'

describe('ClickButton.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = mount(ClickButton)
  })

    const defaultValue = {src: '', srcActive: ''}
    const input = {src: 'sample_src', srcActive: 'sample_srcActive'}

    describe('初期状態', () => {
        test('props', () => {
            expect(wrapper.props()).toEqual(defaultValue)
        })
    })
    describe('値を設定', () => {
        test('props', () => {
            expect(wrapper.props()).toEqual(defaultValue)
            wrapper.setProps(input)
            expect(wrapper.props()).toEqual(input)
        })
    })

    describe('クリック', () => {
        test('ボタンをclickしたらonClickをemit', () => {
            wrapper.find('button').trigger('click')
            expect(wrapper.emitted('onClick')).toBeTruthy()
        })
    })
})