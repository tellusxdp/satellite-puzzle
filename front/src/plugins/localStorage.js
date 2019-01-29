import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'satellite-puzzle',
        paths: ['min', 'sec', 'msec', 'bestRecords', 'bestRecord']
    })(store)
  })
}