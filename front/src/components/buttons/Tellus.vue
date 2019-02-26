// Tellusへのリンク
<template lang="pug">
  .tellus-link
    a(:href="href", target="_blank", rel="nofollow")
      .tellus-icon
        img(:src="src")
</template>

<script>
export default {
  data: () => {
    return {
      href: "https://www.tellusxdp.com",
      src: require('~/assets/images/icon/icon_tellus_w.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.tellus-link {
  width: 200px;
  height: 63px;

  a {
    display: inline-block;

    .tellus-icon {
        img {
          width: 200px;
          height: 63px;
          display: inline-block;
        }
    }
  }
}
</style>
