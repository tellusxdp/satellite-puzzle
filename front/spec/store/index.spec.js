import Vuex from 'vuex'
import index from '~/store'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import { dispatch } from 'rxjs/internal/observable/pairs';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/index.js', () => {
    let store

    beforeEach(() => {
        store = new Vuex.Store(cloneDeep(index))
    })

    describe('mutations/getters', () => {
        test('SET_PUZZLE_SETTING/puzzles', () => {
            expect(store.getters['puzzles']).toEqual({})
            store.commit('SET_PUZZLE_SETTING', {hoge: "hoge"})
            expect(store.getters['puzzles']).toEqual({hoge: "hoge"})
        })
        test('RESET_MIN/min', () => {
            expect(store.getters['min']).toBe(0)
            store.commit('RESET_MIN')
            expect(store.getters['min']).toBe(0)
        }),
        test('RESET_SEC/sec', () => {
            expect(store.getters['sec']).toBe(0)
            store.commit('RESET_SEC')
            expect(store.getters['sec']).toBe(0)
        }),
        test('INCLEMENT_MIN/min', () => {
            expect(store.getters['min']).toBe(0)
            store.commit('INCLEMENT_MIN')
            expect(store.getters['min']).toBe(1)
        }),
        test('INCLEMENT_SEC/sec', () => {
            expect(store.getters['sec']).toBe(0)
            store.commit('INCLEMENT_SEC')
            expect(store.getters['sec']).toBe(1)
        }),
        test('SET_BEST_RECORDS/bestRecords', () => {
            expect(store.getters['bestRecords'].length).toBe(0)
            store.commit('SET_BEST_RECORDS', [0, 1, 2])
            expect(store.getters['bestRecords'].length).toBe(3)
        }),
        test('SET_BEST_RECORD/bestRecord', () => {
            expect(store.getters['bestRecord']).toEqual({})
            store.commit('SET_BEST_RECORD', {min: 10, sec: 20})
            expect(store.getters['bestRecord']).toEqual({min:10, sec:20})
        }),
        test('SET_IS_NEW_RECORD/isNewRecord', () => {
            expect(store.getters['isNewRecord']).toBeFalsy()
            store.commit('SET_IS_NEW_RECORD', true)
            expect(store.getters['isNewRecord']).toBeTruthy()
            store.commit('SET_IS_NEW_RECORD', false)
            expect(store.getters['isNewRecord']).toBeFalsy()
        })
    })

    describe('actions', () => {
        test('inclementMin', () => {
            expect(store.getters['min']).toBe(0)
            store.dispatch('inclementMin')
            expect(store.getters['min']).toBe(1)
        }),
        test('resetMin', () => {
            expect(store.getters['min']).toBe(0)
            store.dispatch('inclementMin')
            expect(store.getters['min']).toBe(1)
            store.dispatch('resetMin')
            expect(store.getters['min']).toBe(0)
        }),
        test('inclementSec', () => {
            expect(store.getters['sec']).toBe(0)
            store.dispatch('inclementSec')
            expect(store.getters['sec']).toBe(1)
        }),
        test('resetSec', () => {
            expect(store.getters['sec']).toBe(0)
            store.dispatch('inclementSec')
            expect(store.getters['sec']).toBe(1)
            store.dispatch('resetSec')
            expect(store.getters['sec']).toBe(0)
        }),
        describe('updateBestRecord', () => {
            test('初回', () => {
                const record =  {
                    difficulty: "normal",
                    map: "mt-fuji",
                    min:10, 
                    sec: 20
                }
                expect(store.getters['bestRecords']).toEqual([])
                store.dispatch('updateBestRecords', record)
                expect(store.getters['bestRecords']).toEqual([record])
            }),
            test('２回目以降', () => {
                const record_1 =  { // 初回
                    difficulty: "normal",
                    map: "mt-fuji",
                    min:10, 
                    sec: 20
                }
                const record_2 =  { // 新記録
                    difficulty: "normal",
                    map: "mt-fuji",
                    min:10, 
                    sec: 19
                }
                expect(store.getters['bestRecords']).toEqual([])
                store.dispatch('updateBestRecords', record_1)
                expect(store.getters['bestRecords']).toEqual([record_1])
                store.dispatch('updateBestRecords', record_2)
                expect(store.getters['bestRecords']).toEqual([record_2])
            }),
            test('別の難易度の新記録', () => {
                const record_1 =  { // 初回
                    difficulty: "normal",
                    map: "mt-fuji",
                    min:10, 
                    sec: 20
                }
                const record_2 =  { // 同一記録
                    difficulty: "hard",
                    map: "mt-fuji",
                    min:10, 
                    sec: 21
                }
                expect(store.getters['bestRecords']).toEqual([])
                store.dispatch('updateBestRecords', record_1)
                expect(store.getters['bestRecords']).toEqual([record_1])
                store.dispatch('updateBestRecords', record_2)
                expect(store.getters['bestRecords']).toEqual([record_1, record_2])
            }),
            test('同じの難易度の別のマップ新記録', () => {
                const record_1 =  { // 初回
                    difficulty: "normal",
                    map: "mt-fuji",
                    min:10, 
                    sec: 20
                }
                const record_2 =  { // 同一記録
                    difficulty: "normal",
                    map: "mt-hoge",
                    min:10, 
                    sec: 21
                }
                expect(store.getters['bestRecords']).toEqual([])
                store.dispatch('updateBestRecords', record_1)
                expect(store.getters['bestRecords']).toEqual([record_1])
                store.dispatch('updateBestRecords', record_2)
                expect(store.getters['bestRecords']).toEqual([record_1, record_2])
            })
        }),
        test('setBestRecord', () => {
            expect(store.getters['bestRecord']).toEqual({})
            store.dispatch('setBestRecord', {min:10, sec: 20})
            expect(store.getters['bestRecord']).toEqual({min:10, sec:20})
        }),
        test('setIsNewRecord', () => {
            expect(store.getters['isNewRecord']).toBeFalsy()
            store.dispatch('setIsNewRecord', true)
            expect(store.getters['bestRecord']).toBeTruthy()
            store.dispatch('setIsNewRecord', false)
            expect(store.getters['isNewRecord']).toBeFalsy()
        })
    })
})