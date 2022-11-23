import {
    WeekDayIdx,
    LifeMonth,
    LifeWeek,
    YearMonthLifeCalendar,
    YearWeekLifeCalendar,
    WeekFullOfDays,
} from "../domain";
import {
    add,
    addDays,
    addYears,
    endOfDay,
    getDate,
    getDay as getDayFns,
    getDaysInMonth,
    getMonth,
    getWeek,
    getYear,
    isAfter,
    isBefore,
    isEqual,
    isMonday,
    isSameDay,
    isSunday,
    nextDay,
    startOfDay,
    subDays,
} from "date-fns";

export function getWeekDay(date: Date) {
    return fixDay(getDayFns(date));
}

/** date-fns makes Sunday day 0, but I want Monday to be day 0 and Sunday day 6 */
function fixDay(day: WeekDayIdx): WeekDayIdx {
    if (day === 0) return 6;
    return (day - 1) as WeekDayIdx;
}

export function createCalendarYearsWithWeeks(
    dateOfBirth: Date,
    lifespanInYears: number
): YearWeekLifeCalendar {
    const dayOfBirth = getDate(dateOfBirth);
    const dateOfDeath = add(dateOfBirth, { years: lifespanInYears });
    const yearOfBirth = getYear(dateOfBirth);
    const yearOfDeath = getYear(dateOfDeath);

    let date = dateOfBirth;
    let weekInLife = 1;
    let currentWeek = getWeek(date);
    let currentYear = yearOfBirth;

    const bornInFirstDayOfMonth = dayOfBirth === 1;
    const lifeYearEqualsCalendarYear = bornInFirstDayOfMonth && getMonth(dateOfBirth) === 0;

    let week: LifeWeek = {
        idxInYear: currentWeek,
        idxInLife: weekInLife,
        starts: date,
        ends: nextDay(date, 0),
    };
    const calendar: YearWeekLifeCalendar = [
        {
            startYear: currentYear,
            endYear: lifeYearEqualsCalendarYear ? currentYear : currentYear + 1,
            idxInLife: yearOfBirth,
            weeks: [week],
        },
    ];

    while (isBefore(date, dateOfDeath)) {
        const nextDate = add(date, { days: 1 });
        const weekOfNextDate = getWeek(nextDate);

        const lastYear = calendar[calendar.length - 1];

        if (weekOfNextDate !== currentWeek) {
            currentWeek = weekOfNextDate;
            weekInLife++;
            week = {
                starts: nextDate,
                ends: addDays(nextDate, 6),
                idxInLife: weekInLife,
                idxInYear: currentWeek,
            };

            if (currentWeek !== 1) {
                lastYear.weeks.push(week);
            } else {
                currentYear++;
                calendar.push({
                    idxInLife: currentYear,
                    weeks: [week],
                    startYear: currentYear,
                    endYear: lifeYearEqualsCalendarYear ? currentYear : currentYear + 1,
                });
            }
        }
        date = nextDate;
    }

    return calendar;
}

export function createLifeYearsWithWeeks(
    dateOfBirth: Date,
    lifespanInYears: number
): YearWeekLifeCalendar {
    let weekStartDay = startOfDay(dateOfBirth);
    let yearOrBirth = getYear(dateOfBirth);
    const dayOfBirth = getDate(dateOfBirth);

    let weekInLife = 1;
    const calendar: YearWeekLifeCalendar = [];
    let nextBday = addYears(dateOfBirth, 1);
    let dayBeforNextBday = subDays(nextBday, 1);

    const bornInFirstDayOfMonth = dayOfBirth === 1;
    const lifeYearEqualsCalendarYear = bornInFirstDayOfMonth && getMonth(dateOfBirth) === 0;

    for (let yearInLifeIdx = 0; yearInLifeIdx < lifespanInYears; yearInLifeIdx++) {
        const year = yearOrBirth + yearInLifeIdx;

        calendar.push({
            idxInLife: yearInLifeIdx,
            weeks: [],
            startYear: year,
            endYear: lifeYearEqualsCalendarYear ? year : year + 1,
        });

        for (let i = 1; i <= 53; i++) {
            const nextSunday = isSunday(weekStartDay) // if week starts on Sunday (it might happen after bDay), it is 1 day long
                ? weekStartDay
                : nextDay(weekStartDay, 0);

            let endDate = isAfter(nextSunday, dayBeforNextBday) ? dayBeforNextBday : nextSunday;

            calendar[calendar.length - 1].weeks.push({
                idxInYear: i,
                idxInLife: weekInLife++,
                starts: startOfDay(weekStartDay),
                ends: endOfDay(endDate),
            });

            weekStartDay = addDays(endDate, 1);
        }
        nextBday = addYears(nextBday, 1);
        dayBeforNextBday = subDays(nextBday, 1);
    }

    return calendar;
}

export function getDaysOfWeek(week: LifeWeek): WeekFullOfDays {
    const days: Date[] = [];
    const lifeWeekStartDayIdx = getWeekDay(week.starts);

    for (let dayIdx = 0; dayIdx <= 6; dayIdx++) {
        days.push(subDays(week.starts, lifeWeekStartDayIdx - dayIdx));
    }

    return days as WeekFullOfDays;
}

