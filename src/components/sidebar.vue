<template>
  <div
    class="sm:w-[100px] md:w-1/5 lg:w-1/6 max-w-[210px] w-auto bg-blue md:pt-15 sm:pt-5 rounded-tr-[30px] sticky top-0 h-screen"
    style="box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;">

    <div class="flex flex-col items-center m-4 gap-8">
      <img :src="imageSrc" alt="Teacher" class="w-[130px] h-[130px] rounded-full object-contain" />
      <p class="text-white text-center font-normal text-[16px]">{{ fullName }}</p>
      <div class="w-full border-b border-[#A6ACAF]"></div>
    </div>

    <nav class="flex flex-col w-full mt-5 relative">
      <div class="absolute left-0 w-full bg-[#3E6FA2] transitions-all duration-300 rounded-r-lg"
        :style="{ top: `${activeIndex * 57}px`, height: '50px' }"></div>

      <router-link v-for="(link, index) in links" :key="index" :to="link.path" class="nav-link relative"
        :class="{ 'active': activeIndex === index }" @click="activeIndex = index">
        <img :src="link.icon" :alt="link.name" class="w-6 h-6 mr-2 sm:hidden md:block" />
        <span class="font-semibold text-[16px]">{{ link.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import teacherData from '@/data/teachers.json';

const activeIndex = ref(0);

const imageSrc = ref("/public/assets/img/profile/avatar.png");
const currentTeacher = ref(null);

const links = ref([
  { name: "Dashboard", path: "/dashboard", icon: "assets/img/sidebar/dashboard.png" },
  { name: "Classes", path: "/classes", icon: "assets/img/sidebar/classes.png" },
  { name: "Forms", path: "/forms", icon: "assets/img/sidebar/form.png" },
  { name: "Profile", path: "/profile", icon: "assets/img/sidebar/form.png" }
]);

const fullName = computed(() => {
  if (!currentTeacher.value) return '';
  const middleInitial = currentTeacher.value.middleName ? currentTeacher.value.middleName[0] + '.' : '';
  return `${currentTeacher.value.firstName} ${middleInitial} ${currentTeacher.value.lastName}`;
});

const updateImageFromStorage = () => {
  const teacherID = localStorage.getItem('teacherID');
  if (!teacherID) return;

  const teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
  const teacher = teachers.find(t => t.teacher_ID === teacherID);
  if (teacher?.avatar) imageSrc.value = teacher.avatar;
};

watch(() => localStorage.getItem('teachers'), updateImageFromStorage, { deep: true });

onMounted(() => {
  const teacherID = localStorage.getItem('teacherID');
  if (!teacherID) return;

  let teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
  if (teachers.length === 0) teachers = teacherData.teachers;

  const teacher = teachers.find(t => t.teacher_ID === teacherID);
  if (teacher) {
    currentTeacher.value = teacher;
    imageSrc.value = teacher.avatar || "/public/assets/img/profile/avatar.png";
  }

  setInterval(updateImageFromStorage, 1000);
});
</script>
