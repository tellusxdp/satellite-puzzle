import PrsButton from '~/components/buttons/PrsButton.vue'
import { mount } from '@vue/test-utils'

describe('PrsButton.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = mount(PrsButton)
  })

    const defaultValue = {src: '', srcPrs: ''}
    const input = {src: 'sample_src', srcPrs: 'sample_srcPrs'}

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
        test('ボタンをclickしたらisPrsをemit', () => {
            wrapper.find('button').trigger('click')
            expect(wrapper.emitted('isPrs')).toBeTruthy()
        }),
        test('ボタンを2回clickしたらisPrsとisNotPrsを交互にemit', () => {
            wrapper.find('button').trigger('click')
            expect(wrapper.emitted('isPrs')).toBeTruthy()
            wrapper.find('button').trigger('click')
            expect(wrapper.emitted('isNotPrs')).toBeTruthy()
            // 1回ずつしかemitしていないことを確認
            expect(wrapper.emitted('isPrs').length).toBe(1)
            expect(wrapper.emitted('isNotPrs').length).toBe(1)
        })
    })
})