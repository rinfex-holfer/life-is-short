<script setup>
import LifeCounter from "../components/LifeCounter.vue";
import {appRouteNames} from "../router/routes";
</script>

<template>
  <div class="full-page-container">
    <div class="page-main">
      <LifeCounter/>
      <ul class="navigation">
        <li><router-link :to="{name: appRouteNames.LIFE_IN_WEEKS}" class="button nav-button desktop-only">Недели</router-link></li>
        <li><router-link :to="{name: appRouteNames.LIFE_IN_MONTHS}" class="button nav-button">Месяцы</router-link></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.navigation {
  margin: 0;
  padding: 40px 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-button {
  display: block;
  width: fit-content;
  margin: 10px auto;
}

@media (max-width: 900px) {
  .desktop-only {
    display: none;
  }

  .navigation {
    flex-direction: column;
  }
}
</style>