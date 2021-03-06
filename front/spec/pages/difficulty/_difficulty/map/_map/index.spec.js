import IndexPage from '~/pages/difficulty/_difficulty/map/_map/index.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Store from '~/store/index'
import cloneDeep from 'lodash.clonedeep'
import VueRouter from 'vue-router';
const puzzleSettings = require('~/puzzle.json')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)


const router = new VueRouter({
    params: { difficulty: 'normal', map: 'lake-biwako' },
    routes: [
      {path: '/difficulty/:difficulty/map', component: IndexPage}
    ],
});

describe('pages/difficulty/_difficulty/map/_map/index.vue', () => {
  let wrapper
  let store
  beforeEach(() => {
    store = null
    store = new Vuex.Store(cloneDeep(Store))
    store.commit('SET_PUZZLE_SETTING', puzzleSettings.puzzles)
    wrapper = null
    wrapper = shallowMount(IndexPage, {
      store,
      localVue,
      router,
    })
  })
  describe('methods', () => {
    describe('targetSec', () => {
      test('SAR画像表示:0-14秒, 20-34秒, 40-54秒', () => {
        wrapper.setData({difficulty: 'normal', map: 'lake-biwako'})
        expect(wrapper.vm.targetSec(0)).toBeTruthy()
        expect(wrapper.vm.targetSec(14)).toBeTruthy()
        expect(wrapper.vm.targetSec(20)).toBeTruthy()
        expect(wrapper.vm.targetSec(34)).toBeTruthy()
        expect(wrapper.vm.targetSec(40)).toBeTruthy()
        expect(wrapper.vm.targetSec(54)).toBeTruthy()
      })
      test('光学画像表示:15-19秒, 35-39秒, 55-59秒', () => {
        wrapper.setData({difficulty: 'normal', map: 'lake-biwako'})
        expect(wrapper.vm.targetSec(15)).toBeFalsy()
        expect(wrapper.vm.targetSec(19)).toBeFalsy()
        expect(wrapper.vm.targetSec(35)).toBeFalsy()
        expect(wrapper.vm.targetSec(39)).toBeFalsy()
        expect(wrapper.vm.targetSec(55)).toBeFalsy()
        expect(wrapper.vm.targetSec(59)).toBeFalsy()
      })
    })
  })
  describe('computed', () => {
    describe('selectedMap', () => {
      test('正常な値：selectedMapが取得できること', () => {
        wrapper.setData({difficulty: 'normal', map: 'lake-biwako'})
        expect(wrapper.vm.selectedMap).toBeTruthy()
      })
    })
    describe('mapImages', () => {
      test('正常な値：mapImagesが取得できること', () => {
        wrapper.setData({difficulty: 'normal', map: 'lake-biwako'})
        expect(wrapper.vm.mapImages).toBeTruthy()
      })
    })
    describe('completedImage', () => {
      test('正常な値：completedImageが取得できること', () => {
        wrapper.setData({difficulty: 'normal', map: 'lake-biwako'})
        expect(wrapper.vm.completedImage).toBeTruthy()
      })
    })
  })
})