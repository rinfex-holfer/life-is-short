import {RouteLocationNormalized, RouteLocationRaw} from "vue-router";
import {getAppRouter} from "./app-router";

export function removeRouterQueries(to: RouteLocationNormalized, keysToRemove: string[]) {
    const newQuery = {...to.query}

    keysToRemove.forEach(key => delete newQuery[key])

    return {query: newQuery}
}

export function routerTo(route: RouteLocationRaw) {
    return getAppRouter().push(route)
}