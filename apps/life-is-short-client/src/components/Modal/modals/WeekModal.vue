<script setup lang="ts">
import { getCurrentQuery, removeQueryFromCurrentLocation } from "../../../router/app-router";
import { onUnmounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Week from "../../Week.vue";

const query = getCurrentQuery() as { weekIdx: string };
const weekIdx = ref(+query.weekIdx);

const route = useRoute();
watchEffect(() => {
    const query = route.query as { weekIdx: string };
    weekIdx.value = +query.weekIdx;
});

onUnmounted(() => {
    removeQueryFromCurrentLocation(["weekIdx"]);
});
</script>

<template>
    <Week :week-idx-in-life="weekIdx" />
</template>

<style scoped></style>
