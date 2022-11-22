<script setup lang="ts">

import {lifeYearsInWeeks} from "../store";
import {computed, ref, watch} from "vue";
import {openModal} from "./Modal/modal-utils";
import {ModalKey} from "./Modal/modal-config";
import {DayState, LifeDayExtended, loadDays} from "../domain/services/days";
import {dateFormatDayMonth, dateFormatNum, dateFormatYear} from "../utils/date";

const props = defineProps<{
  weekNum: number
}>()

const yearOfSelectedWeek = computed(() => {
  return lifeYearsInWeeks.value.find(year =>
      year.weeks[0].idxInLife <= props.weekNum
      && year.weeks[year.weeks.length - 1].idxInLife >= props.weekNum
  )
})

const selectedWeek = computed(() => {
  return yearOfSelectedWeek.value?.weeks.find(w => w.idxInLife === props.weekNum)
})

const daysExtended = ref<LifeDayExtended[]>([])

async function reloadDays() {
  daysExtended.value = selectedWeek.value
      ? await loadDays(selectedWeek.value)
      : []
}

watch(selectedWeek, reloadDays, {immediate: true})

function onDayClick(day: LifeDayExtended) {
  openModal(ModalKey.JOURNAL)
}

</script>

<template>
  <div class="weekTitle">
    {{ dateFormatDayMonth(selectedWeek.starts) }} - {{ dateFormatDayMonth(selectedWeek.ends) }}
    {{ dateFormatYear(selectedWeek.ends) }}
  </div>
  <div class="container weekContainer">
    <span
        class="item"
        :class="{
          itemActive: day.state === DayState.CURRENT,
          itemSpent: day.state === DayState.SPENT
        }"
        v-for="day in daysExtended"
        @click="onDayClick(day)"
    >
        {{ day.label }}
    </span>
  </div>
</template>
