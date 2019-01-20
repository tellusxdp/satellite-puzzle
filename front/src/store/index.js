import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store ({
    state: () => ({
      min: 0,
      sec: 0,
      msec: 0,
    }),
    getters: {
      min(state) { return state.min },
      sec(state) { return state.sec },
      msec(state) { return state.msec },
    },
    mutations: {
      resetMin(state) { state.min = 0 },
      resetSec(state) { state.sec = 0 },
      resetMsec(state) { state.msec = 0 },
      inclementMin(state) { state.min++ },
      inclementSec(state) { state.sec++ },
      inclementMsec(state) { state.msec++ },
    }
  })
}

export default createStore
