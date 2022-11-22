import {describe, expect, it} from "vitest";
import {createLifeYearsWithWeeks} from "./calendars";
import {addYears, endOfDay, subDays} from "date-fns";

const leapYear = 2000
const nonLeapYear = 2001

describe("lifeYearsWithWeeks calendar", () => {
    const startYear = nonLeapYear
    const startMonth = 0
    const startDate = 1
    const lifespanInYears = 100

    const dateOfBirth = new Date(startYear, startMonth, startDate)
    const yearInWeeks = createLifeYearsWithWeeks(dateOfBirth, lifespanInYears)

    it("years amount equals lifespan", () => {
        expect(yearInWeeks.length).eq(lifespanInYears)
    })

    it("each life year has 53 weeks, ends the day before next b-day", () => {
        yearInWeeks.forEach((year, i) => {
            expect(year.idxInLife).eq(i+1)
            expect(year.weeks.length).eq(53)
            expect(year.weeks[52].idxInYear).eq(53)
            expect(year.weeks[52].idxInLife).eq(i*53 + 53)

            const lastDayExpected = endOfDay(subDays(addYears(dateOfBirth, lifespanInYears), 1))
            const lastDayByCalendar = yearInWeeks[lifespanInYears-1].weeks[52].ends
            expect(lastDayByCalendar.toString()).eq(lastDayExpected.toString())
        })
    })
})