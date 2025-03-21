<template>
  <Login v-if="isLoginPage" @logged-in="handleLogin" />
  <div v-else class="flex h-full">
    <Sidebar class="z-10" />
    <div class="grow">
      <HeaderBar />
      <router-view class="ml-2 mt-34 px-[54px] pt-[32px]" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/sidebar.vue';
import HeaderBar from '@/components/header.vue';
import Login from '@/views/Login.vue';

const router = useRouter();
const isLoginPage = ref(false);

// Check if the user is already logged in
onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    isLoginPage.value = false;
    router.push('/dashboard'); // Redirect to dashboard if logged in
  } else {
    isLoginPage.value = true; // Show login page if not logged in
  }
});

// Handle successful login
const handleLogin = () => {
  isLoginPage.value = false;
  localStorage.setItem('user', 'true'); // Store user login status
  router.push('/dashboard');
};
</script>