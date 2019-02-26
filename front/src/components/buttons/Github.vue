// GitHubへのリンク
<template lang="pug">
  .github-link
    a(:href="href", target="_blank", rel="nofollow")
      .github-icon
        img(:src="src")
      .github-text
        p 開発者向けコンテンツはこちら
        p (ソースコード・ドキュメント)
</template>

<script>
export default {
  data: () => {
    return {
      href: "https://github.com/tellusxdp/satellite-puzzle",
      src: require('~/assets/images/icon/icon_github.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.github-link {
  width: 400px;
  height: 60px;
  margin: 0 auto;

  a {
    display: table;
    margin: 0 auto;
    text-decoration: none;

    .github-icon {
      width: 60px;
      height: 60px;
      display: table-cell;
    }

    .github-text {
      display: table-cell;
      vertical-align: middle;
      padding-left: 20px;

      p {
        display: table-row;
        color: #fff;
        font-size: 20px;
        font-family: NotoSansCJKjp;
        line-height: 1.5;
      }
    }
  }
}
</style>