export function createLifeYearsWithMonths(
    dateOfBirth: Date,
    lifespanInYears: number
): YearMonthLifeCalendar {
    let monthInLife = 0;
    let monthIdxInCalendarYear = getMonth(dateOfBirth);
    let year = getYear(dateOfBirth);
    const dayOfBirth = getDate(dateOfBirth);

    // each life year has 13 months - 11 full ones and 2 partial. Example:
    // if a birthday is on 15 of November, life year looks like:
    // 15-30 dates of November (first partial), December -> October (11), 1-14 days of November (second partial).
    // The exception is when Birthday is on 1 day of any month
    const bornInFirstDayOfMonth = dayOfBirth === 1;

    const lifeYearEqualsCalendarYear = bornInFirstDayOfMonth && getMonth(dateOfBirth) === 0;

    const calendar: YearMonthLifeCalendar = [];

    for (let lifeYear = 0; lifeYear < lifespanInYears; lifeYear++) {
        calendar.push({
            startYear: year,
            endYear: lifeYearEqualsCalendarYear ? year : year + 1,
            idxInLife: lifeYear,
            months: [],
        });

        const monthsRow = calendar[calendar.length - 1].months;
        for (let i = 0; i <= 11; i++) {
            const isFirstPartialMonth = i === 0 && !bornInFirstDayOfMonth;
            const lifeMonth: LifeMonth = {
                monthIdxInLifeYear: i,
                monthIdxInLife: monthInLife,
                year,
                monthIdxInCalendarYear: monthIdxInCalendarYear,
                startDay: isFirstPartialMonth
                    ? dateOfBirth
                    : new Date(year, monthIdxInCalendarYear, 1),
                endDay: new Date(
                    year,
                    monthIdxInCalendarYear,
                    getDaysInMonth(monthIdxInCalendarYear)
                ),
            };
            if (isFirstPartialMonth) {
                lifeMonth.isFirstPartial = true;
            }
            monthsRow.push(lifeMonth);

            monthIdxInCalendarYear++;
            if (monthIdxInCalendarYear === 12) {
                monthIdxInCalendarYear = 0;
                year++;
            }

            monthInLife++;
        }

        const hasLastPartialMonth = !bornInFirstDayOfMonth;
        if (hasLastPartialMonth) {
            monthsRow.push({
                monthIdxInLifeYear: 12,
                monthIdxInLife: monthInLife,
                year,
                monthIdxInCalendarYear: monthIdxInCalendarYear,
                startDay: new Date(year, monthIdxInCalendarYear, 1),
                endDay: new Date(year, monthIdxInCalendarYear, dayOfBirth - 1),
                isLastPartial: true,
            });
        }
    }

    return calendar;
}

export function createLifeMonths(
    dateOfBirth: Date,
    lifespanInYears: number
): YearMonthLifeCalendar {
    let monthInLife = 0;
    let monthIdxInCalendarYear = getMonth(dateOfBirth);
    let year = getYear(dateOfBirth);
    const dayOfBirth = getDate(dateOfBirth);

    // each life year has 13 months - 11 full ones and 2 partial. Example:
    // if a birthday is on 15 of November, life year looks like:
    // 15-30 dates of November (first partial), December -> October (11), 1-14 days of November (second partial).
    // The exception is when Birthday is on 1 day of any month
    const bornInFirstDayOfMonth = dayOfBirth === 1;

    const lifeYearEqualsCalendarYear = bornInFirstDayOfMonth && getMonth(dateOfBirth) === 0;

    const calendar: YearMonthLifeCalendar = [];

    for (let lifeYear = 0; lifeYear < lifespanInYears; lifeYear++) {
        calendar.push({
            startYear: year,
            endYear: lifeYearEqualsCalendarYear ? year : year + 1,
            idxInLife: lifeYear,
            months: [],
        });

        const monthsRow = calendar[calendar.length - 1].months;
        for (let i = 0; i <= 11; i++) {
            const isFirstPartialMonth = i === 0 && !bornInFirstDayOfMonth;
            const lifeMonth: LifeMonth = {
                monthIdxInLifeYear: i,
                monthIdxInLife: monthInLife,
                year,
                monthIdxInCalendarYear: monthIdxInCalendarYear,
                startDay: isFirstPartialMonth
                    ? dateOfBirth
                    : new Date(year, monthIdxInCalendarYear, 1),
                endDay: new Date(
                    year,
                    monthIdxInCalendarYear,
                    getDaysInMonth(monthIdxInCalendarYear)
                ),
            };
            if (isFirstPartialMonth) {
                lifeMonth.isFirstPartial = true;
            }
            monthsRow.push(lifeMonth);

            monthIdxInCalendarYear++;
            if (monthIdxInCalendarYear === 12) {
                monthIdxInCalendarYear = 0;
                year++;
            }

            monthInLife++;
        }

        const hasLastPartialMonth = !bornInFirstDayOfMonth;
        if (hasLastPartialMonth) {
            monthsRow.push({
                monthIdxInLifeYear: 12,
                monthIdxInLife: monthInLife,
                year,
                monthIdxInCalendarYear: monthIdxInCalendarYear,
                startDay: new Date(year, monthIdxInCalendarYear, 1),
                endDay: new Date(year, monthIdxInCalendarYear, dayOfBirth - 1),
                isLastPartial: true,
            });
        }
    }

    return calendar;
}
