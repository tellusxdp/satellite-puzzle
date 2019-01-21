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
  nuxtServerInit({ commit, state }, { app }) {
    const sprintf = require('sprintf-js').vsprintf
    try {
      const puzzleSettings = require('../pazzle.json')
      puzzleSettings.puzzles.forEach((e) => {
        console.log(e)
        const params = e.parameters
        e.difficulties.forEach((difficulty) => {
          const reqQuery = sprintf('?z=%d&x=%d&y=%d&kind=%s&split_n=%d',
            [params.z, params.x, params.y, params.kind, difficulty])
          console.log(reqQuery)
          const res = this.$axios.get('http://satellite-puzzle-image-processing:5000'+reqQuery).then((res) => {
            console.log("ssjidjso", res)
          }).catch((err) => console.log("あああああ", err))
        })
      })
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
