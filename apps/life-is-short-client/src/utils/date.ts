import {add, differenceInYears, format, formatDistanceToNowStrict,} from 'date-fns'
import {getLocale} from "./locale";

export function getYearsLeft(dateOfBirth: Date, lifespanInYears: number): string {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears})
    return formatDistanceToNowStrict(dateOfDeath, {unit: "year", locale: getLocale()})
}

export function getProductiveYearsLeft(dateOfBirth: Date, lifespanInYears: number): string {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears - 15})
    return formatDistanceToNowStrict(dateOfDeath, {unit: "year", locale: getLocale()})
}

export function getYearsSpent(dateOfBirth: Date): string {
    return formatDistanceToNowStrict(dateOfBirth, {unit: "year", locale: getLocale()})
}

export function getYearsSpentNum(dateOfBirth: Date): number {
    return differenceInYears(new Date(), dateOfBirth)
}

export function dateFormatNum(date: Date) {
    return format(date, 'dd.MM.yyyy')
}

export function dateFormatDayShort(date: Date) {
    return format(date, "eeeeee", {locale: getLocale()})
}

export function dateFormatDayOfMonth(date: Date) {
    return format(date, "d", {locale: getLocale()})
}

export function dateFormatDayMonth(date: Date) {
    return format(date, 'dd MMMM', {locale: getLocale()})
}

export function dateFormatYear(date: Date) {
    return format(date, 'yyyy', {locale: getLocale()})
}

export function dateFormatMonthYear(date: Date) {
    return format(date, 'LLLL yyyy', {locale: getLocale()})
}