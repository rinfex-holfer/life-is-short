<script lang="ts">
export default { name: "YearCalendar" }
</script>

<script setup lang="ts">
import {getISOWeek, getISOWeeksInYear} from "date-fns";
import {currentTime} from "../store";

const now = currentTime.value
const weeksInYear = getISOWeeksInYear(now)
const week = getISOWeek(now)
</script>

<template>
  <div class="container">
    <span
        v-for="i in weeksInYear"
        class="item"
        :class="{
          itemActive: i === week,
          itemSpent: i < week,
        }"
    >
      {{ i }}
    </span>
  </div>
</template>