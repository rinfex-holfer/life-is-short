<script lang="ts" setup>
import Month from "../components/Month.vue";
import {useRouter} from "vue-router";
import {lifeInMonths} from "../store";
import {LifeMonth} from "../domain";
import {computed} from "vue";

const router = useRouter()

const monthNumFromUrl = router.currentRoute.value.params.monthNum
const monthNumInLife = monthNumFromUrl ? +monthNumFromUrl : 0
const month = computed<LifeMonth>(() => {
  const yearOfLife = Math.floor(monthNumInLife / 12)
  const selectedMonth = lifeInMonths.value[yearOfLife].months.find(m => m.numInLife === monthNumInLife)

  if (!selectedMonth) {
    const lastYear = lifeInMonths.value[lifeInMonths.value.length - 1]
    return lastYear.months[lastYear.months.length - 1]
  }

  return selectedMonth
})

</script>

<template>
<Month :month="month" />
</template>