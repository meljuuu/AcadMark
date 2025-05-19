<template>
  <div class="back-btn" @click="goBack">
    <span class="chevron">&lt;</span>
    <span>Back</span>
  </div>

  <div class="container mt-8">
        <div class="head">
          <div class="filtering-section">
          <select v-model="selectedStatus" class="filter-dropdown">
            <option value="All">Status (All)</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>

          <select v-model="selectedGender" class="filter-dropdown">
            <option value="All">Gender (All)</option>
            <option v-for="gender in genders" :key="gender" :value="gender">
              {{ gender }}
            </option>
          </select>

          <select v-model="selectedTrack" class="filter-dropdown">
            <option value="All">Track (All)</option>
            <option v-for="track in tracks" :key="track" :value="track">
              {{ track }}
            </option>
          </select>
        </div>

        <div class="search-bar p-4">
          <div class="relative w-[320px]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="border border-[#295f98] rounded pl-10 pr-4 py-3 w-full"
            />
          </div>
        </div>

    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                <th>
                    <input
                    type="checkbox"
                    :checked="allSelected"
                    @change="toggleSelectAll"
                    />
                </th>
                <th>LRN</th>
                <th>NAME</th>
                <th>GENDER</th>
                <th>AGE</th>
                <th>GRADE</th>
                <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in paginatedStudents"
                    :key="student.lrn"
                    @click="openGradeModal(student)"
                    class="cursor-pointer hover:bg-gray-100">
                <td>
                    <input
                    type="checkbox"
                    :value="student.lrn"
                    v-model="selectedStudents"
                    @click.stop
                    />
                </td>
                <td>{{ student.lrn }}</td>
                <td>{{ student.lastName }}, {{ student.firstName }}</td>
                <td>{{ student.gender }}</td>
                <td>{{ student.age }}</td>
                <td>Grade {{ student.grade }}</td>
                <td>
                    <span
                    :class="{
                        'text-green-600': student.status === 'Approved',
                        'text-red-600': student.status === 'Not Approved',
                        'text-yellow-600': student.status === 'Pending'
                    }"
                    >
                    {{ student.status }}
                    </span>
                </td>
                </tr>
            </tbody>
        </table>
        <GradeModal
          v-if="showModal"
          :student="selectedStudent"
          @close="showModal = false"
        />

        <div class="button mt-5">
            <button class="red" @click="reject">Reject</button>
            <button class="green" @click="acceptAlert">Accept</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, watch } from "vue";
import GradeModal from './GradeModal.vue';
import Swal from 'sweetalert2'

const router = useRouter()
const goBack = () => router.back()

const showModal = ref(false)
const selectedStudent = ref(null)

const openGradeModal = (student) => {
  selectedStudent.value = student
  showModal.value = true
}

const selectedStatus = ref("All");
const selectedGender = ref("All");
const selectedTrack = ref("All");
const searchQuery = ref('');

const statuses = ["Pending", "Approved", "Not Approved"];
const genders = ["Male", "Female"];
const tracks = ["STEM", "ABM", "TVL", "HUMSS"];


const filteredStudents = computed(() => {
  return students.value.filter((student) => {
    const matchesSearch = `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    const matchesStatus = selectedStatus.value === 'All' || student.status === selectedStatus.value;
    const matchesGender = selectedGender.value === 'All' || student.gender === selectedGender.value;
    const matchesTrack = selectedTrack.value === 'All' || student.track === selectedTrack.value;

    return matchesSearch && matchesStatus && matchesGender && matchesTrack;
  });
});

const students = ref([
  {
    lrn: '123456789012',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    gender: 'Male',
    age: 15,
    grade: 9,
    status: 'Approved',
  },
  {
    lrn: '987654321098',
    firstName: 'Maria',
    lastName: 'Santos',
    gender: 'Female',
    age: 14,
    grade: 8,
    status: 'Not Approved',
  },
  {
    lrn: '112233445566',
    firstName: 'Pedro',
    lastName: 'Garcia',
    gender: 'Male',
    age: 16,
    grade: 10,
    status: 'Pending',
  },
  // add more students as needed
])

const paginatedStudents = computed(() => filteredStudents.value)

const selectedStudents = ref([])

// Computed to check if all visible students are selected
const allSelected = computed(() => {
  return (
    paginatedStudents.value.length > 0 &&
    paginatedStudents.value.every((s) => selectedStudents.value.includes(s.lrn))
  )
})

// Select or deselect all visible students
function toggleSelectAll(event) {
  if (event.target.checked) {
    selectedStudents.value = paginatedStudents.value.map((s) => s.lrn)
  } else {
    selectedStudents.value = []
  }
}

const reject = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to reject this?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#D30000',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, Reject',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    Swal.fire({
      icon: 'success',
      title: 'Rejected',
      text: 'The item has been rejected.',
      timer: 1500,
      showConfirmButton: false
    });
  }
};

const acceptAlert = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to accept this?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, Accept',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Accepted',
        text: 'The item has been accepted successfully.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
};
</script>

<style scoped>
.filtering-section {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: 15px;
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

.back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 24px;
    color: #333;
    transition: color 0.2s;
    font-weight: 600;
}

span:hover {
    text-decoration: underline;
}

.chevron {
    font-size: 25px;
}

.container {
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #EEEEEE;
    padding: 30px 20px;
    border-radius: 5px;
    width: 100%;          /* Makes it wider but still responsive */
    max-width: 3400px;   /* Optional: limits width on large screens */
}

.head {
    display: flex;
}

.search-bar {
    display: flex;
    gap: 10px;
    justify-content: end;
    width: 100%;
  }

  .search-bar input {
    padding: 8px;
    border: 1px solid #295f98;
    border-radius: 5px;
    width: 100%;
  }

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

tr {
  cursor: pointer;
}

tr:hover { 
  background-color: #f6f6f6;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f4f4f4;
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
.red:hover {
  background-color: #D95353;
}
.green {
    background-color: #0C5A48;
}
.green:hover {
  background-color: #2E574E;
}

.text-green-600 {
  color: #2C6C2A;
}
.text-red-600 {
  color: #D30000;
}
.text-yellow-600 {
  color: #FF9204;
}
.text-green-600,
.text-red-600,
.text-yellow-600 {
    padding: 5px 30px;
    border-radius: 5px;
    font-size: 14px;
}
</style>
