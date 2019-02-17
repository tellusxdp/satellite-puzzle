import IndexPage from '~/pages/difficulty/_difficulty/map/_map/complete.vue'
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

describe('pages/difficulty/_difficulty/map/_map/complete.vue', () => {
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

  describe('computed', () => {
    describe('selectedMap', () => {
      test('正常な値：selectedMapが取得できること', () => {
        wrapper.setData({difficulty: 'normal', map: 'lake-biwako'})
        expect(wrapper.vm.selectedMap).toBeTruthy()
      })
    })
    describe('mapName', () => {
      test('正常な値：mapNameが取得できること', () => {
        wrapper.setData({difficulty: 'normal', map: 'lake-biwako'})
        expect(wrapper.vm.mapName).toBeTruthy()
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