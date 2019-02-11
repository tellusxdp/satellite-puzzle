<template lang="pug">
  .modal
    .modal-contents
      .image-area
        img.alos-2(src="~assets/images/alos-2/img_modal.png")
      .button-area
        click-button.button(
          @onClick="$emit('close')",
          :src="require('~/assets/images/button/btn_bktogame.png')",
          :srcActive="require('~/assets/images/button/btn_prs_bktogame.png')")
        click-button.button(
          @onClick="$emit('retry')",
          :src="require('~/assets/images/button/btn_renew.png')",
          :srcActive="require('~/assets/images/button/btn_prs_renew.png')")
        click-button.button(
          @onClick="$emit('top')",
          :src="require('~/assets/images/button/btn_finish.png')",
          :srcActive="require('~/assets/images/button/btn_prs_finish.png')")
</template>

<script>
import ClickButton from '~/components/buttons/ClickButton'
export default {
  components: {
    ClickButton,
  }
}
</script>

<style lang="scss" scoped>
.modal {
  margin-left: 28px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 98px;
  width: 580px;
  height: 795px;
  border-radius: 4px;
  background-color: #e4e8f2;
}

.modal-contents {
  text-align: center;
}

.image-area {
  height: 394px;
}

.alos-2 {
  margin-top: 74px;
  margin-left: 0;
}

.buton-area {
  top: 304px;
}

.button {
  margin-top: 32px;
}

</style>