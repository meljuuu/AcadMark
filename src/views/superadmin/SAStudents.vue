<template>
    <div>
        <h1 class="text-5xl font-bold">Student</h1>
    </div>

    <div class="content mt-4">
        <div class="top-head">
             <div class="filtering-section">
                <!-- Status -->
                <select
                    v-if="showStatus"
                    v-model="selectedStatus"
                    class="filter-dropdown"
                    @change="$emit('update:selectedStatus', selectedStatus)"
                    >
                    <option value="">Status (All)</option>
                    <option v-for="status in statuses" :key="status" :value="status">
                        {{ status }}
                    </option>
                </select>

                <!-- Grade -->
                <select
                    v-if="showGrade"
                    v-model="selectedGrade"
                    class="filter-dropdown"
                    @change="$emit('update:selectedGrade', selectedGrade)"
                    >
                    <option value="">Grade Level (All)</option>
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
                    <option value="">Curriculum (All)</option>
                    <option v-for="curriculum in curriculums" :key="curriculum" :value="curriculum">
                        {{ curriculum }}
                    </option>
                </select>

                <!-- Gender -->
                <select
                    v-if="showGender"
                    v-model="selectedGender"
                    class="filter-dropdown"
                    @change="$emit('update:selectedGender', selectedGender)"
                    >
                    <option value="">Gender (All)</option>
                    <option v-for="gender in genders" :key="gender" :value="gender">
                        {{ gender }}
                    </option>
                </select>

                <!-- Track -->
                <select
                    v-if="showTrack"
                    v-model="selectedTrack"
                    class="filter-dropdown"
                    @change="$emit('update:selectedTrack', selectedTrack)"
                    >
                    <option value="">Track (All)</option>
                    <option v-for="track in tracks" :key="track" :value="track">
                        {{ track }}
                    </option>
                </select>
            </div>

            <div class="search-bar">
                <div class="relative">
                  <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search..."
                  class="border border-[#295f98] rounded px-15 py-3 "
                  />
                  <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>
        </div>
       


    </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Filter visibility
const showStatus = ref(true);
const showGrade = ref(true);
const showCurriculum = ref(true);
const showGender = ref(true);
const showTrack = ref(true);

// Dropdown options
const statuses = ["Pending", "Accepted", "Rejected"];
const grades = [7, 8, 9, 10];
const curriculums = ["Junior High School", "Senior High School"];
const genders = ["Male", "Female"];
const tracks = ["STEM", "ABM", "TVL", "HUMSS"];

// Selected filter values
const selectedStatus = ref("");
const selectedGrade = ref("");
const selectedCurriculum = ref("");
const selectedGender = ref("");
const selectedTrack = ref("");

// Dummy student data (you can replace this with props or API data)
const students = ref([
  {
    name: "Alice",
    status: "Pending",
    grade: 10,
    curriculum: "Junior High School",
    gender: "Female",
    track: "STEM"
  },
  {
    name: "Bob",
    status: "Accepted",
    grade: 9,
    curriculum: "Junior High School",
    gender: "Male",
    track: "TVL"
  },
  {
    name: "Charlie",
    status: "Rejected",
    grade: 10,
    curriculum: "Senior High School",
    gender: "Male",
    track: "ABM"
  },
  // Add more test entries as needed
]);

// Filtering logic
const filteredStudents = computed(() => {
  return students.value.filter(student => {
    return (
      (selectedStatus.value === "" || student.status === selectedStatus.value) &&
      (selectedGrade.value === "" || student.grade === parseInt(selectedGrade.value)) &&
      (selectedCurriculum.value === "" || student.curriculum === selectedCurriculum.value) &&
      (selectedGender.value === "" || student.gender === selectedGender.value) &&
      (selectedTrack.value === "" || student.track === selectedTrack.value)
    );
  });
});
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

.filtering-section {
    display: flex;
    gap: 20px;
    flex-wrap: nowrap;
    align-items: center;
    margin-left: 15px;
}

.content {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #EEEEEE;
  padding: 30px 20px;
  border-radius: 5px;
}

.top-head {
    display: flex;
    width: 100%;
    justify-content: space-between;
}
</style>