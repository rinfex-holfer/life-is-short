import Journal from "../Jornal.vue";
import MonthModal from "./modals/MonthModal.vue";
import {VueElement} from "vue";

export enum ModalKey {
    JOURNAL = "journal",
    MONTH = "month",
}

export type ModalProps = {
    [ModalKey.MONTH]: {year: string, monthIdx: string},
}

const modalMap: Record<ModalKey, VueElement> = {
    [ModalKey.JOURNAL]: Journal,
    [ModalKey.MONTH]: MonthModal,
};

export function getModalComponentByKey(key: string): VueElement | null {
    return modalMap[key as ModalKey] || null
}