<template>
    <div class="w-full">
        <div class="flex items-center space-x-6 mb-7">
            <h1 class="text-5xl font-bold">Lesson Plan Review</h1>
        </div>
        <div class="flex justify-between gap-4 w-full mb-6">
            <div v-for="(card, index) in cards" :key="index" class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-1/4 flex items-center space-x-4">
                <i :class="card.icon" class="text-gray-500 text-4xl"></i>
                <div class="text-right ml-auto">
                    <h2 class="text-xl font-semibold text-gray-700 mb-2">
                    {{ card.label }}
                    </h2>
                    <p class="text-3xl font-semibold">{{ card.value }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col mb-6" style="height: 875px;">
          <div class="flex justify-between items-center mb-4 space-x-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="border border-[#295f98] rounded px-10 py-2 "
                />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            <div class="filters w-2/3 justify-end">
              <select v-model="filters.teacher" class="filter-dropdown">
                <option value="">All Teachers</option>
                <option v-for="teacher in uniqueTeachers" :key="teacher" :value="teacher">
                  {{ teacher }}
                </option>
              </select>

              <select v-model="filters.grade" class="filter-dropdown">
                <option value="">All Grades</option>
                <option v-for="grade in uniqueGrades" :key="grade" :value="grade">
                  {{ grade }}
                </option>
              </select>

              <select v-model="filters.status" class="filter-dropdown">
                <option value="">All Statuses</option>
                <option v-for="status in uniqueStatuses" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </div>
          </div>


          <div class="overflow-y-auto flex-grow">

            <table class="min-w-full divide-y divide-gray-200 text-left">
                <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        <th class="px-6 py-3">Teacher Name</th>
                        <th class="px-6 py-3">Lesson Plan</th>
                        <th class="px-6 py-3">Category</th>
                        <th class="px-6 py-3">Grade Level</th>
                        <th class="px-6 py-3">Date Submitted</th>
                        <th class="px-6 py-3">Action</th>
                        <th class="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr v-for="(lesson, index) in paginatedFilteredLessons" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">{{ lesson.teacher }}</td>
                  <td class="px-6 py-4">{{ lesson.plan }}</td>
                  <td class="px-6 py-4">{{ lesson.category }}</td>
                  <td class="px-6 py-4">{{ lesson.grade }}</td>
                  <td class="px-6 py-4">{{ lesson.date }}</td>
                  <td class="px-6 py-4 flex space-x-2">
                    <button
                      class="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 px-3 py-1 rounded flex items-center space-x-1 cursor-pointer"
                      @click="openLessonModal(lesson)"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="bg-green-600 hover:bg-green-700 text-white border border-green-600 px-3 py-1 rounded flex items-center space-x-1 cursor-pointer">
                      <i class="fas fa-check"></i>
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 text-white border border-red-600 px-3 py-1 rounded flex items-center space-x-1 cursor-pointer">
                      <i class="fas fa-times"></i>
                    </button>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="[
                      'inline-block w-26 text-center px-2 py-1 rounded-full text-md font-semibold',
                      lesson.status === 'Checked' ? 'text-green-800' :
                      lesson.status === 'Pending' ? 'text-yellow-800' :
                      'text-red-800'
                    ]">
                      {{ lesson.status }}
                    </span>
                  </td>
                 
                </tr>
              </tbody>
            </table>
            <LessonPlanModal
              v-if="showModal"
              :lesson="selectedLesson"
              @close="closeLessonModal"
            />
          </div>
          
          <div class="flex justify-center items-center mt-4 space-x-1 pt-4 border-t border-gray-300">
            <button
                class="px-3 border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                :disabled="currentPage === 1"
                @click="currentPage--"
            >
                <span>←</span> Previous
            </button>

            <button
                v-for="page in pageNumbers"
                :key="page"
                class="py-1 border border-[#295F98] rounded w-10 text-center"
                :class="{
                'bg-[#295F98] text-white': page === currentPage,
                'text-gray-600': page !== currentPage,
                'cursor-default': page === '...',
                'cursor-pointer': page !== '...',
                }"
                @click="page !== '...' && (currentPage = page)"
                :disabled="page === '...'"
            >
                {{ page }}
            </button>

            <button
                class="px-3 border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
            >
                Next <span>→</span>
            </button>
          </div>
        </div>
    </div>
</template>

<script>
import LessonPlanModal from './components/LessonPlanModal.vue';

