import Retire from '~/components/modal/Retire.vue'
import ClickButton from '~/components/buttons/ClickButton.vue'
import { mount } from '@vue/test-utils'


describe('Retire.vue', () => {
    let wrapper
    
    beforeEach(() => {
      wrapper = null
      wrapper = mount(Retire, {
        ClickButton: ClickButton,
      })
    })

    describe('クリック', () => {
        test('1番目のボタンをclickしたらcloseをemit', () => {
            wrapper.findAll('.button').at(0).trigger('click')
            expect(wrapper.emitted('close')).toBeTruthy()
        }),
        test('2番目のボタンをclickしたらretryをemit', () => {
            wrapper.findAll('.button').at(1).trigger('click')
            expect(wrapper.emitted('retry')).toBeTruthy()
        }),
        test('3番目のボタンをclickしたらtopをemit', () => {
            wrapper.findAll('.button').at(2).trigger('click')
            expect(wrapper.emitted('top')).toBeTruthy()
        })
    })
})