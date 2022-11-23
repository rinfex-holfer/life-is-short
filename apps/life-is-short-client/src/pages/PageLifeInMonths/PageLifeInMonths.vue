<script lang="ts" setup>
import { dateFormatMonthYear } from "../../utils/date";
import {
    currentLifeMonth,
    currentLifeMonthIdx,
    currentLifeYearIdx,
    lifeYearsInMonths,
} from "../../store";
import { reactive, ref } from "vue";
import { LifeMonth, LifeStage, YearInLifeMonths } from "../../domain";
import AppNavigation from "../../components/AppNavigation/AppNavigation.vue";
import { openModal } from "../../components/Modal/modal-utils";
import { ModalKey } from "../../components/Modal/modal-config";

const stages: LifeStage[] = [
    { fromTo: [0, 12], color: "rgba(246,213,177,0.5)" },
    { fromTo: [13, 20], color: "rgba(220,179,184,0.5)" },
    { fromTo: [21, 34], color: "rgba(235,167,206,0.5)" },
    { fromTo: [35, 50], color: "rgba(229,144,209,0.5)" },
    { fromTo: [51, 70], color: "rgba(107,204,237,0.5)" },
    { fromTo: [71, 9999], color: "rgba(123,240,136,0.5)" },
];
function getYearColor(year: number) {
    return stages.find(s => s.fromTo[0] <= year && s.fromTo[1] >= year)?.color || "black";
}

const hoveredMonth = ref<null | string>(null);
const hoveredYear = ref<null | number>(null);
const selectedMonth = ref<number | null>(null);

const showHoveredMonth = (month: LifeMonth) =>
    (hoveredMonth.value = `${dateFormatMonthYear(
        new Date(month.year, month.monthIdxInCalendarYear)
    )} | № в жизни:${month.monthIdxInLife}`);
const hideYear = () => {
    hoveredYear.value = null;
    hoveredMonth.value = null;
};
const onYearHovered = (year: YearInLifeMonths) => (hoveredYear.value = year.idxInLife);

const selectMonth = (month: LifeMonth, e: MouseEvent) => {
    openModal(ModalKey.MONTH, {
        monthIdx: "" + month.monthIdxInCalendarYear,
        year: "" + month.year,
    });
};

function getIsSpentYear(year: YearInLifeMonths) {
    return year.idxInLife < currentLifeYearIdx.value;
}

function getIsCurrentMonth(month: LifeMonth) {
    return (
        month.monthIdxInLife === currentLifeMonthIdx.value &&
        month.monthIdxInLifeYear === currentLifeMonth.value.monthIdxInLifeYear
    );
}

function getIsSpentMonth(month: LifeMonth) {
    return month.monthIdxInLife < currentLifeMonthIdx.value;
}
</script>

<template>
    <AppNavigation />
    <div class="selected-month">{{ hoveredMonth ? hoveredMonth : "-" }}</div>
    <div class="full-page-container">
        <div class="life-in-months" @mouseleave="hideYear">
            <div
                v-for="year in lifeYearsInMonths"
                class="life-in-months__row"
                :class="{ 'life-row--hovered': hoveredYear === year.idxInLife }"
                :style="{ background: getYearColor(year.idxInLife) }"
                :data-year-num="year.idxInLife"
                @mouseover="onYearHovered(year)"
            >
                <span
                    class="life-row-year"
                    :class="{ 'life-row-year--spent': getIsSpentYear(year) }"
                >
                    {{ year.idxInLife }}
                </span>

                <span
                    v-for="month in year.months"
                    class="life-item life-item--medium life-in-months__item"
                    :class="{
                        'life-item--active': getIsCurrentMonth(month),
                        'anim-pulse': getIsCurrentMonth(month),
                        'life-item--spent': getIsSpentMonth(month),
                        'life-item--selected': month.monthIdxInLife === selectedMonth,
                        'life-item--half-left': month.isLastPartial,
                        'life-item--half-right': month.isFirstPartial,
                    }"
                    @mouseover="showHoveredMonth(month)"
                    @click="selectMonth(month, $event)"
                >
                    <!--          {{dateFormatMonthYear(new Date(month.year, month.month))}}-->
                </span>
            </div>
        </div>
    </div>
</template>

<style src="./PageLifeInMonthsStyles.less" scoped></style>
