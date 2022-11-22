<script setup lang="ts">
import {getCurrentQuery, removeQueryFromCurrentLocation} from "../../../router/app-router";
import Month from "../../Month.vue";
import {onUnmounted, reactive} from "vue";
import {onBeforeRouteUpdate} from "vue-router";

const {monthIdx, year} = getCurrentQuery() as {monthIdx: string, year: string};
const monthModalProps = reactive({monthIdx: +monthIdx, year: +year})

onBeforeRouteUpdate((from, to) => {
  const {monthIdx, year} = to.query as {monthIdx: string, year: string};
  monthModalProps.year = +year
  monthModalProps.monthIdx = +monthIdx
})

onUnmounted(() => {
  removeQueryFromCurrentLocation(["monthIdx", "year"])
})

</script>

<template>
  <Month :month="monthModalProps"/>
</template>

<style scoped>

</style>