<script setup>
import { appRouteNames } from "../../router/routes";
</script>

<template>
    <div class="app-navigation">
        <router-link :to="{ name: appRouteNames.MAIN }" class="button button--square">
            &lt;
        </router-link>
    </div>
</template>

<style scoped src="./AppNavigationStyles.less"></style>
