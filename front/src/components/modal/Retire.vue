<template>
  <div class="modal">
    <div class="modal-contents">
      <img
        class="alos-2"
        src="~assets/images/alos-2/alos-2.png">
      <div class="button">
        <purple-button @onClick="$emit('close')">ゲーム画面に戻る</purple-button>
      </div>
      <div class="button">
        <purple-button @onClick="$emit('retry')">最初からやりなおす</purple-button>
      </div>
      <div class="button">
        <purple-button @onClick="$emit('top')">終了</purple-button>
      </div>
    </div>
  </div>
</template>

<script>
import PurpleButton from '~/components/buttons/PurpleButton'
export default {
  components: {
    PurpleButton,
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