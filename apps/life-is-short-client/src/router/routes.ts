import PageMain from "../pages/PageMain.vue";
import PageMonth from "../pages/PageMonth.vue";
import PageLifeInMonths from "../pages/PageLifeInMonths/PageLifeInMonths.vue";
import PageLifeInWeeks from "../pages/PageLifeInWeeks.vue";
import { RouteRecordRaw } from "vue-router";

export enum appRouteNames {
    MAIN = "MAIN",
    MONTH = "MONTH",
    LIFE_IN_WEEKS = "LIFE_IN_WEEKS",
    LIFE_IN_MONTHS = "LIFE_IN_MONTHS",
}

export const routes = [
    {
        path: "/",
        name: appRouteNames.MAIN,
        component: PageMain,
    },
    {
        path: "/life-in-weeks",
        name: appRouteNames.LIFE_IN_WEEKS,
        component: PageLifeInWeeks,
    },
    {
        path: "/life-in-months",
        name: appRouteNames.LIFE_IN_MONTHS,
        component: PageLifeInMonths,
    },
    {
        path: "/months/:monthNum",
        name: appRouteNames.MONTH,
        component: PageMonth,
    },
] as RouteRecordRaw[];
