<template lang="pug">
  .wrapper
    .contents
      nuxt
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.contents {
  background: url('~assets/images/background/background.png') center center / cover no-repeat;
  background-size: contain;
  width: 640px;
  height: 1148px;

  /* height: 100vh;
  width: calc(100vh / 1149 * 640); */
  margin-left: auto;
  margin-right: auto;
}
</style>
