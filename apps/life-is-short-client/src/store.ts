import {computed, Ref, ref, watchEffect} from "vue";
import {LifeMonth, LifeWeek, User, YearMonthLifeCalendar, YearWeekLifeCalendar} from "./domain";
import {createLifeYearsWithMonths, createLifeYearsWithWeeks} from "./utils/calendars";
import {getYearsSpentNum} from "./utils/date";
import {getMonth, getYear, isAfter} from "date-fns";
import {LangKey} from "./utils/locale";

export const currentUser = ref<User>({
    id: "qwerty",
    name: "Геннадий",
    dateOfBirth: "1990-11-26T23:00:00.000Z",
    // name: "Федор Федорович",
    // dateOfBirth: new Date(2000, 0, 1),
    expectedLifespan: 70,
    locale: LangKey.RU,
})

export const currentTime = ref<Date>(new Date())

export const lifeInMonths = computed(() => {
    const birthDate = new Date(currentUser.value.dateOfBirth);
    return createLifeYearsWithWeeks(birthDate, currentUser.value.expectedLifespan)
})

export const lifeYearsInWeeks = computed(() => {
    const birthDate = new Date(currentUser.value.dateOfBirth);
    return createLifeYearsWithWeeks(birthDate, currentUser.value.expectedLifespan)
})

export const lifeYearsInMonths = computed<YearMonthLifeCalendar>(() => {
    const birthDate = new Date(currentUser.value.dateOfBirth);
    return createLifeYearsWithMonths(birthDate, currentUser.value.expectedLifespan)
})

export const currentLifeYearIdx = computed(() => {
    return getYearsSpentNum(new Date(currentUser.value.dateOfBirth))
})

export const currentLifeWeek = computed<LifeWeek>(() => {
    const now = currentTime.value

    const week = lifeYearsInWeeks.value[currentLifeYearIdx.value]
        .weeks
        .find(week => !isAfter(week.starts, now) && !isAfter(now, week.ends))

    if (!week) {
        const lastYear = lifeYearsInWeeks.value[lifeYearsInWeeks.value.length - 1]
        return lastYear.weeks[lastYear.weeks.length - 1]
    }

    return week
})

export const currentLifeMonth = computed<LifeMonth>(() => {
    const now = currentTime.value
    const currentMonthNum = getMonth(now)
    const currentYearNum = getYear(now);

    const currentLifeYearIndex = currentLifeYearIdx.value
    const month = lifeYearsInMonths.value[currentLifeYearIndex]
        .months
        .find(month => month.monthIdxInCalendarYear === currentMonthNum && month.year === currentYearNum)

    if (!month) {
        console.error("no current life month")
        const lastYear = lifeYearsInMonths.value[lifeYearsInMonths.value.length - 1]
        return lastYear.months[lastYear.months.length - 1]
    }

    return month
})

export const currentLifeWeekIdx = computed(() => currentLifeWeek.value.idxInLife)

export const currentLifeMonthIdx = computed(() =>  currentLifeMonth.value.monthIdxInLife)