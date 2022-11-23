import {LangKey} from "../utils/locale";

export type WeekDayIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type WeekFullOfDays = [Date,Date,Date,Date,Date,Date,Date];

export type User = {
    id: string,
    name: string
    dateOfBirth: string
    expectedLifespan: number // in years
    locale: LangKey
}

export type YearWeekLifeCalendar = YearInLifeWeeks[]
export type YearMonthLifeCalendar = YearInLifeMonths[]

export type YearInLifeWeeks = {
    idxInLife: number
    startYear: number
    endYear: number
    weeks: LifeWeek[]
}

export type YearInLifeMonths = {
    idxInLife: number
    startYear: number
    endYear: number
    months: LifeMonth[]
}

export type LifeWeek = {
    idxInYear: number
    idxInLife: number
    starts: Date,
    ends: Date,
}

export type LifeMonth = {
    year: number
    monthIdxInCalendarYear: number
    monthIdxInLifeYear: number
    monthIdxInLife: number
    startDay: Date // 1st day of month or birthday
    endDay: Date // last day of a month or a day before birthday
    isFirstPartial?: boolean
    isLastPartial?: boolean
}

export type CalendarMonth = {
    year: number
    monthIdx: number
}

export type LifeDay = {
    timestamp: string
    smile?: string
    color?: string
}

type Post = {
    id: string
    userId: string,
    timestamp: string,
    title?: string
    body: string
}

export type LifeStage = {
    fromTo: [number, number]
    color: string
}

type DbTables = {
    users: {
        userId: string
        name: string
        dateOfBirth: string
        expectedLifespan: number
        locale: LangKey
    },
    days: {
        userId: string
        timestamp: string // simplified? Like "12-03-2012"
        smile?: string
        color?: string
    },
    posts: {
        id: string
        userId: string,
        timestamp: string,
        title?: string
        body: string
    }
}

interface Api {
    getDays: (firstDay: string, lastDay: string) => LifeDay[]
    getPosts: (firstDay: string, lastDay: string) => Post[]
}