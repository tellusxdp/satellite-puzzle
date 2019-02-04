<template lang="pug">
  .modal
    .modal-contents
      img.alos-2(src="~assets/images/alos-2/alos-2.png")
      .button
        click-button(
          @onClick="$emit('close')",
          :src="require('~/assets/images/button/btn_bktogame.png')",
          :srcActive="require('~/assets/images/button/btn_prs_bktogame.png')")
      .button
        click-button(
          @onClick="$emit('retry')",
          :src="require('~/assets/images/button/btn_renew.png')",
          :srcActive="require('~/assets/images/button/btn_prs_renew.png')")
      .button
        click-button(
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


<style scoped>
.modal {
  align-items: center;

  /* justify-content: center; */
  position: absolute;
  top: 98px;
  left: calc(50% - 290px);
  width: 580px;
  height: 795px;
  border-radius: 4px;
  background-color: #e4e8f2;
}

.modal-contents {
  text-align: center;
}

.alos-2 {
  margin-top: 161px;
}

.button {
  margin-top: 32px;
}

</style>