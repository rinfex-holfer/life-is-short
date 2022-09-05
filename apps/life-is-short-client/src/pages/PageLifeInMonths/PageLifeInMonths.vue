<script lang="ts" setup>
import {dateFormatMonthYear} from "../../utils/date";
import {currentLifeMonthNumber, currLifeYear, lifeInMonths} from "../../store";
import {reactive, ref} from "vue";
import {LifeMonth, LifeStage, YearInLifeMonths} from "../../domain";
import Popup from "../../components/Popup.vue"
import AppNavigation from "../../components/AppNavigation/AppNavigation.vue"
import {routerTo} from "../../router/app-router-utils";
import {appRouteNames} from "../../router/app-routes";

const stages: LifeStage[] = [
  {fromTo: [0, 12], color: "rgba(246,213,177,0.5)"},
  {fromTo: [13, 20], color: "rgba(220,179,184,0.5)"},
  {fromTo: [21, 34], color: "rgba(235,167,206,0.5)"},
  {fromTo: [35, 50], color: "rgba(229,144,209,0.5)"},
  {fromTo: [51, 70], color: "rgba(107,204,237,0.5)"},
  {fromTo: [71, 9999], color: "rgba(123,240,136,0.5)"},
]
function getYearColor(year: number) {
  return stages.find(s => s.fromTo[0] <= year && s.fromTo[1] >= year)?.color || "black"
}

const hoveredMonth = ref<null | string>(null)
const hoveredYear = ref<null | number>(null)
const selectedMonth = ref<number | null>(null)
const monthCoord = reactive<{x: number, y: number}>({x: 0, y: 0})

const showHoveredMonth = (month: LifeMonth) =>
  hoveredMonth.value = `${dateFormatMonthYear(new Date(month.year, month.month))} | № в жизни:${month.numInLife}`
const hideYear = () => {
  hoveredYear.value = null
  hoveredMonth.value = null
}
const onYearHovered = (year: YearInLifeMonths) => hoveredYear.value = year.numInLife

const selectMonth = (month: LifeMonth, year: YearInLifeMonths, e: MouseEvent) => {
  routerTo({name: appRouteNames.MONTH, params: {monthNum: month.numInLife}})
  // routerTo("/calendar/month/"+month.numInLife)
  // const row: HTMLElement | null = document.querySelector(`[data-year-num="${year.numInLife}"]`)
  // monthCoord.x = e.target ? (e.target as HTMLElement).offsetLeft + 3 : 0
  // monthCoord.y = row ? (row.offsetTop - 20) : 0
  // selectedMonth.value = month.numInLife
}
const deselectMonth = () => selectedMonth.value = null

</script>

<template>
  <AppNavigation/>
<!--  <div class="selectedMonth">{{hoveredDate ? hoveredDate : '-'}}</div>-->
  <div class="full-page-container ">
    <div v-on:mouseleave="hideYear" class="life-in-months">
      <Popup
          v-if="selectedMonth !== null"
          :x="monthCoord.x"
          :y="monthCoord.y"
          :on-close="deselectMonth"
      >
      </Popup>

      <div
          v-for="year in lifeInMonths"
          class="life-in-months__row"
          :class="{'life-row--hovered': hoveredYear === year.numInLife}"
          :style="{background: getYearColor(year.numInLife)}"
          :data-year-num="year.numInLife"
          @mouseover="onYearHovered(year)"
      >

        <span
            class="life-row-year"
            :class="{'life-row-year--spent': year.numInLife < currLifeYear}"
        >
          {{year.numInLife}}
        </span>

        <span
            v-for="month in year.months"
            class="life-item life-item--medium life-in-months__item"
            :class="{
            'life-item--active': month.numInLife === currentLifeMonthNumber,
            'anim-pulse': month.numInLife === currentLifeMonthNumber,
            'life-item--spent': month.numInLife < currentLifeMonthNumber,
            'life-item--selected': month.numInLife === selectedMonth
          }"
            @mouseover="showHoveredMonth(month)"
            @click="selectMonth(month, year, $event)"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<style src="./PageLifeInMonthsStyles.less" scoped>

</style>