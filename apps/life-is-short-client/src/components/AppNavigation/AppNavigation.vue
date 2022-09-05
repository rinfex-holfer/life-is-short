<script setup>

import {appRouteNames} from "../../router/app-routes";

</script>

<template>
  <div class="app-navigation">
    <router-link :to="{name: appRouteNames.MAIN}" class="button button--square">&lt;</router-link>
<!--    <ul class="app-navigation__list">-->
<!--      <li><router-link :to="{name: appRouteNames.MAIN}">Main</router-link></li>-->
<!--      <li><router-link :to="{name: appRouteNames.LIFE_IN_WEEKS}">Life in weeks</router-link></li>-->
<!--      <li><router-link :to="{name: appRouteNames.LIFE_IN_MONTHS}">Life in months</router-link></li>-->
<!--    </ul>-->
  </div>
</template>

<style scoped src="./AppNavigationStyles.less"></style>