import {ModalKey} from "./modal-key";
import {routerTo} from "../../router/app-router-utils";

export function openModal(key: ModalKey) {
    return routerTo({ query: {popup: key}})
}