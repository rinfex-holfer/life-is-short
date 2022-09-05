<script lang="ts" setup>

const props = withDefaults(defineProps<{
  x?: number
  y?: number
  onClose?: () => void
}>(), {x: 0, y: 0})



</script>

<template>

<div class="popup" :style="{left: props.x + 'px', top: props.y + 'px'}">
  <button class="close" type="button" @click="onClose" v-if="onClose">X</button>
  <slot></slot>
</div>

</template>

<style scoped>
.popup {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  transform: translate(-50%, -100%);
  transform-origin: center bottom;
  background: #fff;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background: gray;
  cursor: pointer;
  outline: none;
  border: none;
}
</style>