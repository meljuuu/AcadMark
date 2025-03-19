<template>
  <div class="flex h-full">
    <Sidebar class="z-10" v-if="!isLoginPage" />
    <div class="grow">
      <HeaderBar/>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '@/components/sidebar.vue';
import HeaderBar from '@/components/header.vue';
const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>
