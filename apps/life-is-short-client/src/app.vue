<script lang="ts" setup>
import {getUser} from "./domain/api/user";
import {currentUser} from "./store";
import Modal from "./components/Modal/Modal.vue";
import {onMounted} from "vue";

onMounted(() => {
  getUser("default").then(user => {
    currentUser.value = user
  })
})

</script>

<template>
  <Modal/>
  <router-view></router-view>
</template>

<style src="./styles-global.less"></style>