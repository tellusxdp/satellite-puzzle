import MapImage from '~/components/map/MapImage.vue'
import { mount } from '@vue/test-utils'

describe('MapImage.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = mount(MapImage)
  })

    const defaultValue = {mapName: '', mapImage: ''}
    const input = {mapName: 'sample_mapName', mapImage: 'sample_mapImage'}

    describe('初期状態', () => {
        test('props', () => {
            expect(wrapper.props()).toEqual(defaultValue)
        }),
        test('computed', () => {
            expect(wrapper.props()).toEqual(defaultValue)
            expect(wrapper.find('img').attributes('src')).toEqual('/images//completed.png')
        })
    })
    describe('値を設定', () => {
        test('props', () => {
            expect(wrapper.props()).toEqual(defaultValue)
            wrapper.setProps(input)
            expect(wrapper.props()).toEqual(input)
        }),
        test('computed', () => {
            expect(wrapper.props()).toEqual(defaultValue)
            wrapper.setProps(input)
            expect(wrapper.props()).toEqual(input)
            expect(wrapper.find('img').attributes('src')).toEqual(`/images/${input.mapImage}/completed.png`)
        })
    })

    describe('クリック', () => {
        test('ボタンをclickしたらonClickをemit', () => {
            wrapper.find('.puzzle-map').trigger('click')
            expect(wrapper.emitted('onClick')).toBeTruthy()
        })
    })
})