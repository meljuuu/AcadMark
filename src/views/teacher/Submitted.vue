<template>
  <div class="max-h-[412px]">
    <div class="flex justify-between px-5 py-3">
      <Dropdown :showQuarter="true" v-model="selectedQuarter" />
      <div class="w-1/3">
        <Searchbar v-model="searchQuery" />
      </div>
    </div>

    <div class="overflow-auto px-5">
      <table class="w-full border-collapse text-center text-sm">
        <thead class="bg-gray-100 text-[#464F60] text-[15px] font-semibold">
          <tr>
            <th class="p-2 w-1/6">LRN</th>
            <th class="p-2 w-1/6">NAME</th>
            <th class="p-2 w-1/6">GENDER</th>
            <th class="p-2 w-1/6">AGE</th>
            <th class="p-2 w-1/6">GRADE</th>
            <th class="p-2 w-1/6">STATUS</th>
          </tr>
        </thead>
        <tbody class="font-medium text-[15px]">
          <tr v-if="loading">
            <td colspan="6" class="p-2 text-center">
              <div class="flex justify-center items-center">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue"></div>
                <span class="ml-2">Loading...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="paginatedStudents.length === 0">
            <td colspan="6" class="p-2 text-center">
              {{ error || 'No students available.' }}
            </td>
          </tr>
          <tr v-for="student in paginatedStudents" :key="student.lrn" class="hover:bg-gray-200 cursor-pointer"
            @click="openModal(student)">
            <td class="p-2 w-1/6">{{ student.lrn }}</td>
            <td class="p-2 w-1/6">{{ student.lastName + ", " + student.firstName + " " + student.middleName }}</td>
            <td class="p-2 w-1/6">{{ student.sex }}</td>
            <td class="p-2 w-1/6">{{ getAge(student.birthDate) }}</td>
            <td class="p-2 w-1/6">{{ getGradeForQuarter(student) }}</td>
            <td class="p-2 w-1/6">
              <span class="px-4 py-2 rounded text-white inline-block w-[135px] font-light text-center bg-[#FF9204]">
                Pending
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <modal v-if="showMessage" :showMessage="showMessage" @close="closeModal" :trackStand="trackStand"
      :selectedStudent="selectedStudent" :selectedQuarter="selectedQuarter" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import Dropdown from '@/components/dropdown.vue';
import Searchbar from '@/components/searchbar.vue';
import modal from '@/components/modal.vue';
import { getSubjectGrades } from '@/service/gradeService';
import Swal from 'sweetalert2';

const props = defineProps({
  subject_id: {
    type: String,
    required: true,
  },
  trackStand: {
    type: String,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update:currentPage', 'update:totalItems']);

const students = ref([]);
const selectedQuarter = ref('1st');
const searchQuery = ref('');
const showMessage = ref(false);
const selectedStudent = ref(null);
const loading = ref(false);
const error = ref('');

const quarterMapping = {
  '1st': 'first',
  '2nd': 'second',
  '3rd': 'third',
  '4th': 'fourth',
};

const refreshSubmittedData = () => {
  fetchStudents();
};

// Expose this method to the parent component
defineExpose({
  refreshSubmittedData,
});

const fetchStudents = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    console.log('Fetching students for subject:', props.subject_id);
    const response = await getSubjectGrades(props.subject_id);
    console.log('API Response:', response);
    
    if (response.status === 'success') {
      if (Array.isArray(response.data)) {
        students.value = response.data;
        console.log('Loaded submitted students:', students.value);
      } else {
        console.warn('Response data is not an array:', response.data);
        students.value = [];
        error.value = 'Invalid data format received from server';
      }
    } else {
      console.error('API returned error status:', response);
      students.value = [];
      error.value = response.message || 'Failed to load student data';
    }

    emit('update:currentPage', 1);
    emit('update:totalItems', students.value.length);
  } catch (error) {
    console.error('Error loading submitted students:', error);
    students.value = [];
    error.value = error.message || 'Failed to load student data. Please try again.';
    emit('update:currentPage', 1);
    emit('update:totalItems', 0);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.value,
      confirmButtonColor: '#dc2626'
    });
  } finally {
    loading.value = false;
  }
};

const filteredStudents = computed(() => {
  if (!searchQuery.value) {
    return students.value;
  }
  return students.value.filter((student) => {
    return (
      student.firstName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const totalPages = computed(() => {
  if (filteredStudents.value.length === 0) {
    return 0;
  }
  return Math.ceil(filteredStudents.value.length / props.itemsPerPage);
});

const paginatedStudents = computed(() => {
  if (filteredStudents.value.length === 0) {
    return [];
  }

  const startIndex = (props.currentPage - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;
  return filteredStudents.value.slice(startIndex, endIndex);
});

watch(
  filteredStudents,
  (newFilteredStudents) => {
    const newTotalPages = Math.ceil(
      newFilteredStudents.length / props.itemsPerPage
    );
    if (props.currentPage > newTotalPages && newTotalPages > 0) {
      emit('update:currentPage', newTotalPages);
    } else if (newTotalPages === 0) {
      emit('update:currentPage', 1);
    }
  },
  { deep: true }
);

const getGradeForQuarter = (student) => {
  const quarterKey = quarterMapping[selectedQuarter.value];
  return student.grades?.[quarterKey] || '';
};

const getAge = (birthDate) => {
  if (!birthDate) return 'N/A';
  const birth = new Date(birthDate);
  const ageDifMs = Date.now() - birth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const openModal = (student) => {
  selectedStudent.value = student;
  showMessage.value = true;
};

const closeModal = () => {
  showMessage.value = false;
};

onMounted(() => {
  fetchStudents();
});
</script>
