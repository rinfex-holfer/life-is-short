<script lang="ts" setup>
import { dateFormatNum } from "../utils/date";
import { currentLifeWeekIdx, currentLifeYearIdx, lifeYearsInWeeks } from "../store";
import { ref } from "vue";
import { LifeStage, LifeWeek, YearInLifeWeeks } from "../domain";
import AppNavigation from "../components/AppNavigation/AppNavigation.vue";
import { openModal } from "../components/Modal/modal-utils";
import { ModalKey } from "../components/Modal/modal-config";

const stages: LifeStage[] = [
    { fromTo: [0, 12], color: "#f6d5b1" },
    { fromTo: [13, 19], color: "#dcb3b8" },
    { fromTo: [20, 34], color: "#eba7ce" },
    { fromTo: [35, 49], color: "#e590d1" },
    { fromTo: [50, 69], color: "#6bcced" },
    { fromTo: [70, 9999], color: "#7bf088" },
];
function getYearColor(year: number) {
    return stages.find(s => s.fromTo[0] <= year && s.fromTo[1] >= year)?.color || "black";
}

const hoveredWeek = ref<null | string>(null);
const hoveredYear = ref<null | number>(null);
const selectedWeek = ref<number | null>(null);

const showHoveredWeek = (week: LifeWeek) =>
    (hoveredWeek.value = `${dateFormatNum(week.starts)} - ${dateFormatNum(week.ends)} | № в году:${
        week.idxInYear
    } | № в жизни:${week.idxInLife}`);
const hideYear = () => (hoveredWeek.value = null);
const onYearHovered = (year: YearInLifeWeeks) => (hoveredYear.value = year.idxInLife);

const selectWeek = (week: LifeWeek) => {
    // selectedWeek.value = week.idxInLife
    openModal(ModalKey.WEEK, { weekIdx: "" + week.idxInLife });
};
const deselectWeek = () => (selectedWeek.value = null);

console.log(currentLifeWeekIdx);
</script>

<template>
    <AppNavigation />
    <div class="selectedWeek">{{ hoveredWeek || "-" }}</div>
    <div class="life" @mouseleave="hideYear">
        <div
            v-for="year in lifeYearsInWeeks"
            class="lifeRow"
            :class="{ lifeRowHovered: hoveredYear === year.idxInLife }"
            :style="{ background: getYearColor(year.idxInLife) }"
            :data-year-num="year.idxInLife"
            @mouseover="onYearHovered(year)"
        >
            <span
                class="life-row-year"
                :class="{ 'life-row-year--spent': year.idxInLife < currentLifeYearIdx }"
            >
                {{ year.idxInLife }}
            </span>

            <span
                v-for="week in year.weeks"
                class="life-item life-item--small"
                :class="{
                    'life-item--active': week.idxInLife === currentLifeWeekIdx,
                    'life-item--spent': week.idxInLife < currentLifeWeekIdx,
                    'life-item--selected': week.idxInLife === selectedWeek,
                }"
                @mouseover="showHoveredWeek(week)"
                @click="selectWeek(week)"
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
    width: 20px;
}

.life-row-year--spent {
    color: grey;
}
</style>
