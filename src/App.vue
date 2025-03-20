<template>
  <Login v-if="isLoginPage" @logged-in="handleLogin" />
  <div v-else class="flex h-full">
    <Sidebar class="z-10 hidden md:block" />
    <div class="flex flex-col flex-grow">
      <HeaderBar class="sticky"/>
   
        <router-view class="p-4 md:p-6" />
  
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/sidebar.vue';
import HeaderBar from '@/components/header.vue';
import Login from '@/views/login.vue';

const router = useRouter();
const isLoginPage = ref(true); // Default to true to prevent flickering

onMounted(() => {
  const user = localStorage.getItem('user'); 
  if (user) {
    isLoginPage.value = false;
    router.push('/dashboard');
  }
});

// Handle login
const handleLogin = () => {
  isLoginPage.value = false;
  localStorage.setItem('user', 'true'); 
  router.push('/dashboard');
};
</script>
