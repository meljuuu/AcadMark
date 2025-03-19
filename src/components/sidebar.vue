<template>
  <div class="sm:w-[100px] md:w-1/5 lg:w-1/6 max-w-[210px] h-full bg-blue md:pt-15 sm:pt-5 rounded-tr-[30px]"
    style="box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;">

    <!-- Profile Section -->
    <div class="flex flex-col items-center m-4 gap-8">
      <img :src="imageSrc" alt="Admin" class="w-[130px] h-[130px] rounded-full object-contain cursor-pointer"
        @click="triggerFileInput" />
      <input ref="fileInput" type="file" accept="image/*" @change="handleImageChange" class="hidden" />
      <p class="text-white text-center font-normal text-[16px]">Admin</p>
      <div class="w-full border-b border-[#A6ACAF]"></div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex flex-col w-full mt-5">
      <router-link v-for="(link, index) in links" :key="index" :to="link.path" class="nav-link">
        <img :src="link.icon" :alt="link.name" class="w-6 h-6 mr-2 sm:hidden md:block" />
        <span class="font-semibold text-[16px]">{{ link.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Reactive references for image source and links
const imageSrc = ref("../../public/assets/img/sidebar/Vector.png");
const fileInput = ref(null);
const links = ref([
  { name: "Dashboard", path: "/dashboard", icon: "../../public/assets/img/sidebar/dashboard.png" },
  { name: "Classes", path: "/classes", icon: "../../public/assets/img/sidebar/classes.png" },
  { name: "Forms", path: "/profile", icon: "../../public/assets/img/sidebar/form.png" }
]);

// Trigger file input click
const triggerFileInput = () => fileInput.value.click();

// Handle image change event
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => imageSrc.value = reader.result;
    reader.readAsDataURL(file);
  }
};
</script>