export default {
  components: {
    LessonPlanModal,
  },
  data() {
    return {
      showModal: false,
      selectedLesson: null,
      currentPage: 1,
      lessonsPerPage: 10,
      searchQuery: "",
      filters: {
        teacher: "",
        grade: "",
        status: "",
      },
      cards: [
        {
          label: "Total Lesson Plans",
          value: 120,
          icon: "fas fa-book"
        },
        {
          label: "Checked Lesson Plans",
          value: 85,
          icon: "fas fa-check-circle"
        },
        {
          label: "Pending Review",
          value: 25,
          icon: "fas fa-hourglass-half"
        },
        {
          label: "Need Revision",
          value: 10,
          icon: "fas fa-exclamation-triangle"
        }
      ],
      lessons: [
        {
          id: 1,
          teacher: "Mr. John Doe",
          plan: "Introduction to Fractions",
          category: "Math",
          grade: "Grade 4",
          date: "2025-05-15",
          status: "Checked"
        },
        {
          id: 2,
          teacher: "Ms. Jane Smith",
          plan: "Photosynthesis Basics",
          category: "Science",
          grade: "Grade 6",
          date: "2025-05-16",
          status: "Pending"
        },
        {
          id: 3,
          teacher: "Mr. Michael Reyes",
          plan: "Philippine History",
          category: "Social Studies",
          grade: "Grade 5",
          date: "2025-05-17",
          status: "Review"
        },
        {
          id: 4,
          teacher: "Ms. Lisa Chan",
          plan: "Earth's Layers",
          category: "Science",
          grade: "Grade 5",
          date: "2025-05-17",
          status: "Pending"
        },
        {
          id: 5,
          teacher: "Mr. Tony Cruz",
          plan: "Basic Geometry",
          category: "Math",
          grade: "Grade 6",
          date: "2025-05-18",
          status: "Checked"
        },
        {
          id: 6,
          teacher: "Ms. Anna Gomez",
          plan: "Types of Sentences",
          category: "English",
          grade: "Grade 4",
          date: "2025-05-18",
          status: "Review"
        },
        {
          id: 7,
          teacher: "Mr. David Lee",
          plan: "World War II Overview",
          category: "Social Studies",
          grade: "Grade 6",
          date: "2025-05-19",
          status: "Checked"
        },
        {
          id: 8,
          teacher: "Ms. Carla Reyes",
          plan: "Simple Machines",
          category: "Science",
          grade: "Grade 4",
          date: "2025-05-20",
          status: "Pending"
        },
        {
          id: 9,
          teacher: "Mr. Eric Santos",
          plan: "Algebraic Expressions",
          category: "Math",
          grade: "Grade 5",
          date: "2025-05-21",
          status: "Review"
        },
        {
          id: 10,
          teacher: "Ms. Grace Lim",
          plan: "Verb Tenses",
          category: "English",
          grade: "Grade 6",
          date: "2025-05-22",
          status: "Checked"
        },
        {
          id: 11,
          teacher: "Mr. Juan Dela Cruz",
          plan: "Filipino Heroes",
          category: "Social Studies",
          grade: "Grade 4",
          date: "2025-05-23",
          status: "Pending"
        },
        {
          id: 12,
          teacher: "Ms. Maria Santos",
          plan: "Basic Chemistry",
          category: "Science",
          grade: "Grade 5",
          date: "2025-05-24",
          status: "Review"
        }
      ]

    };
  },
  methods: {
    openLessonModal(lesson) {
      this.selectedLesson = lesson;
      this.showModal = true;
    },
    closeLessonModal() {
      this.showModal = false;
      this.selectedLesson = null;
    }
  },
  computed: {
    filteredLessons() {
      return this.lessons.filter((lesson) => {
        // Search filter (case insensitive)
        const search = this.searchQuery.toLowerCase();
        const matchesSearch =
          lesson.teacher.toLowerCase().includes(search) ||
          lesson.plan.toLowerCase().includes(search) ||
          lesson.category.toLowerCase().includes(search) ||
          lesson.grade.toLowerCase().includes(search) ||
          lesson.status.toLowerCase().includes(search);

        // Dropdown filters (exact match or empty)
        const matchesTeacher = this.filters.teacher
          ? lesson.teacher === this.filters.teacher
          : true;
        const matchesGrade = this.filters.grade
          ? lesson.grade === this.filters.grade
          : true;
        const matchesStatus = this.filters.status
          ? lesson.status === this.filters.status
          : true;

        return matchesSearch && matchesTeacher && matchesGrade && matchesStatus;
      });
    },
    paginatedFilteredLessons() {
      const start = (this.currentPage - 1) * this.lessonsPerPage;
      return this.filteredLessons.slice(start, start + this.lessonsPerPage);
    },
    paginatedLessons() {  
    const start = (this.currentPage - 1) * this.lessonsPerPage;
    return this.filteredLessons.slice(start, start + this.lessonsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredLessons.length / this.lessonsPerPage);
    },
    pageNumbers() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    },
    uniqueTeachers() {
      return [
        ...new Set(this.lessons.map((lesson) => lesson.teacher)),
      ].sort();
    },
    uniqueGrades() {
      return [
        ...new Set(this.lessons.map((lesson) => lesson.grade)),
      ].sort();
    },
    uniqueStatuses() {
      return [
        ...new Set(this.lessons.map((lesson) => lesson.status)),
      ].sort();
    },
    },
    watch: {
    filters: {
    deep: true,
    handler() {
      this.currentPage = 1;
      },
    },
    searchQuery() {
      this.currentPage = 1;
    },
  },
};
</script>


<style scoped>
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
