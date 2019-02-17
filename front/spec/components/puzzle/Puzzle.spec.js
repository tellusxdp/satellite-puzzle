import Puzzle from '~/components/puzzle/Puzzle.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '~/store/index'
import cloneDeep from 'lodash.clonedeep'
import _ from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Puzzle.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = null
    wrapper = mount(Puzzle, {
        store: new Vuex.Store(cloneDeep(store)),
        localVue,
        _,
    })
  })

  describe('computed', () => {
    describe('px', () => {
      test('easy', () => {
        wrapper.setProps({difficulty: 'easy'})
        expect(wrapper.vm.px).toBe(160)
      })
      test('normal', () => {
        wrapper.setProps({difficulty: 'normal'})
        expect(wrapper.vm.px).toBe(120)
      })
      test('hard', () => {
        wrapper.setProps({difficulty: 'hard'})
        expect(wrapper.vm.px).toBe(96)
      })
    })
    describe('styles', () => {
      test('easy', () => {
        wrapper.setProps({difficulty: 'easy'})
        expect(wrapper.vm.px).toBe(160)
        expect(wrapper.vm.styles).toEqual({'--px': '160px'})
      })
    })
  })
  // methods
  describe('methods', () => {
    describe('mountedMethod', () => {
      test('タイルの初期位置を設定すること', () => {  
        wrapper.setProps({difficulty: 'easy'})
        wrapper.setData({tiles: [{no: 1, x:2, y: 3}, {no: 2, x: 5, y: 6}]})
        // テスト実施
        wrapper.vm.mountedMethod()
        expect(wrapper.vm.$el.getElementsByClassName('_1')[0].style.top).toBe('320px')
        expect(wrapper.vm.$el.getElementsByClassName('_1')[0].style.left).toBe('480px')
        expect(wrapper.vm.$el.getElementsByClassName('_2')[0].style.top).toBe('800px')
        expect(wrapper.vm.$el.getElementsByClassName('_2')[0].style.left).toBe('960px')
      })
      test('readyをemitすること', () => {
        wrapper.vm.mountedMethod
        expect(wrapper.emitted('ready')).toBeTruthy()
      })
    })
    describe('updatedMethod', () => {
      test('cTilesとcAnsが一致した場合にpuzzleCompleteをemit,isCompleteをtrueにすること', () => {  
        expect(wrapper.vm.isComplete).toBeFalsy()
        wrapper.setData({
          tiles: [{no:1, x:2, y: 3}, {no: 2, x: 6, y: 6}], 
          ans: [{no:1,x:2,y:3}, {no:2, x: 5, y: 6}]
        })
        expect(wrapper.emitted('puzzleComplete')).toBeFalsy()
        wrapper.setProps({difficulty: 'easy'})
        wrapper.setData({
          tiles: [{no: 1, x:2, y: 3}, {no: 2, x: 5, y: 6}], 
          ans: [{no:1,x:2,y:3}, {no:2, x: 5, y: 6}]
        })
        // テスト実施
        wrapper.vm.updatedMethod
        expect(wrapper.vm.isComplete).toBeTruthy()
        expect(wrapper.emitted('puzzleComplete')).toBeTruthy()
      })
    })
    describe('tileMove', () => {
      test('y+1の移動', () => {
        wrapper.setData({
          tiles: [{no: 1, x:1, y: 0}],
          empty: {x:1, y:1},
        })
        wrapper.vm.tileMove(1)
        expect(wrapper.vm.tiles).toEqual([{no:1, x:1, y: 1}])
        expect(wrapper.vm.empty).toEqual({x:1, y: 0})
      })
      test('y-1の移動', () => {
        wrapper.setData({
          tiles: [{no: 1, x:1, y: 1}],
          empty: {x:1, y:0},
        })
        wrapper.vm.tileMove(1)
        expect(wrapper.vm.tiles).toEqual([{no:1, x:1, y: 0}])
        expect(wrapper.vm.empty).toEqual({x:1, y: 1})
      })
      test('x+1の移動', () => {
        wrapper.setData({
          tiles: [{no: 1, x:0, y: 1}],
          empty: {x:1, y:1},
        })
        wrapper.vm.tileMove(1)
        expect(wrapper.vm.tiles).toEqual([{no:1, x:1, y: 1}])
        expect(wrapper.vm.empty).toEqual({x:0, y: 1})
      })
      test('x-1の移動', () => {
        wrapper.setData({
          tiles: [{no: 1, x:1, y: 1}],
          empty: {x:0, y:1},
        })
        wrapper.vm.tileMove(1)
        expect(wrapper.vm.tiles).toEqual([{no:1, x:0, y: 1}])
        expect(wrapper.vm.empty).toEqual({x:1, y: 1})
      })
      test('移動しない', () => {
        wrapper.setData({
          tiles: [{no: 1, x:3, y: 1}],
          empty: {x:1, y:1},
        })
        wrapper.vm.tileMove(1)
        expect(wrapper.vm.tiles).toEqual([{no:1, x:3, y: 1}])
        expect(wrapper.vm.empty).toEqual({x:1, y: 1})
      })
      test('移動しない', () => {
        wrapper.setData({
          tiles: [{no: 1, x:0, y: 0}],
          empty: {x:1, y:1},
        })
        wrapper.vm.tileMove(1)
        expect(wrapper.vm.tiles).toEqual([{no:1, x:0, y: 0}])
        expect(wrapper.vm.empty).toEqual({x:1, y: 1})
      })
    })
    describe('tileMoved', () => {
      test('', () => {
        wrapper.setProps({difficulty: 'easy'})
        wrapper.setData({tiles: [{no: 1, x:2, y: 3}, {no: 2, x: 5, y: 6}]})
        // テスト実施
        wrapper.vm.tileMoved(1)
        expect(wrapper.vm.$el.getElementsByClassName('_1')[0].style.top).toBe('320px')
        expect(wrapper.vm.$el.getElementsByClassName('_1')[0].style.left).toBe('480px')
        wrapper.vm.tileMoved(2)
        expect(wrapper.vm.$el.getElementsByClassName('_2')[0].style.top).toBe('800px')
        expect(wrapper.vm.$el.getElementsByClassName('_2')[0].style.left).toBe('960px')
      })
    })
    describe('pushComplete', () => {
      test('pushCompleteの実行でpushCompleteをemitすること', () => {
        expect(wrapper.emitted('pushComplete')).toBeFalsy()
        wrapper.vm.pushComplete()
        expect(wrapper.emitted('pushComplete')).toBeTruthy()
    })

    })
    describe('image', () => {
      test('想定したpropsと引数の値で期待値が取得できること', () => {
        wrapper.setProps({mapImages: 'hogehoge'})
        expect(wrapper.vm.image(10)).toBe('/images/hogehoge/10.png')
      })
    })
    describe('move', () => {
      // tileMoveでテスト実施
    })
    describe('canMoveDown', () => {
      test('移動可能', () => {
        expect(wrapper.vm.canMoveDown({x:0, y:1}, {x:1,y:1})).toBeTruthy()
      })
      test('移動不可能', () => {
        expect(wrapper.vm.canMoveDown({x:1, y:1}, {x:1,y:1})).toBeFalsy()
      })
    })
    describe('canMoveUp', () => {
      test('移動可能', () => {
        expect(wrapper.vm.canMoveUp({x:1, y:1}, {x:0,y:1})).toBeTruthy()
      })
      test('移動不可能', () => {
        expect(wrapper.vm.canMoveUp({x:1, y:1}, {x:1,y:1})).toBeFalsy()
      })
    })
    describe('canMoveRight', () => {
      test('移動可能', () => {
        expect(wrapper.vm.canMoveRight({x:1, y:0}, {x:1,y:1})).toBeTruthy()
      })
      test('移動不可能', () => {
        expect(wrapper.vm.canMoveRight({x:1, y:1}, {x:1,y:1})).toBeFalsy()
      })
    })
    describe('canMoveLeft', () => {
      test('移動可能', () => {
        expect(wrapper.vm.canMoveLeft({x:1, y:1}, {x:1,y:0})).toBeTruthy()
      })
      test('移動不可能', () => {
        expect(wrapper.vm.canMoveLeft({x:1, y:1}, {x:1,y:1})).toBeFalsy()
      })
    })
  })
})