const path = require('path')
const NODE_ENV = process.env.NODE_ENV
const env = require(`./envs/${NODE_ENV}`)

module.exports = {
  srcDir: 'src',
  env: {
    API_URL: env.API_URL || 'http://localhost:5000',
    CLIENT_URL: env.CLIENT_URL || 'http://localhost:3000'
  },
  head: {
    title: 'satellite-puzzle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    ['nuxt-sass-resources-loader', '@@/assets/css/*.scss']
  ],
  workbox: {
    dev: false, // yarn dev でもworkboxを有効にしたい場合はtrue
  },
  manifest: { // TODO: 仮置き
    name: "satellite-puzzle",
    lang: 'ja'
  },
  plugins: [
    '~/plugins/axios.js',
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  css: [
    '~/../node_modules/ress/dist/ress.min.css',
    '~/assets/css/main.css'
  ],
  axios: {}
}

