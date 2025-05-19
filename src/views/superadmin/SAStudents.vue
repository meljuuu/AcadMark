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
       
        <div class="table-container mt-7">
            <table>
                <thead>
                    <tr>
                    <th class="border-b border-gray-300">
                        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                    </th>
                    <th class="border-b border-gray-300">Grade Level</th>
                    <th class="border-b border-gray-300">LRN</th>
                    <th class="border-b border-gray-300">Name</th>
                    <th class="border-b border-gray-300">Curriculum</th>
                    <th class="border-b border-gray-300">Track</th>
                    <th class="border-b border-gray-300">Gender</th>
                    <th class="border-b border-gray-300">Birthdate</th>
                    <th class="border-b border-gray-300">Age</th>
                    <th class="border-b border-gray-300">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in paginatedStudents" 
                        :key="student.lrn" 
                        @click="openModal(student)"
                        class="cursor-pointer hover:bg-gray-100"
                    >
                    <td class="px-6 py-4 border-b border-gray-300">
                        <input type="checkbox" v-model="selectedStudents" :value="student.lrn" />
                    </td>
                    <td class="px-6 py-4 border-b border-gray-300">{{ student.grade }}</td>
                    <td class="px-6 py-4 border-b border-gray-300">{{ student.lrn }}</td>
                    <td class="px-6 py-4 border-b border-gray-300">{{ student.name }}</td>
                    <td class="px-6 py-4 border-b border-gray-300">{{ student.curriculum }}</td>
                    <td class="px-6 py-4 border-b border-gray-300">{{ student.track }}</td>
                    <td class="px-6 py-4 border-b border-gray-300">{{ student.gender }}</td>
                    <td class="px-6 py-4 border-b border-gray-300">{{ student.birthdate }}</td>
                    <td class="px-6 py-4 border-b border-gray-300">{{ student.age }}</td>
                    <td class="px-6 py-4 border-b border-gray-300">
                        <span :class="statusClass(student.status)">
                        {{ student.status }}
                        </span>
                    </td>
                    </tr>
                </tbody>
            </table>
            <StudentModal 
              v-if="isModalOpen" 
              :student="selectedStudent" 
              @close="closeModal" 
            />
        </div>

        <div class="button">
            <button class="red">Reject</button>
            <button class="green">Accept</button>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import StudentModal from "./components/StudentModal.vue";

const selectedStudent = ref(null)
const isModalOpen = ref(false)

const openModal = (student) => {
  selectedStudent.value = students
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedStudent.value = null
}

// Filter visibility
const showStatus = ref(true);
const showGrade = ref(true);
const showCurriculum = ref(true);
const showGender = ref(true);
const showTrack = ref(true);

// Dropdown options
const statuses = ["Pending", "Accepted", "Rejected"];
const grades = ['7', '8', '9', '10']; 
const curriculums = ["Junior High School", "Senior High School"];
const genders = ["Male", "Female"];
const tracks = ["STEM", "ABM", "TVL", "HUMSS"];

// Selected filter values
const selectedStatus = ref("");
const selectedGrade = ref("");
const selectedCurriculum = ref("");
const selectedGender = ref("");
const selectedTrack = ref("");

// Filtering logic
const filteredStudents = computed(() => {
  return students.value.filter(student => {
    return (
      (selectedStatus.value === "" || student.status === selectedStatus.value) &&
      (selectedGrade.value === "" || parseInt(student.grade) === parseInt(selectedGrade.value)) &&
      (selectedCurriculum.value === "" || student.curriculum === selectedCurriculum.value) &&
      (selectedGender.value === "" || student.gender === selectedGender.value) &&
      (selectedTrack.value === "" || student.track === selectedTrack.value)
    );
  });
});


const students = ref([
  {
    grade: '7',
    lrn: '123456789012',
    name: 'Juan Dela Cruz',
    curriculum: 'Junior High School',
    track: 'STEM',
    gender: 'Male',
    birthdate: '2010-01-15',
    age: 14,
    status: 'Accepted'
  },
  {
    grade: '8',
    lrn: '234567890123',
    name: 'Maria Santos',
    curriculum: 'Senior High School',
    track: 'ABM',
    gender: 'Female',
    birthdate: '2009-07-30',
    age: 15,
    status: 'Pending'
  },
  {
    grade: '10',
    lrn: '345678901234',
    name: 'Pedro Reyes',
    curriculum: 'Junior High School',
    track: 'TVL',
    gender: 'Male',
    birthdate: '2008-05-10',
    age: 16,
    status: 'Rejected'
  }
]);

const paginatedStudents = computed(() => filteredStudents.value);

const selectedStudents = ref([]);
const selectAll = ref(false);

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedStudents.value = students.value.map(student => student.lrn);
  } else {
    selectedStudents.value = [];
  }
};

// Automatically toggle `selectAll` when individual checkboxes change
watch(selectedStudents, (newVal) => {
  selectAll.value = newVal.length === students.value.length;
});

// Status color helper
const statusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'accepted':
      return 'text-green-600 font-semibold';
    case 'pending':
      return 'text-yellow-600 font-semibold';
    case 'rejected':
      return 'text-red-600 font-semibold';
    default:
      return '';
  }
};
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

.table-container {
  flex: 1; /* Fills the remaining space */
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 700px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: center;
  font-size: 14px;
}

th {
  padding-top: 20px;
  background: #F6F6F6;
  color: #000;
  position: sticky;
  top: 0;
  z-index: 1;
}

tr {
  cursor: pointer;
}

tr:hover { 
  background-color: #f6f6f6;
}
.button {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 15px;
}
.red,
.green {
    padding: 5px 30px;
    align-items: center;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
}
.red {
    background-color: #D30000;
}
.green {
    background-color: #0C5A48;
}
.red:hover,
.green:hover {
    
}
</style>