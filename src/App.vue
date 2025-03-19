<template>
  <div class="app-container">
    <Sidebar v-if="!isLoginPage" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '@/components/sidebar.vue';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>

<style>
.app-container {
  display: flex;
  height: 100%;
  /* Take full height of the parent */
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>