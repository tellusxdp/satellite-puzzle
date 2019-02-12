import Result from '~/components/Result.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '~/store/index'
import cloneDeep from 'lodash.clonedeep'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Result.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = mount(Result, {
        store: new Vuex.Store(cloneDeep(store)),
        localVue
    })
  })
  describe('methods', () => {
    describe('format', () => {
        test('0 -> "00"', () => {
        expect(wrapper.vm.format(0)).toEqual('00')
        })
        test('1 -> "01"', () => {
        expect(wrapper.vm.format(1)).toEqual('01')
        })
        test('12 -> "12"', () => {
        expect(wrapper.vm.format(12)).toEqual('12')
        })
        test('123 -> "23"', () => {
        expect(wrapper.vm.format(123)).toEqual('23')
        })
    })
  })
  describe('computed', () => {
    describe('bestMin', () => {
      test('bestRecordがnullの場合', () => {
        expect(wrapper.vm.bestMin).toBe(0)
        wrapper.setProps({ min: 1, bestRecord: null })
        expect(wrapper.vm.bestMin).toBe(1)
      })
      test('bestRecordが存在する場合', () => {
        expect(wrapper.vm.bestMin).toBe(0)
        wrapper.setProps({ min: 1, bestRecord: {min: 2} })
        expect(wrapper.vm.bestMin).toBe(2)
      })
    })
    describe('bestSec', () => {
        test('bestRecordがnullの場合', () => {
          expect(wrapper.vm.bestSec).toBe(0)
          wrapper.setProps({ sec: 1, bestRecord: null })
          expect(wrapper.vm.bestSec).toBe(1)
        })
        test('bestRecordが存在する場合', () => {
          expect(wrapper.vm.bestSec).toBe(0)
          wrapper.setProps({ sec: 1, bestRecord: { sec: 2 } })
          expect(wrapper.vm.bestSec).toBe(2)
        })
      })  
    describe('formatMin', () => {
      test('propsのminがフォーマットされること', () => {
        expect(wrapper.vm.formatMin).toBe('00')
        wrapper.setProps({ min: 1 })
        expect(wrapper.vm.formatMin).toBe('01')
        })
    })
    describe('formatSec', () => {
      test('propsのsecがフォーマットされること', () => {
        expect(wrapper.vm.formatSec).toBe('00')
        wrapper.setProps({ sec: 1 })
        expect(wrapper.vm.formatSec).toBe('01')
        })
    })
    describe('formatBestMin', () => {
      test('computedのbestMinがフォーマットされること', () => {
        expect(wrapper.vm.formatBestMin).toBe('00')
        wrapper.setProps({ bestRecord: { min: 1 } })
        expect(wrapper.vm.formatBestMin).toBe('01')
        })
    })
    describe('formatBestSec', () => {
      test('computedのbestSecがフォーマットされること', () => {
        expect(wrapper.vm.formatBestSec).toBe('00')
        wrapper.setProps({ bestRecord:{ sec:1 } })
        expect(wrapper.vm.formatBestSec).toBe('01')
        })
    })
    describe('isNewRecord', () => {
      test('bestRecordがnul', () => {
        wrapper.setProps({ bestRecord:null }) 
        expect(wrapper.vm.isNewRecord).toBeTruthy()
      })
      test('bestRecordの方がminが小さい', () => {
        wrapper.setProps({ min: 2, bestRecord:{ min: 1 } }) 
        expect(wrapper.vm.isNewRecord).toBeFalsy()
      })
      test('bestRecordの方がminが大きい', () => {
        wrapper.setProps({ min: 1, bestRecord:{ min: 2 } }) 
        expect(wrapper.vm.isNewRecord).toBeTruthy()
      })
      test('minは同じだがbestRecordの方がsecが小さい', () => {
        wrapper.setProps({ min: 1, sec: 2, bestRecord:{ min: 1, sec: 1 } }) 
        expect(wrapper.vm.isNewRecord).toBeFalsy()
      })
      test('minは同じだがbestRecordの方がsecが大きい', () => {
        wrapper.setProps({ min: 1, sec: 1, bestRecord:{ min: 1, sec: 2 } }) 
        expect(wrapper.vm.isNewRecord).toBeTruthy()
      })
      test('minもsecも同じ', () => {
        wrapper.setProps({ min: 1, sec: 1, bestRecord:{ min: 1, sec: 1 } }) 
        expect(wrapper.vm.isNewRecord).toBeFalsy()
      })
    })
  })
})