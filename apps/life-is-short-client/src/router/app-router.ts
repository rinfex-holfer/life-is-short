import {createRouter, createWebHistory, RouteLocationNormalized, RouteLocationRaw, Router} from "vue-router";
import {routes} from "./routes";

let appRouter: Router | null = null

export function createAppRouter() {
    appRouter = createRouter({
        history: createWebHistory(),
        routes: routes
    })

    return appRouter
}


export function getAppRouter(): Router {
    if (!appRouter) throw Error('trying to use router before initialization')

    return appRouter
}

export function routerTo(route: RouteLocationRaw) {
    return getAppRouter().push(route)
}

export function getCurrentLocation(): RouteLocationNormalized {
    return getAppRouter().currentRoute.value
}

export function filterLocationQuery(to: RouteLocationNormalized, keysToRemove: string[]) {
    const newQuery = {...to.query}

    keysToRemove.forEach(key => delete newQuery[key])

    return {query: newQuery}
}

export function removeQueryFromCurrentLocation(keysToRemove: string[]) {
    routerTo(filterLocationQuery(getCurrentLocation(), keysToRemove));
}

export function getCurrentQuery() {
    return getCurrentLocation().query
}