module.exports = {
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^@@/(.*)$': '<rootDir>/$1',
      '^~/(.*)$': '<rootDir>/src/$1',
      '^~~/(.*)$': '<rootDir>/$1',
      '^vue$': 'vue/dist/vue.common.js'
    },
    moduleFileExtensions: ['js', 'vue', 'json', 'png'],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '.*\\.(vue)$': 'vue-jest',
      ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub"
    }
  }
  