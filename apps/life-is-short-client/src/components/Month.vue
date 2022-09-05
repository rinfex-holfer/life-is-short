<script setup lang="ts">
import {getDay, getDaysInMonth, isBefore, isSameDay} from "date-fns";
import {LifeMonth} from "../domain";
import {computed} from "vue";
import {currentTime} from "../store";
import {dateFormatDayOfMonth, dateFormatMonthYear} from "../utils/date";

type MonthRows = DayView[][]

type DayView = {
  isSpent?: boolean
  isActive?: boolean
  isInvisible?: boolean
  label?: string
}

const props = defineProps<{
  month: LifeMonth
}>()

const selectedMonth = computed(() => new Date(props.month.year, props.month.month))

const monthRows = computed<MonthRows>(() => {
  const maxDays = getDaysInMonth(selectedMonth.value)

  const rows: MonthRows = []

  const firstDayOfWeek = getDay(new Date(props.month.year, props.month.month, 1))
  if (firstDayOfWeek !== 1) {
    rows.push([])
    let invisibleDaysToAdd = firstDayOfWeek === 0 ? 6 : firstDayOfWeek-1
    for (let i = 0; i < invisibleDaysToAdd; i++) {
      rows[rows.length - 1].push({isInvisible: true})
    }
  }

  for (let i = 1; i <= maxDays; i++) {
    if (!rows[rows.length - 1] || rows[rows.length - 1].length === 7) {
      rows.push([])
    }
    const day = new Date(props.month.year, props.month.month, i)

    rows[rows.length - 1].push({
      isSpent: isBefore(day, currentTime.value),
      isActive: isSameDay(day, currentTime.value),
      label: dateFormatDayOfMonth(day)
    })
  }

  return rows
})

</script>

<template>

<div class="center">
  <div class="weekTitle">
<!--    {{ dateFormatMonthYear(selectedMonth) }}-->
  </div>

  <div v-for="row in monthRows" class="row">
    <span
        v-for="day in row"
        class="item"
        :class="{
        itemSpent: day.isSpent,
        itemActive: day.isActive,
        itemInvisible: day.isInvisible,
      }"
    >
    {{ day.label }}
  </span>
  </div>
</div>

</template>

<style>
  .center {
    margin: 0 auto;
    width: fit-content;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: flex-start;
  }
</style>