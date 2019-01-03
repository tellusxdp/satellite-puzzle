<template>
  <div>
    <div
      class="fb-share-button"
      data-href="https://developers.facebook.com/docs/plugins/"
      data-layout="button"
      data-size="small"
      data-mobile-iframe="false"
    >
      <a
        target="_blank"
        href=""
        class="fb-xfbml-parse-ignore"
      >
        シェア
      </a>
    </div>
    <div id="fb-root"/>
  </div>
</template>


<script>
export default {
  methods: {
    init: function(d) {
      var js, fjs = d.getElementsByTagName('script')[0]
      if (d.getElementById('facebook-jssdk')) {
        return
      }
      js = d.createElement('script'); js.id = 'facebook-jssdk'
      js.src = 'https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v3.2'
      fjs.parentNode.insertBefore(js, fjs)
    }
  },
  created () {
    if (process.browser) {
      this.init(document)
    }
  },
}
</script>
