import Vuex from 'vuex'

export const state = () => ({
  puzzles: {},
  min: 0,
  sec: 0,
  msec: 0,
})

export const getters = {
  puzzles: state => state.puzzles,
  min: state => state.min,
  sec: state => state.sec,
  msec: state => state.msec,
}

export const mutations = {
  SET_PUZZLE_SETTING(state, json) {
    state.puzzles = json
  },
  RESET_MIN(state) { state.min = 0 },
  RESET_SEC(state) { state.sec = 0 },
  RESET_MSEC(state) { state.msec = 0 },
  INCLEMENT_MIN(state) { state.min++ },
  INCLEMENT_SEC(state) { state.sec++ },
  INCLEMENT_MSEC(state) { state.msec++ },
}

export const actions = {
  async nuxtServerInit({ commit, state }, { app }) {
    try {
      const path = require('path')
      const fs = require('fs')
      const sprintf = require('sprintf-js').vsprintf
      // アプリケーション起動時にパズルの設定ファイルを読み込み、画像を分割する処理をリクエストする
      const puzzleSettings = require('../pazzle.json')
      let promises = []
      puzzleSettings.puzzles.forEach(e => {
        e.parameters.forEach(p => {
          // TODO: このやり方かなり微妙なんでしゅうせいしたい
          const dirpath = sprintf("%s/src/assets/images/maps/%s/%d_%d_%d_%d/completed.png",
            [path.resolve(''), p.kind, p.z, p.x, p.y, p.split_n])
          fs.access(dirpath, fs.constants.F_OK, (err) => {
            if (err && err.code === 'ENOENT') {
              // TODO: あとで環境変数化する
              promises.push(this.$axios.get('http://localhost:5000', { params: p }))
            }
          })
        })
      })
      promises && await Promise.all(promises)
    } catch (err) {
      throw err
    }
  },
  resetMin({ commit }) { commit('RESET_MIN') },
  resetSec({ commit }) { commit('RESET_SEC') },
  resetMsec({ commit }) { commit('RESET_MSEC') },
  inclementMin({ commit }) { commit('INCLEMENT_MIN') },
  inclementSec({ commit }) { commit('INCLEMENT_SEC') },
  inclementMsec({ commit }) { commit('INCLEMENT_MSEC') },
}
