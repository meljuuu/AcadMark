<template>
  <div class="fixed top-0 left-0 w-full bg-blue shadow-md z-1">
    <div class="flex items-center px-4 py-1 sm:ml-40 md:ml-60"
      :class="{ 'justify-between': isDashboard, 'justify-end': !isDashboard }">
      <h1 v-if="isDashboard" class="sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white">
        Welcome Teacher {{ teacherFirstName }}!
      </h1>
      <img class="h-[70px] md:h-[80px] lg:h-[90px]" src="/assets/img/logo.png" alt="Logo" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getProfile } from '@/service/profileService';

const route = useRoute();
const teacherFirstName = ref('');

const isDashboard = computed(() => {
  const allowedPaths = ['/dashboard', '/profile', '/classes', '/forms'];
  return allowedPaths.includes(route.path);
});

onMounted(async () => {
  try {
    const profileResponse = await getProfile();
    const profileData = profileResponse.teacher;

    teacherFirstName.value = profileData.firstName;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.firstName) {
      localStorage.setItem('user', JSON.stringify({
        ...user,
        firstName: profileData.firstName,
        lastName: profileData.lastName
      }));
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
});
</script>
