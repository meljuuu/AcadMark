<template>
  <div class="w-full">
    <h1 class="text-5xl font-bold mb-6">Settings</h1>

    <div class="mx-auto bg-white p-8 rounded-2xl w-full w-full mb-6">
      
      <div class="flex justify-center gap-6 mb-6 border-b-2 border-gray-200">
        <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
            'px-10 py-3 text-2xl font-semibold transition cursor-pointer border-b-4',
            activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-700 hover:text-blue-600'
            ]"
        >
            {{ tab }}
        </button>
      </div>


      <div class="text-xl text-center">
        <div v-if="activeTab === 'Subjects'">
            <div class="mx-auto bg-white shadow-lg p-8 rounded-2xl w-full w-full mb-6 border border-gray-200">
                <form>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Subject ID</label>
                        </div>
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Subject Code</label>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-8">
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Subject Name</label>
                        </div>
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Grade Level</label>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors duration-200 cursor-pointer">
                            Add Subject
                        </button>
                    </div>
                </form>
            </div>

            <div class="mx-auto bg-white shadow-lg p-8 rounded-2xl w-full border border-gray-200 h-[875px] flex flex-col">
                <div class="mb-4 flex items-center justify-between gap-4">
                <!-- Search Input on the left -->
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search..."
                            class="border border-[#295f98] rounded px-10 py-2 text-lg"
                            />
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>

                    <!-- Selects on the right -->
                    <div class="flex gap-4">
                        <select v-model="selectedId" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="subject in uniqueIds" :key="subject" :value="subject">{{ subject }}</option>
                        </select>

                        <select v-model="selectedCode" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="subject in uniqueCodes" :key="subject" :value="subject">{{ subject }}</option>
                        </select>

                        <select v-model="selectedGrade" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="grade in uniqueGrades" :key="grade" :value="grade">{{ grade }}</option>
                        </select>
                    </div>
                </div>


                <!-- Scrollable Table Section -->
                <div class="overflow-y-auto flex-grow">
                    <table class="min-w-full divide-y divide-gray-200 text-left">
                        <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                            <tr>
                                <th class="px-6 py-3">Subject ID</th>
                                <th class="px-6 py-3">Subject Code</th>
                                <th class="px-6 py-3">Subject Name</th>
                                <th class="px-6 py-3">Grade Level</th>
                                <th class="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="subject in paginatedSubjects" :key="subject.id">
                                <td class="px-6 py-4 whitespace-nowrap text-lg">{{ subject.id }}</td>
                                <td class="px-6 py-4 text-lg">{{ subject.code }}</td>
                                <td class="px-6 py-4 text-lg">{{ subject.name }}</td>
                                <td class="px-6 py-4 text-lg">{{ subject.grade }}</td>
                                <td class="px-6 py-4 flex space-x-2 text-lg">
                                    <button
                                        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                                        @click="confirmDelete"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination at the bottom -->
                <div class="flex justify-center items-center mt-4 space-x-1 pt-4 border-t border-gray-300">
                    <button
                        class="px-3 text-lg border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                        :disabled="currentPage === 1"
                        @click="currentPage--">
                        <span>←</span> Previous
                    </button>

                    <button
                        v-for="page in pageNumbers"
                        :key="page"
                        class="py-1 text-lg border border-[#295F98] rounded w-10 text-center"
                        :class="{
                            'bg-[#295F98] text-white': page === currentPage,
                            'text-gray-600': page !== currentPage,
                            'cursor-default': page === '...',
                            'cursor-pointer': page !== '...',
                        }"
                        @click="page !== '...' && (currentPage = page)"
                        :disabled="page === '...'">
                        {{ page }}
                    </button>

                    <button
                        class="px-3 text-lg border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                        :disabled="currentPage === totalPages"
                        @click="currentPage++">
                        Next <span>→</span>
                    </button>
                </div>
            </div>
        </div>

        <div v-else-if="activeTab === 'Section'">
          <p>This is the content for <strong>Section</strong>.</p>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2';

