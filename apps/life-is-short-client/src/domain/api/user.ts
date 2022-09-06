import {User} from "../index";
import {LangKey} from "../../utils/locale";

export async function getUser(id: string): Promise<User> {
    const res = await fetch("http://localhost:5000/api/user")
    const resJson = await res.json()
    return resJson
}