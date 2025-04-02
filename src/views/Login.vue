<template>
  <div class="flex w-full h-screen -ml-5 bg-[#547fad] overflow-hidden">
    <div class="flex-1 flex items-center justify-center min-w-[50%] relative overflow-hidden">
      <img src="/assets/img/login/circle.png" alt="Background Circle"
        class="absolute h-[620px] w-[620px] -left-[150px] z-[1] animate-circle" />
      <img src="/assets/img/login/acad-img.png" alt="Login Illustration" class="w-3/4 z-10" />
    </div>
    <div
      class="flex-1 flex items-center justify-center bg-white p-5 min-w-[50%] shadow-[rgba(0,0,0,0.35)_0px_5px_15px] rounded-l-[50px]">
      <div class="text-center w-[450px] p-[30px] border-5">
        <img src="/assets/img/login/sta-rita-logo.png" alt="School Logo" class="block mx-auto mb-2.5 w-[150px]" />
        <h2 class="text-[#295f98] font-medium m-0">Sta. Rita Highschool</h2>
        <p class="text-[#295f98] font-medium m-0 mb-[30px]">Record Keeping Management System</p>

        <form @submit.prevent="login">
          <div class="relative w-full mb-5">
            <input type="email" v-model="email" placeholder="Enter Domain Address" required
              class="w-full p-[15px] border border-[#295f98] rounded-[5px] text-base outline-none bg-white box-border placeholder:text-xs placeholder:text-[#aaa]" />
            <label class="absolute -top-[15px] left-[10px] bg-white px-[5px] text-xs text-[#295f98]">Email
              Domain</label>
          </div>

          <div class="relative w-full mb-5">
            <div class="relative w-full">
              <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Enter Password" required
                class="w-full p-[15px] border border-[#295f98] rounded-[5px] text-base outline-none bg-white box-border placeholder:text-xs placeholder:text-[#aaa]" />
              <label class="absolute -top-[15px] left-[10px] bg-white px-[5px] text-xs text-[#295f98]">Password</label>
              <span @click="togglePassword" class="absolute right-[15px] top-1/2 -translate-y-1/2 cursor-pointer">
                <img :src="showPassword ? '/assets/img/login/iconoir_eye.png' : '/assets/img/login/iconoir_eye.png'"
                  alt="Toggle Password Visibility" class="w-5 h-5" />
              </span>
            </div>
          </div>

          <div class="flex justify-between items-center w-full -mb-[30px] -mt-[30px]">
            <div class="flex items-center gap-[5px] whitespace-nowrap">
              <input type="checkbox" v-model="rememberMe" id="remember" class="checkbox" />
              <p class="mt-7 text-[#295f98] text-sm">Remember me</p>
            </div>
            <a href="#" class="text-[#295f98] no-underline text-sm mt-7">Forgot Password?</a>
          </div>

          <button type="submit"
            class="w-full p-[15px] bg-[#295f98] text-white border-none rounded-[5px] text-base cursor-pointer mt-5 transition-colors duration-300 hover:bg-[#1e4a7a]">
            Login
          </button>
          <p v-if="errorMessage" class="text-red-500 mt-2.5 text-sm">{{ errorMessage }}</p>
        </form>
        <p class="mt-5 text-[#666] text-xs">v1.0</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import teachersData from '../data/teachers.json';

const emit = defineEmits(['logged-in']);
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const errorMessage = ref('');
const teachers = ref(teachersData.teachers);

const togglePassword = () => showPassword.value = !showPassword.value;

const login = () => {
  errorMessage.value = '';
  const teacher = teachers.value.find(t => t.email === email.value && t.password === password.value);

  if (teacher) {
    localStorage.setItem('teacherID', teacher.teacher_ID);
    emit('logged-in', {
      teacher_ID: teacher.teacher_ID,
      email: teacher.email,
      firstName: teacher.firstName,
      lastName: teacher.lastName
    });
  } else {
    errorMessage.value = 'Invalid email or password. Please try again.';
  }
};
</script>
