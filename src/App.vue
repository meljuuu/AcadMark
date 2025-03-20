<template>
  <Login v-if="isLoginPage" @logged-in="handleLogin" />
  <div v-else class="flex h-full">
    <Sidebar class="z-10" />
    <div class="grow">
      <HeaderBar />
      <router-view class="ml-2 mt-34 px-[54px] py-[32px]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/sidebar.vue';
import HeaderBar from '@/components/header.vue';
import Login from '@/views/login.vue';

const router = useRouter();
const isLoginPage = ref(!localStorage.getItem('user')); 

const handleLogin = () => {
  isLoginPage.value = false; 
  router.push('/dashboard'); 
};
</script>
