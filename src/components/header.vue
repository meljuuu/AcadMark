<template>
  <div class="absolute top-0 left-0 w-full bg-blue z-0">
    <div class="flex items-center px-5 py-2 sm:ml-28 md:ml-50 lg:ml-50 md:px-5 lg:px-15"
      :class="{ 'justify-between': isDashboard, 'justify-end': !isDashboard }">
      <h1 v-if="isDashboard" class="sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
        Welcome Teacher {{ teacherFirstName }}!
      </h1>
      <img class="h-[80px] md:h-[100px] lg:h-[120px]" src="/assets/img/logo.png" alt="Logo" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import teacherData from '@/data/teachers.json';

const route = useRoute();
const teacherFirstName = ref('');

const isDashboard = computed(() => route.path === '/dashboard');

// Fetch teacher's first name based on the teacherID in localStorage
onMounted(() => {
  const teacherID = localStorage.getItem('teacherID');
  if (teacherID) {
    const teacher = teacherData.teachers.find(t => t.teacher_ID === teacherID);
    if (teacher) {
      teacherFirstName.value = teacher.firstName;
    }
  }
});
</script>