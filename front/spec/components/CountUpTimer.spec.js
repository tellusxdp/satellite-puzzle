import CountUpTimer from '~/components/CountUpTimer.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '~/store/index'
import cloneDeep from 'lodash.clonedeep'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CountUpTimer.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = mount(CountUpTimer, {
        store: new Vuex.Store(cloneDeep(store)),
        localVue
    })
  })

  describe('初期状態', () => {
    test('format', () => {
      expect(wrapper.vm.formatMin).toBe('00')
      expect(wrapper.vm.formatSec).toBe('00')
      expect(wrapper.vm.isRun).toBe(false)
      expect(wrapper.vm.timeObj).toBe(undefined)
    })
  })
  describe('カウントアップ', () => {
      jest.setTimeout(10000)

    test('doRun=trueになるとisRun=trueになる', () => {
      wrapper.setProps({doRun: true})
      expect(wrapper.vm.isRun).toBe(true)
    }),
    test('doRun=falseになるとisRun=falseになる', () => {
      wrapper.setProps({doRun: true})
      expect(wrapper.vm.isRun).toBe(true)
      wrapper.setProps({doRun: false})
      expect(wrapper.vm.isRun).toBe(false)
    }),
    test('doRun=trueになるとカウントアップが始まる', done => {
      wrapper.setProps({doRun: true})
      setTimeout(() => {
        expect(wrapper.vm.formatSec).toBe('05')
        done()
      },6000)
    }),
    test('countUp:1', () => {
      wrapper.vm.countUp()
      expect(wrapper.vm.sec).toBe(1)
      expect(wrapper.vm.min).toBe(0)
    }),
    test('countUp:59', () => {
      for (let index = 0; index < 59; index++) {
        wrapper.vm.countUp()
      }
      expect(wrapper.vm.sec).toBe(59)
      expect(wrapper.vm.min).toBe(0)
    }),
    test('countUp:60', () => {
      for (let index = 0; index < 60; index++) {
          wrapper.vm.countUp()
      }
      expect(wrapper.vm.sec).toBe(0)
      expect(wrapper.vm.min).toBe(1)
    }),
    test('countUp', () => {
      for (let index = 0; index < 123; index++) {
        wrapper.vm.countUp()
      }
      expect(wrapper.vm.sec).toBe(3)
      expect(wrapper.vm.min).toBe(2)
    })
  })
})