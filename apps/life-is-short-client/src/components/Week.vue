<script setup lang="ts">
import { currentTime, lifeYearsInWeeks } from "../store";
import { computed } from "vue";
import {
    dateFormatDayMonth,
    dateFormatDayShort,
    dateFormatNum,
    dateFormatYear,
} from "../utils/date";
import { endOfDay, isAfter, isSameDay } from "date-fns";
import { getDaysOfWeek } from "../utils/calendars";

const props = defineProps<{
    weekIdxInLife: number;
}>();

const yearOfSelectedWeek = computed(() =>
    lifeYearsInWeeks.value.find(
        year =>
            year.weeks[0].idxInLife <= props.weekIdxInLife &&
            year.weeks[year.weeks.length - 1].idxInLife >= props.weekIdxInLife
    )
);

const selectedWeek = computed(() => {
    return yearOfSelectedWeek.value?.weeks.find(w => w.idxInLife === props.weekIdxInLife);
});

const days = computed<Date[]>(() => {
    return selectedWeek.value ? getDaysOfWeek(selectedWeek.value) : [];
});

const currentTimeVal = computed<Date>(() => currentTime.value);
</script>

<template>
    <div class="weekTitle">
        {{ dateFormatDayMonth(days[0]) }} - {{ dateFormatDayMonth(days[6]) }}
        {{ dateFormatYear(days[6]) }}
    </div>
    <div class="container weekContainer">
        <span
            v-for="day in days"
            class="item"
            :class="{
                itemActive: isSameDay(currentTimeVal, day),
                itemSpent: isAfter(currentTimeVal, endOfDay(day)),
            }"
        >
            {{ dateFormatDayShort(day) }}
            <br />
            {{ dateFormatNum(day) }}
        </span>
    </div>
</template>

<style scoped>
.item {
    margin: 10px;
    border: 1px solid black;
}

.itemSpent {
    opacity: var(--spent-figure-opacity);
}

.itemActive {
    font-weight: bold;
    outline: 1px solid black;
}
</style>