const tabs = ['Subjects', 'Section']
const activeTab = ref('Subjects')
const searchQuery = ref('')
const selectedId = ref('')
const selectedCode = ref('')
const selectedGrade = ref('')

const subjects = ref([
  { id: '101', code: 'ENG101', name: 'English Language', grade: 'Grade 7' },
  { id: '102', code: 'MATH101', name: 'Basic Math', grade: 'Grade 8' },
  { id: '103', code: 'SCI101', name: 'General Science', grade: 'Grade 7' },
  { id: '104', code: 'HIST101', name: 'World History', grade: 'Grade 8' },
  { id: '105', code: 'GEO101', name: 'Geography', grade: 'Grade 9' },
  { id: '106', code: 'BIO101', name: 'Biology', grade: 'Grade 10' },
  { id: '107', code: 'CHEM101', name: 'Chemistry', grade: 'Grade 11' },
  { id: '108', code: 'PHY101', name: 'Physics', grade: 'Grade 12' },
  { id: '109', code: 'COMP101', name: 'Computer Science', grade: 'Grade 9' },
  { id: '110', code: 'ART101', name: 'Art and Design', grade: 'Grade 7' },
  { id: '111', code: 'MUSIC101', name: 'Music', grade: 'Grade 10' },
  { id: '112', code: 'PE101', name: 'Physical Education', grade: 'Grade 8' },
  { id: '113', code: 'ENG102', name: 'English Literature', grade: 'Grade 11' }
])

const uniqueIds = computed(() => [...new Set(subjects.value.map(subject => subject.id))])
const uniqueCodes = computed(() => [...new Set(subjects.value.map(subject => subject.code))])
const uniqueGrades = computed(() => [...new Set(subjects.value.map(subject => subject.grade))])

const filteredSubjects = computed(() => {
  const query = searchQuery.value.toLowerCase()

  return subjects.value.filter(subject => {
    // Expanded search across multiple fields
    const matchesSearch =
        subject.name.toLowerCase().includes(query) ||
        subject.id.toString().toLowerCase().includes(query) ||
        subject.code.toLowerCase().includes(query) ||
        subject.grade.toLowerCase().includes(query)

    const matchesId = !selectedId.value || subject.id === selectedId.value
    const matchesCode = !selectedCode.value || subject.code === selectedCode.value
    const matchesGrade = !selectedGrade.value || subject.grade === selectedGrade.value

    return matchesSearch && matchesId && matchesCode && matchesGrade
  })
})

const currentPage = ref(1)
const itemsPerPage = 10

const totalPages = computed(() =>
  Math.ceil(filteredSubjects.value.length / itemsPerPage)
)

const paginatedSubjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredSubjects.value.slice(start, start + itemsPerPage)
})

const pageNumbers = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

const confirmDelete = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this subject?',
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
      title: 'Deleted',
      text: 'The subject has been deleted.',
      timer: 1500,
      showConfirmButton: false
    });
  }
};

// Reset to page 1 when filters or search query change
watch([searchQuery, selectedId, selectedCode, selectedGrade], () => {
  currentPage.value = 1
})


</script>

<style scoped>
.floating-label {
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}

.floating-label .input {
  padding: 1rem 0.5rem;
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

.floating-label input {
  transform: translateY(1.5rem);
  font-size: 1rem;
}

.filters {
  display: flex;
  gap: 10px;
} 

.filter-dropdown {
  padding: 10px 15px;
  width: 150px;
  border: 1px solid #295f98;
  border-radius: 5px;
  font-size: 14px;
  background: #fff;
  font-weight: bold;
  color: #295f98;
  cursor: pointer;
  appearance: none;
  position: relative;
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
  transition: all 0.3s ease-in-out;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M7 10l5 5 5-5H7z'/></svg>");
}

.filter-dropdown:focus {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M7 14l5-5 5 5H7z'/></svg>");
}
</style>


