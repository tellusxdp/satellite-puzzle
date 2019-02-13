import IndexPage from '~/pages/difficulty/_difficulty/map/index.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Store from '~/store/index'
import cloneDeep from 'lodash.clonedeep'
import VueRouter from 'vue-router';
const puzzleSettings = require('~/puzzle.json')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const $ua = {
  deviceType: () => 'pc'
}

const router = new VueRouter({
    params: { difficulty: 'normal' },
    routes: [
      {path: '/difficulty/:difficulty/map', component: IndexPage}
    ],
});

describe('pages/difficulty/_difficulty/map/index.vue', () => {
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
      mocks: {
        $ua
      }    
    })
  })

  describe('computed', () => {
    describe('mapList', () => {
      test('mapListが取得できること', () => {
        wrapper.setData({difficulty: 'normal'})
        expect(wrapper.vm.mapList).toBeTruthy()
      })
    })
  })
})