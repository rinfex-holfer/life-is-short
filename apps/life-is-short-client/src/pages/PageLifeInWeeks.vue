<script lang="ts" setup>
import {dateFormatNum} from "../utils/date";
import {lifeYearsInWeeks, currentLifeYearIdx, currentLifeWeekIdx} from "../store";
import {reactive, ref} from "vue";
import {LifeStage, LifeWeek, YearInLifeWeeks} from "../domain";
import Week from "../components/Week.vue";
import AppNavigation from "../components/AppNavigation/AppNavigation.vue"

const stages: LifeStage[] = [
  {fromTo: [0, 12], color: "#f6d5b1"},
  {fromTo: [13, 19], color: "#dcb3b8"},
  {fromTo: [20, 34], color: "#eba7ce"},
  {fromTo: [35, 49], color: "#e590d1"},
  {fromTo: [50, 69], color: "#6bcced"},
  {fromTo: [70, 9999], color: "#7bf088"},
]
function getYearColor(year: number) {
  return stages.find(s => s.fromTo[0] <= year && s.fromTo[1] >= year)?.color || "black"
}

const hoveredWeek = ref<null | string>(null)
const hoveredYear = ref<null | number>(null)
const selectedWeek = ref<number | null>(null)
const weekCoord = reactive<{x: number, y: number}>({x: 0, y: 0})

const showHoveredWeek = (week: LifeWeek) =>
  hoveredWeek.value = `${dateFormatNum(week.starts)} - ${dateFormatNum(week.ends)} | № в году:${week.idxInYear} | № в жизни:${week.idxInLife}`
const hideYear = () => hoveredWeek.value = null
const onYearHovered = (year: YearInLifeWeeks) => hoveredYear.value = year.idxInLife

const selectWeek = (week: LifeWeek, year: YearInLifeWeeks, e: MouseEvent) => {
  const row: HTMLElement | null = document.querySelector(`[data-year-num="${year.idxInLife}"]`)
  weekCoord.x = e.target ? (e.target as HTMLElement).offsetLeft + 3 : 0
  weekCoord.y = row ? (row.offsetTop - 20) : 0
  selectedWeek.value = week.idxInLife
}
const deselectWeek = () => selectedWeek.value = null

</script>

<template>
  <AppNavigation/>
<!--  <div class="selectedWeek">{{hoveredDate ? hoveredDate : '-'}}</div>-->
  <div v-on:mouseleave="hideYear" class="life">
    <div
        class="lifeRow"
        :class="{lifeRowHovered: hoveredYear === year.idxInLife}"
        :style="{background: getYearColor(year.idxInLife)}"
        v-for="year in lifeYearsInWeeks"
        :data-year-num="year.idxInLife"
        @mouseover="onYearHovered(year)"
    >

        <span
            class="life-row-year"
            :class="{'life-row-year--spent': year.idxInLife < currentLifeYearIdx}"
        >
          {{ year.idxInLife }}
        </span>

        <span
          v-for="week in year.weeks"
          class="life-item life-item--small"
          :class="{
            'life-item--active': week.idxInLife === currentLifeWeekIdx,
            'life-item--spent': week.idxInLife < currentLifeWeekIdx,
            'life-item--selected': week.idxInLife === selectedWeek
          }"
          @mouseover="showHoveredWeek(week)"
          @click="selectWeek(week, year, $event)"
        >
        </span>
    </div>
  </div>
</template>

<style scoped>
.life {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
}

.lifeRow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  transition: all 0.3s;
}

.lifeRow .life-item {
  cursor: pointer;
  transition: all 0.15s;
}
.lifeRowHovered .life-item {
  transform: scale(2);
}

.life-row-year {
  width: 20px
}

.life-row-year--spent {
  color: grey;
}
</style>