<script setup lang="ts">
import { getCurrentQuery, removeQueryFromCurrentLocation } from "../../../router/app-router";
import Month from "../../Month.vue";
import { onUnmounted, reactive, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { CalendarMonth } from "../../../domain";

const { monthIdx, year } = getCurrentQuery() as {
    monthIdx: string;
    year: string;
};
const calendarMonth = reactive<CalendarMonth>({
    monthIdx: +monthIdx,
    year: +year,
});

const route = useRoute();
watchEffect(() => {
    const { monthIdx, year } = route.query as { monthIdx: string; year: string };
    calendarMonth.year = +year;
    calendarMonth.monthIdx = +monthIdx;
});

onUnmounted(() => {
    removeQueryFromCurrentLocation(["monthIdx", "year"]);
});
</script>

<template>
    <Month :month="calendarMonth" />
</template>

<style scoped></style>
