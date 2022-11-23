import Journal from "../Jornal.vue";
import MonthModal from "./modals/MonthModal.vue";
import WeekModal from "./modals/WeekModal.vue";
import { VueElement } from "vue";

export enum ModalKey {
    JOURNAL = "journal",
    MONTH = "month",
    WEEK = "week",
}

export type ModalProps = {
    [ModalKey.MONTH]: { year: string; monthIdx: string };
    [ModalKey.WEEK]: { weekIdx: string };
};

const modalMap: Record<ModalKey, VueElement> = {
    [ModalKey.JOURNAL]: Journal,
    [ModalKey.MONTH]: MonthModal,
    [ModalKey.WEEK]: WeekModal,
};

export function getModalComponentByKey(key: string): VueElement | null {
    return modalMap[key as ModalKey] || null;
}
