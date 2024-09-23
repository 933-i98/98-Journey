<template>
  <div class="app">
    <tabbar v-if="!route.meta.hideTabBar"></tabbar>
    <router-view></router-view>
    <loading />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import tabbar from './components/tabbar/tabbar.vue';
import Loading from '@/components/loading/loading.vue'

const route = useRoute()

</script>

<style scoped></style>
