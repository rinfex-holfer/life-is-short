<script lang="ts" setup>
function publish() {
  console.log("publish")
}
</script>

<template>
  <textarea name="journal" cols="30" rows="10">

    </textarea>

  <button type="button" @click="publish">publish</button>
</template>

<style scoped>

</style>