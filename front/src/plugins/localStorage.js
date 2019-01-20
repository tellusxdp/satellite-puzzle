import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'satellite-puzzle',
        // paths: ['msec'] とするとmsecがローカルストレージに入る
    })(store)
  })
}