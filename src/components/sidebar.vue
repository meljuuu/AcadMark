<template>
  <div 
    class="sm:w-[100px] md:w-1/5 lg:w-1/6 max-w-[260px] bg-blue md:pt-15 sm:pt-5 flex flex-col"
    style="box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px; position: relative; z-index: 10; height: auto; min-height: 100vh; overflow-y: auto;"
  >
    <div class="flex flex-col items-center gap-2">
      <img 
        :src="imageSrc" 
        alt="Teacher" 
        class="w-[130px] h-[130px] rounded-full object-contain cursor-pointer"
        @click="triggerFileInput" 
      />
      <input ref="fileInput" type="file" accept="image/*" @change="handleImageChange" class="hidden" />
      <p class="text-white text-center font-normal text-[16px]">{{ fullName }}</p>
      <div class="w-2/3 border-b border-[#A6ACAF]"></div>
    </div>

    <nav class="flex flex-col w-full mt-2">
      <router-link 
        v-for="(link, index) in links" 
        :key="index" 
        :to="link.path" 
        class="nav-link"
      >
        <img :src="link.icon" :alt="link.name" class="w-6 h-6 mr-2 sm:hidden md:block" />
        <span class="font-semibold text-[16px]">{{ link.name }}</span>
      </router-link>
    </nav>

    <button class="logout-btn" @click="openModal">
      <i class="fas fa-sign-out-alt"></i> Logout
    </button>
  </div>

  <!-- Logout Confirmation Modal -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <p class="modal-text">Are you sure you want to logout?</p>
      <div class="modal-buttons">
        <button @click="logout" class="confirm-btn">Yes</button>
        <button @click="closeModal" class="cancel-btn">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import teacherData from "@/data/teachers.json";

const router = useRouter();
const imageSrc = ref("/assets/img/sidebar/Vector.png");
const fileInput = ref(null);
const currentTeacher = ref(null);
const showModal = ref(false);

const links = ref([
  { name: "Dashboard", path: "/dashboard", icon: "/assets/img/sidebar/dashboard.png" },
  { name: "Classes", path: "/classes", icon: "/assets/img/sidebar/classes.png" },
  { name: "Forms", path: "/profile", icon: "/assets/img/sidebar/form.png" }
]);

const fullName = computed(() => {
  if (!currentTeacher.value) return '';
  const middleInitial = currentTeacher.value.middleName ? currentTeacher.value.middleName[0] + '.' : '';
  return `${currentTeacher.value.firstName} ${middleInitial} ${currentTeacher.value.lastName}`;
});

onMounted(() => {
  const teacherID = localStorage.getItem("teacherID");
  if (teacherID) {
    const teacher = teacherData.teachers.find(t => t.teacher_ID === teacherID);
    if (teacher) {
      currentTeacher.value = teacher;
    }
  }
});

const triggerFileInput = () => fileInput.value.click();

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => (imageSrc.value = reader.result);
    reader.readAsDataURL(file);
  }
};

const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);

const logout = () => {
  localStorage.removeItem("userToken");
  router.push("/");
};
</script>

<style>
.logout-btn {
  margin-top: auto;
  margin-bottom: 50px;
  width: 100%;
  padding: 12px;
  background-color: #295f98;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.logout-btn:hover {
  background-color: #1c3a6e;
}

.modal-overlay {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 270px;
  text-align: center;
}

.modal-text {
  font-weight: bold;
  margin-bottom: 15px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.confirm-btn {
  background: #d9534f;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background: #8b8b8b;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
