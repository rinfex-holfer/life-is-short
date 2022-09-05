<script lang="ts" setup>
import {RouteLocationNormalized, useRouter} from "vue-router";
import {ModalKey} from "./modal-key";
import {removeRouterQueries} from "../../router/app-router-utils";
import {computed, VueElement} from "vue";
import Journal from "../Jornal.vue";

const popupMap: Record<ModalKey, VueElement> = {
  [ModalKey.JOURNAL]: Journal,
};

function getPopup(key: string): VueElement | null {
  return popupMap[key as ModalKey] || null
}

function closePopup() {
  router.push(removeRouterQueries(router.currentRoute.value, ['popup']))
}

function filterInvalidPopupRoutes(to: RouteLocationNormalized) {
  const popupKey = to.query.popup
  const isPopupKeyInvalid = typeof to.query.popup !== "string"
      || !getPopup(to.query.popup)

  if (popupKey && isPopupKeyInvalid) {
    return removeRouterQueries(to, ['popup'])
  }
}

const router = useRouter()

router.beforeEach(filterInvalidPopupRoutes)

const currentPopupKey = computed<ModalKey | null>(() => {
  const popupQuery = router.currentRoute.value.query.popup
  if (popupQuery) return popupQuery as ModalKey
  else return null
})

</script>

<template>
  <div class="popup" v-if="currentPopupKey">
    <button @click="closePopup">Close popup</button>
    <component :is="getPopup(currentPopupKey)" />
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>