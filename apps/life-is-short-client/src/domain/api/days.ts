import {LifeDay} from "../index";
import {pause} from "../../utils/pause";

const daysMock = [
    // {timestamp: '28-03-2022'},
    // {timestamp: '29-03-2022'},
    {timestamp: '30-03-2022', color: "00ff00"},
    // {timestamp: '31-03-2022'},
    {timestamp: '01-04-2022', color: "0000ff"},
    // {timestamp: '02-04-2022'},
    // {timestamp: '03-04-2022'},
]

export async function getDays(startDay: string, endDay: string): Promise<LifeDay[]> {
    const res = await fetch("http://localhost:5000/api/days")
    const resJson = await res.json()
    // await pause(100)

    return Promise.resolve(daysMock)
}