<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-[100] flex items-center justify-center"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }"
    @click.self="$emit('update:modelValue', false)"
  >
    <div class="bg-white p-6 rounded-md w-[1000px] shadow-lg max-w-full">
      <h2 class="text-xl text-[#295f98] font-semibold mb-6">Add Faculty</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4 p-2">
        <h1 class="font-semibold text-[#295f98]">Profile</h1>

        <!-- First row -->
        <div class="flex gap-4 mb-6">
            <div class="floating-label flex-1">
            <input v-model="firstName" type="text" placeholder=" " class="input" required />
            <label>First Name</label>
            </div>
            <div class="floating-label flex-1">
            <input v-model="middleName" type="text" placeholder=" " class="input" />
            <label>Middle Name</label>
            </div>
            <div class="floating-label flex-1">
            <input v-model="lastName" type="text" placeholder=" " class="input" required />
            <label>Last Name</label>
            </div>
            <div class="floating-label w-24">
            <input v-model="suffix" type="text" placeholder=" " class="input" />
            <label>Suffix</label>
            </div>
            <!-- <select v-model="suffix" class="input">
                    <option value="" disabled selected hidden></option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                </select> -->
        </div>

        <!-- Second row -->
        <div class="flex gap-4 mb-6">
            <div class="floating-label flex-1">
            <input v-model="employeeNumber" type="text" placeholder=" " class="input" required />
            <label>Employee Number</label>
            </div>
            <div class="floating-label flex-1">
            <input v-model="educationalAttainment" type="text" placeholder=" " class="input" />
            <label>Educational Attainment</label>
            </div>
            <div class="floating-label flex-1">
            <input v-model="teachingPosition" type="text" placeholder=" " class="input" />
            <label>Teaching Position</label>
            </div>
            <div class="floating-label flex-1">
            <input v-model="socialStudies" type="text" placeholder=" " class="input" />
            <label>Social Studies</label>
            </div>
            <!-- <select v-model="socialStudies" class="input">
                <option disabled value="">Select a topic</option>
                <option>History</option>
                <option>Geography</option>
                <option>Economics</option>
                <option>Political Science</option>
                <option>Sociology</option>
                <option>Anthropology</option>
                <option>Civics</option>
                <option>Cultural Studies</option>
                <option>Global Studies</option>
                <option>Current Events</option>
            </select> -->
            
        </div>

        <!-- Third row -->
        <h1 class="font-semibold text-[#295f98]">Account Setup</h1>
        <div class="flex gap-4">
            <div class="floating-label flex-1 mb-6">
            <input v-model="email" type="email" placeholder=" " class="input" required />
            <label>Email</label>
            </div>
            <div class="floating-label flex-1">
            <input v-model="password" type="password" placeholder=" " class="input" required />
            <label>Password</label>
            </div>
            <div class="floating-label flex-1">
            <input v-model="confirmPassword" type="password" placeholder=" " class="input" required />
            <label>Confirm Password</label>
            </div>
        </div>

        <!-- Accession switches -->
        <h2 class="text-xl text-[#295f98] font-semibold mb-6">Accession</h2>
        <div class="flex gap-6 items-center">
            <label class="flex flex-col items-center gap-1 cursor-pointer select-none">
                <span class="font-semibold text-[#295f98] mb-4">Teacher</span>
                <input type="checkbox" v-model="accession.teacher" class="hidden" />
                <div :class="['w-18 h-6 rounded-full flex items-center transition-colors duration-300', accession.teacher ? 'bg-blue-600' : 'bg-gray-300']">
                <div :class="['w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300', accession.teacher ? 'translate-x-12' : 'translate-x-1']"></div>
                </div>
            </label>

            <label class="flex flex-col items-center gap-1 cursor-pointer select-none">
                <span class="font-semibold text-[#295f98] mb-4">Admin</span>
                <input type="checkbox" v-model="accession.admin" class="hidden" />
                <div :class="['w-18 h-6 rounded-full flex items-center transition-colors duration-300', accession.admin ? 'bg-blue-600' : 'bg-gray-300']">
                <div :class="['w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300', accession.admin ? 'translate-x-12' : 'translate-x-1']"></div>
                </div>
            </label>

           <label class="flex flex-col items-center gap-1 cursor-pointer select-none">
                <span class="font-semibold text-[#295f98] mb-4">Book-keeping</span>
                <input type="checkbox" v-model="accession.bookkeeping" class="hidden" />
                <div :class="['w-18 h-6 rounded-full flex items-center transition-colors duration-300', accession.bookkeeping ? 'bg-blue-600' : 'bg-gray-300']">
                <div :class="['w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300', accession.bookkeeping ? 'translate-x-12' : 'translate-x-1']"></div>
                </div>
          </label>

        </div>


        <!-- Buttons -->
        <div class="flex justify-end mt-6 gap-2">
            <button
            type="button"
            @click="$emit('update:modelValue', false)"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
            >
            Cancel
            </button>
            <button
            type="submit"
            class="px-4 py-2 bg-[#295f98] text-white rounded hover:bg-blue-900 cursor-pointer"
            >
            Save
            </button>
        </div>
        </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue', 'submit']);

const firstName = ref('');
const middleName = ref('');
const lastName = ref('');
const suffix = ref('');

const employeeNumber = ref('');
const educationalAttainment = ref('');
const teachingPosition = ref('');
const socialStudies = ref('');

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const accession = ref({
  teacher: false,
  admin: false,
  bookkeeping: false,
});

const handleSubmit = () => {
  const formData = {
    firstName: firstName.value,
    middleName: middleName.value,
    lastName: lastName.value,
    suffix: suffix.value,
    employeeNumber: employeeNumber.value,
    educationalAttainment: educationalAttainment.value,
    teachingPosition: teachingPosition.value,
    socialStudies: socialStudies.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    accession: { ...accession.value },
  };

  emit('submit', formData);

  // Reset all fields
  firstName.value = '';
  middleName.value = '';
  lastName.value = '';
  suffix.value = '';
  employeeNumber.value = '';
  educationalAttainment.value = '';
  teachingPosition.value = '';
  socialStudies.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
  accession.value = {
    teacher: false,
    admin: false,
    bookkeeping: false,
  };

  emit('update:modelValue', false);
};
</script>

<style scoped>
.floating-label {
  position: relative;
  display: flex;
  flex-direction: column;
}

.floating-label .input {
  padding: 0.75rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  background: white;
}

.floating-label label {
  position: absolute;
  left: 0.5rem;
  top: 0.75rem;
  background: white;
  color: #888;
  padding: 0 0.25rem;
  transition: all 0.2s ease;
  pointer-events: none;
}

.floating-label input:focus + label,
.floating-label input:not(:placeholder-shown) + label {
  transform: translateY(-1.5rem);
  font-size: 0.75rem;
  color: #2563eb; /* Tailwind blue-600 */
}
</style>

