const state = () => ({
  puzzles: {}, // puzzle.jsonから取得した情報
  min: 0, // パズルにかかった時間（分）
  sec: 0, // パズルにかかった時間（秒）
  bestRecords: [], // 自己記録
  bestRecord: {}, // 今回プレイしたマップ・難易度の自己記録
  isNewRecord: false, // 新記録かどうか
})

const getters = {
  puzzles: state => state.puzzles,
  min: state => state.min,
  sec: state => state.sec,
  bestRecords: state => state.bestRecords,
  bestRecord: state => state.bestRecord,
  isNewRecord: state => state.isNewRecord,
}

const mutations = {
  SET_PUZZLE_SETTING(state, json) {
    state.puzzles = json
  },
  RESET_MIN(state) { state.min = 0 },
  RESET_SEC(state) { state.sec = 0 }, 
  INCLEMENT_MIN(state) { state.min++ },
  INCLEMENT_SEC(state) { state.sec++ },
  SET_BEST_RECORDS(state, record) { state.bestRecords = record },
  SET_BEST_RECORD(state, record) {
    state.bestRecord = record
  },
  SET_IS_NEW_RECORD(state, isNewRecord) {
    state.isNewRecord = isNewRecord
  }
}

const actions = {
  async nuxtServerInit({ commit, state }, { app }) {
    const path = require('path')
    const sprintf = require('sprintf-js').vsprintf

    const puzzleSettings = require('../puzzle.json')

    commit('SET_PUZZLE_SETTING', puzzleSettings.puzzles)

    let promises = []
    puzzleSettings.puzzles.forEach(e => {
      e.parameters.forEach(p => {
        // FIXME: このやり方かなりイケてないので、修正したい
        // TODO: hostを環境変数で制御する
        const imageUrl = sprintf("%s/images/%s/%d-%d-%d-%d/completed.png",
          [`${process.env.CLIENT_URL}`, p.kind, p.z, p.x, p.y, p.split_n])
        this.$axios.get(imageUrl)
          .catch((err) => {
            promises.push(this.$axios.get(`${process.env.API_URL}`, { params: p }))
          })
      })
    })

    // アプリケーション起動時にパズルの設定ファイルを読み込み、画像を分割する処理をリクエストする
    try {
      promises && await Promise.all(promises)
    } catch (err) {
      throw err
    }
  },
  resetMin({ commit }) { commit('RESET_MIN') },
  resetSec({ commit }) { commit('RESET_SEC') },
  inclementMin({ commit }) { commit('INCLEMENT_MIN') },
  inclementSec({ commit }) { commit('INCLEMENT_SEC') },
  updateBestRecords({ commit }, record) { // bestRecordsを更新する
    // bestRecordsを全て取得
    let bestRecords = this.state.bestRecords.concat()

    // recordの難易度・マップに対応するindexをbestRecordsから取得
    const i = bestRecords.findIndex(v => {
      return v.difficulty === record.difficulty && v.map === record.map
    })

    if (i > -1) { // 対応するindexが見つかった場合
      bestRecords[i] = record // 記録を更新する
    } else { // 対応するindexが見つからなかった場合
      bestRecords.push({ // 記録を追加する
        difficulty: record.difficulty,
        map: record.map,
        min: record.min,
        sec: record.sec
      })
    }
    commit('SET_BEST_RECORDS', bestRecords) // 修正した値を新たなbestRecordsとして保存する
  },
  setBestRecord({ commit }, record) {
    commit('SET_BEST_RECORD', record)
  },
  setIsNewRecord({ commit }, isNewRecord) {
    commit('SET_IS_NEW_RECORD', isNewRecord)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}