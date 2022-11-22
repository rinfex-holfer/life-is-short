<script setup lang="ts">
import {getCurrentQuery, removeQueryFromCurrentLocation} from "../../../router/app-router";
import Month from "../../Month.vue";
import {computed, onUnmounted} from "vue";

const monthAndYear = computed(() => {
  const {monthIdx, year} = getCurrentQuery() as {monthIdx: string, year: string};

  return {monthIdx: +monthIdx, year: +year};
})

onUnmounted(() => {
  removeQueryFromCurrentLocation(["monthIdx", "year"])
})

</script>

<template>
  <Month :month="monthAndYear"/>
</template>

<style scoped>

</style>