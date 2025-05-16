<template>
  <div class="dropdown-container">
    <!-- Access -->
    <select
      v-if="showAccess"
      v-model="selectedAccess"
      class="filter-dropdown"
      @change="$emit('update:selectedAccess', selectedAccess)"
    >
      <option disabled value="">Access</option>
      <option v-for="access in accesss" :key="access" :value="access">
        {{ access }}
      </option>
    </select>

    <!-- Grade -->
    <select
      v-if="showGrade"
      v-model="selectedGrade"
      class="filter-dropdown"
      @change="$emit('update:selectedGrade', selectedGrade)"
    >
      <option disabled value="">Grade Level</option>
      <option v-for="grade in grades" :key="grade" :value="grade">
        Grade {{ grade }}
      </option>
    </select>

    <!-- Curriculum -->
    <select
      v-if="showCurriculum"
      v-model="selectedCurriculum"
      class="filter-dropdown"
      @change="$emit('update:selectedCurriculum', selectedCurriculum)"
    >
      <option disabled value="">Curriculum</option>
      <option v-for="curriculum in curriculums" :key="curriculum" :value="curriculum">
        {{ curriculum }}
      </option>
    </select>

    <!-- Track -->
    <select
      v-if="showTrack"
      v-model="selectedTrack"
      class="filter-dropdown"
      @change="$emit('update:selectedTrack', selectedTrack)"
    >
      <option disabled value="">Track</option>
      <option v-for="track in tracks" :key="track" :value="track">
        {{ track }}
      </option>
    </select>

    <!-- Status -->
    <select
      v-if="showStatus"
      v-model="selectedStatus"
      class="filter-dropdown"
      @change="$emit('update:selectedStatus', selectedStatus)"
    >
      <option disabled value="">Status</option>
      <option v-for="status in statuses" :key="status" :value="status">
        {{ status }}
      </option>
    </select>

    <!-- Gender -->
    <select
      v-if="showGender"
      v-model="selectedGender"
      class="filter-dropdown"
      @change="$emit('update:selectedGender', selectedGender)"
    >
      <option disabled value="">Gender</option>
      <option v-for="gender in genders" :key="gender" :value="gender">
        {{ gender }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

defineProps({
  showAccess: { type: Boolean, default: false },
  showGrade: { type: Boolean, default: false },
  showCurriculum: { type: Boolean, default: false },
  showTrack: { type: Boolean, default: false },
  showStatus: { type: Boolean, default: false },
  showGender: { type: Boolean, default: false }
});

const selectedAccess = ref("");
const selectedGrade = ref("");
const selectedCurriculum = ref("");
const selectedTrack = ref("");
const selectedStatus = ref("");
const selectedGender = ref("");

const accesss = ["Teacher", "Admin", "Record"];
const grades = [7, 8, 9, 10, 11, 12];
const curriculums = ["BEC", "K-12", "SPED"];
const tracks = ["STEM", "ABM", "TVL", "HUMSS"];
const statuses = ["Active", "Inactive"];
const genders = ["Male", "Female"];
</script>

<style scoped>
.dropdown-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-dropdown {
  padding: 15px 20px;
  width: 210px;
  border: 1px solid #295f98;
  border-radius: 5px;
  font-size: 14px;
  background: #fff;
  font-weight: bold;
  color: #295f98;
  cursor: pointer;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
  transition: all 0.3s ease-in-out;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M14 7l-5 5 5 5V7z'/></svg>");
}

.filter-dropdown:focus {
  outline: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M7 10l5 5 5-5H7z'/></svg>");
}
</style>
