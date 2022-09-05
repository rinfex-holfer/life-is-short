import {createRouter, createWebHistory, Router} from "vue-router";
import {appRoutes} from "./app-routes";

let appRouter: Router | null = null

export function createAppRouter() {
    appRouter = createRouter({
        history: createWebHistory(),
        routes: appRoutes
    })

    return appRouter
}


export function getAppRouter(): Router {
    if (!appRouter) throw Error('trying to use router before initialization')

    return appRouter
}