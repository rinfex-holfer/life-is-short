import {computed, Ref, ref, watchEffect} from "vue";
import {LifeMonth, LifeWeek, User, YearMonthLifeCalendar, YearWeekLifeCalendar} from "./domain";
import {createLifeYearsWithMonths, createLifeYearsWithWeeks} from "./utils/calendars";
import {getYearsSpentNum} from "./utils/date";
import {getMonth, isAfter} from "date-fns";
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

export const lifeInWeeks = computed(() => {
    const birthDate = new Date(currentUser.value.dateOfBirth);
    return createLifeYearsWithWeeks(birthDate, currentUser.value.expectedLifespan)
})

export const lifeInMonths = computed<YearMonthLifeCalendar>(() => {
    const birthDate = new Date(currentUser.value.dateOfBirth);
    return createLifeYearsWithMonths(birthDate, currentUser.value.expectedLifespan)
})

export const currLifeYear = computed(() => {
    return getYearsSpentNum(new Date(currentUser.value.dateOfBirth)) + 1
})

export const currentLifeWeek = computed<LifeWeek>(() => {
    const now = new Date()

    const week = lifeInWeeks.value[currLifeYear.value-1]
        .weeks
        .find(week => !isAfter(week.starts, now) && !isAfter(now, week.ends))

    if (!week) {
        console.error("no current life week")
        const lastYear = lifeInWeeks.value[lifeInWeeks.value.length - 1]
        return lastYear.weeks[lastYear.weeks.length - 1]
    }

    return week
})

export const currentLifeMonth = computed<LifeMonth>(() => {
    const now = new Date()
    const currentMonthNum = getMonth(now)

    const month = lifeInMonths.value[currLifeYear.value-1]
        .months
        .find(month => month.month === currentMonthNum)

    if (!month) {
        console.error("no current life month")
        const lastYear = lifeInMonths.value[lifeInMonths.value.length - 1]
        return lastYear.months[lastYear.months.length - 1]
    }

    return month
})

export const currentLifeWeekNumber = computed(() => currentLifeWeek.value.numInLife)

export const currentLifeMonthNumber = computed(() =>  currentLifeMonth.value.numInLife)