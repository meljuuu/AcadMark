<template>
  <div class="absolute top-0 left-0 w-full bg-blue z-0 h-[70px] md:h-[80px] lg:h-[90px] flex items-center px-5">
    <div class="flex items-center w-full justify-between">
      <!-- Welcome Message on the Left -->
      <h1 class="sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white text-left">
        Welcome, Teacher {{ teacherFirstName }}!
      </h1>
      <!-- Logo on the Right -->
      <img class="h-[50px] md:h-[60px] lg:h-[70px]" src="/assets/img/header/logo.png" alt="Logo" />
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import teacherData from '@/data/teachers.json';

const teacherFirstName = ref('');
const sidebarVisible = ref(true); // Adjust based on actual sidebar visibility logic

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
