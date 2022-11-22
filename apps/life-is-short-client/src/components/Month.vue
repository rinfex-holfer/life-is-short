<script setup lang="ts">
import {endOfDay, getDay, getDaysInMonth, isBefore, isMonday, isSameDay} from "date-fns";
import {CalendarMonth, LifeMonth} from "../domain";
import {computed} from "vue";
import {currentTime} from "../store";
import {dateFormatDayOfMonth, dateFormatMonthYear} from "../utils/date";

type MonthRows = DayView[][]

type DayView = {
  isSpent: boolean
  isActive: boolean
  label: string
} | {isInvisible: boolean}

const props = defineProps<{
  month: CalendarMonth
}>()

const monthDate = computed(() => new Date(props.month.year, props.month.monthIdx))

const monthRows = computed<MonthRows>(() => {
  const maxDays = getDaysInMonth(monthDate.value)

  const rows: MonthRows = []

  // populate first row of days with "invisible" days to create an empty space in the beginning
  // (and if first day is Monday - then no empty space needed)
  const firstDateOfMonth = new Date(props.month.year, props.month.monthIdx, 1);
  const doesStartFromMonday = isMonday(firstDateOfMonth)
  if (!doesStartFromMonday) {
    const firstDayIndexInWeek = getDay(firstDateOfMonth)
    rows.push([])

    const isSunday = firstDayIndexInWeek === 0;
    let invisibleDaysToAdd = isSunday ? 6 : firstDayIndexInWeek-1
    for (let i = 0; i < invisibleDaysToAdd; i++) {
      rows[rows.length - 1].push({isInvisible: true})
    }
  }

  for (let i = 1; i <= maxDays; i++) {
    if (!rows[rows.length - 1] || rows[rows.length - 1].length === 7) {
      rows.push([])
    }
    const day = endOfDay(new Date(props.month.year, props.month.monthIdx, i))

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

<div class="month-container">
  <div class="month-title">
    {{ dateFormatMonthYear(monthDate) }}
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
    {{ day.label || "" }}
  </span>
  </div>
</div>

</template>

<style scoped>
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

  .item {
    margin: 10px;
    border: 1px solid black;
    width: 20px;
    height: 20px;
  }

  .itemSpent {
    opacity: var(--spent-figure-opacity);
  }

  .itemInvisible {
    opacity: 0;
  }

  .itemActive {
    font-weight: bold;
    outline: 1px solid black;
  }
</style>