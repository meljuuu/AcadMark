<template>
  <Login v-if="isLoginPage" @logged-in="handleLogin" />
  <div v-else class="flex min-h-screen">
    <Sidebar class="z-10" />
    <div class="flex-1">
      <HeaderBar />
      <main class="ml-2 mt-34 px-[54px] pt-[32px]">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
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
const isLoginPage = ref(false);

onMounted(() => {
  const user = localStorage.getItem('user');
  isLoginPage.value = !user;
  if (user) router.push('/dashboard');
});

const handleLogin = () => {
  isLoginPage.value = false;
  localStorage.setItem('user', 'true');
  router.push('/dashboard');
};
</script>