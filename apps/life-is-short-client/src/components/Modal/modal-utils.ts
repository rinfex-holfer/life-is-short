import { ModalKey, ModalProps } from "./modal-config";
import { removeQueryFromCurrentLocation, routerTo } from "../../router/app-router";

export function openModal<T extends Exclude<ModalKey, keyof ModalProps>>(key: T): void;
export function openModal<T extends keyof ModalProps>(key: T, props: ModalProps[T]): void;
export function openModal<T extends keyof ModalProps>(key: T, props?: ModalProps[T]) {
    if (props) {
        routerTo({ query: { modal: key, ...props } });
    } else {
        routerTo({ query: { modal: key } });
    }
}

export function closeModal() {
    removeQueryFromCurrentLocation(["modal"]);
}
