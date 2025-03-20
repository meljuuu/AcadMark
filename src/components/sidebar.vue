<template>
  <div class="sticky top-0 sm:w-[100px] md:w-1/5 lg:w-1/6 max-w-[210px] w-auto bg-blue md:pt-15 sm:pt-5 rounded-tr-[30px] h-full overflow-y-auto"
    style="box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;">

    <div class="flex flex-col items-center m-4 gap-8">
      <img :src="imageSrc" alt="Teacher" class="w-[130px] h-[130px] rounded-full object-contain cursor-pointer"
        @click="triggerFileInput" />
      <input ref="fileInput" type="file" accept="image/*" @change="handleImageChange" class="hidden" />
      <p class="text-white text-center font-normal text-[16px]">{{ fullName }}</p>
      <div class="w-full border-b border-[#A6ACAF]"></div>
    </div>

    <nav class="flex flex-col w-full mt-5">
      <router-link v-for="(link, index) in links" :key="index" :to="link.path" class="nav-link">
        <img :src="link.icon" :alt="link.name" class="w-6 h-6 mr-2 sm:hidden md:block" />
        <span class="font-semibold text-[16px]">{{ link.name }}</span>
      </router-link>
    </nav>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import teacherData from '@/data/teachers.json';

// References and state variables
const imageSrc = ref("../../public/assets/img/sidebar/Vector.png");
const fileInput = ref(null);
const currentTeacher = ref(null);

// Navigation links
const links = ref([
  { name: "Dashboard", path: "/dashboard", icon: "../../public/assets/img/sidebar/dashboard.png" },
  { name: "Classes", path: "/classes", icon: "../../public/assets/img/sidebar/classes.png" },
  { name: "Forms", path: "/profile", icon: "../../public/assets/img/sidebar/form.png" }
]);

// Full name computed property
const fullName = computed(() => {
  if (!currentTeacher.value) return '';
  const middleInitial = currentTeacher.value.middleName ? currentTeacher.value.middleName[0] + '.' : '';
  return `${currentTeacher.value.firstName} ${middleInitial} ${currentTeacher.value.lastName}`;
});

// Fetch teacher data from localStorage on mounted
onMounted(() => {
  const teacherID = localStorage.getItem('teacherID');
  if (teacherID) {
    // Find the teacher with the matching ID from teachers data
    const teacher = teacherData.teachers.find(t => t.teacher_ID === teacherID);
    if (teacher) {
      currentTeacher.value = teacher;
    }
  }
});

// Trigger file input to change profile picture
const triggerFileInput = () => fileInput.value.click();

// Handle image change for the profile picture
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => imageSrc.value = reader.result;
    reader.readAsDataURL(file);
  }
};
</script>
