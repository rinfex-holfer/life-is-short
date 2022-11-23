import { LifeDay, LifeWeek } from "../index";
import { getDays } from "../api/days";
import { addDays, format, isAfter, isBefore, isSameDay } from "date-fns";
import { currentTime } from "../../store";
import { getLocale } from "../../utils/locale";

export enum DayState {
    SPENT,
    UNSPENT,
    CURRENT,
}

export type LifeDayExtended = LifeDay & {
    state: DayState;
    label: string;
};

function getDayState(day: Date, today: Date): DayState {
    if (isSameDay(today, day)) return DayState.CURRENT;
    else if (isBefore(day, today)) return DayState.SPENT;
    return DayState.UNSPENT;
}

export async function loadDays(week: LifeWeek): Promise<LifeDayExtended[]> {
    let days: LifeDay[] = [];
    try {
        days = await getDays(week.starts.toISOString(), week.ends.toISOString());
    } catch (e) {
        return [];
    }

    const loadedDaysMap = days.reduce((map, nextDay) => {
        map.set(nextDay.timestamp, nextDay);
        return map;
    }, new Map<string, LifeDay>());

    const daysExtended = [] as LifeDayExtended[];

    let nextDay = week.starts;

    while (!isAfter(nextDay, week.ends)) {
        const timestamp = format(nextDay, "dd-MM-yyyy");
        const loadedDay = loadedDaysMap.get(timestamp) || {};
        const day: LifeDayExtended = {
            ...loadedDay,
            timestamp: format(nextDay, "dd-MM-yyyy"),
            state: getDayState(nextDay, currentTime.value),
            label: format(nextDay, "eeeeee", { locale: getLocale() }).toUpperCase(),
        };
        daysExtended.push(day);
        nextDay = addDays(nextDay, 1);
    }

    return daysExtended;
}
