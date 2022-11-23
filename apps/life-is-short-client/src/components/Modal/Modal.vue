<script lang="ts" setup>
import { RouteLocationNormalized, useRouter } from "vue-router";
import { getModalComponentByKey, ModalKey } from "./modal-config";
import { computed } from "vue";
import { filterLocationQuery } from "../../router/app-router";
import { closeModal } from "./modal-utils";

function filterInvalidModalRoutes(to: RouteLocationNormalized) {
    const modalKey = to.query.modal;
    const isModalKeyInvalid =
        typeof to.query.modal !== "string" || !getModalComponentByKey(to.query.modal);

    if (modalKey && isModalKeyInvalid) {
        return filterLocationQuery(to, ["modal"]);
    }
}

const router = useRouter();
router.beforeEach(filterInvalidModalRoutes);

const currentModalKey = computed<ModalKey | null>(() => {
    const modalQuery = router.currentRoute.value.query.modal;
    if (modalQuery) return modalQuery as ModalKey;
    else return null;
});
</script>

<template>
    <div class="overlay" v-if="currentModalKey">
        <div class="modal">
            <button @click="closeModal">Close</button>
            <component :is="getModalComponentByKey(currentModalKey)" />
        </div>
    </div>
</template>

<style scoped lang="less">
.overlay {
    position: fixed;
    z-index: var(--z-modal);
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
}
</style>
