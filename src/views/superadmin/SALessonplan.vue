<template>
  <div class="w-full">
    <!-- Header Section -->
    <div class="flex items-center space-x-6 mb-7">
      <h1 class="text-5xl font-bold">Lesson Plan</h1>
    </div>

    <!-- Cards Section -->
    <div class="flex justify-between gap-4 w-full mb-6">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-1/4 flex items-center space-x-4"
      >
        <i :class="card.icon" class="text-gray-500 text-4xl"></i>
        <div class="text-right ml-auto">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">{{ card.label }}</h2>
          <p class="text-3xl font-semibold">{{ card.value }}</p>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col mb-6" style="height: 875px;">
      <div class="flex justify-between items-center mb-4 space-x-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="border border-[#295f98] rounded px-10 py-2"
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

      <!-- Table Section -->
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
                  class="bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 px-3 py-1 rounded flex items-center space-x-1"
                  @click="openLessonModal(lesson)"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <button
                  class="bg-green-600 hover:bg-green-700 text-white border border-green-600 px-3 py-1 rounded flex items-center space-x-1"
                  @click="acceptAlert(lesson)"
                >
                  <i class="fas fa-check"></i>
                </button>

              <button
                class="bg-red-600 hover:bg-red-700 text-white border border-red-600 px-3 py-1 rounded flex items-center space-x-1"
                @click="reject(lesson)"  
              >
                <i class="fas fa-times"></i>
              </button>

              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'inline-block w-26 text-center px-2 py-1 rounded-full text-md font-semibold',
                    lesson.status === 'Checked' ? 'text-green-800' :
                    lesson.status === 'Pending' ? 'text-yellow-800' :
                    'text-red-800'
                  ]"
                >
                  {{ lesson.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <LessonPlanModal 
          v-if="showModal" 
          :lessonPlanData="selectedLesson" 
          @close="closeLessonModal" 
        />

      </div>

      <!-- Pagination Section -->
      <div class="flex justify-center items-center mt-4 space-x-1 pt-4 border-t border-gray-300">
        <button
          class="px-3 border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          ← Previous
        </button>
        <button
          v-for="page in pageNumbers"
          :key="page"
          class="py-1 border border-[#295F98] rounded w-10 text-center"
          :class="{
            'bg-[#295F98] text-white': page === currentPage,
            'text-gray-600': page !== currentPage,
            'cursor-default': page === '...',
            'cursor-pointer': page !== '...'
          }"
          @click="page !== '...' && (currentPage = page)"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
        <button
          class="px-3 border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LessonPlanModal from './components/LessonPlanModal.vue';
import Swal from 'sweetalert2';
import { getAllLessonPlans, approveLessonPlan, rejectLessonPlan, getLessonPlanById } from '@/service/superadminService';

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
      lessons: [],
      cards: [
        { label: "Total Lesson Plans", value: 0, icon: "fas fa-book" },
        { label: "Checked Lesson Plans", value: 0, icon: "fas fa-check-circle" },
        { label: "Pending Review", value: 0, icon: "fas fa-hourglass-half" },
        { label: "Need Revision", value: 0, icon: "fas fa-exclamation-triangle" }
      ]
    };
  },
  mounted() {
    this.fetchLessonPlans();
  },
  methods: {
    async fetchLessonPlans() {
      try {
        const response = await getAllLessonPlans();
        const formatted = response.map(item => {
          let mappedStatus = item.status;
          if (item.status === "Approved") mappedStatus = "Checked";
          else if (item.status === "Declined") mappedStatus = "For Review";
          return {
            id: item.LessonPlan_ID,
            teacher: item.TeacherName || `Teacher ${item.Teacher_ID}`,
            plan: item.lesson_plan_no,
            category: item.category,
            grade: item.grade_level,
            date: item.created_at ? new Date(item.created_at).toLocaleDateString() : "N/A",
            status: mappedStatus,
          };
        });
        this.lessons = formatted;

        this.cards[0].value = formatted.length;
        this.cards[1].value = formatted.filter(l => l.status === "Checked").length;
        this.cards[2].value = formatted.filter(l => l.status === "Pending").length;
        this.cards[3].value = formatted.filter(l => l.status === "For Review").length;
      } catch (error) {
        console.error("Error fetching lesson plans:", error);
      }
    },

    async openLessonModal(lesson) {
      try {
        // Fetch detailed lesson plan data by ID
        const detailedLessonPlan = await getLessonPlanById(lesson.id);

        // Assign fetched data to the modal prop
        this.selectedLesson = detailedLessonPlan;

        // Show the modal
        this.showModal = true;
      } catch (error) {
        console.error('Failed to fetch lesson plan details:', error);
        Swal.fire('Error', 'Failed to load lesson plan details.', 'error');
      }
    },

    closeLessonModal() {
      this.showModal = false;
      this.selectedLesson = null;
    },



async acceptAlert(lesson) {
  if (!lesson) return;

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to accept this?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, Accept',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    try {
      await approveLessonPlan(lesson.id);
      await this.fetchLessonPlans();
      this.closeLessonModal();

      Swal.fire({
        icon: 'success',
        title: 'Accepted',
        text: 'The lesson plan has been accepted successfully.',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to accept the lesson plan.',
      });
    }
  }
},


  async reject(lesson) {
    if (!lesson) return;

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
      try {
        await rejectLessonPlan(lesson.id);
        await this.fetchLessonPlans();
        this.closeLessonModal();

        Swal.fire({
          icon: 'success',
          title: 'Rejected',
          text: 'The lesson plan has been rejected successfully.',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to reject the lesson plan.',
        });
      }
    }
  }
},
  computed: {
    uniqueTeachers() {
      return [...new Set(this.lessons.map(l => l.teacher))].sort();
    },
    uniqueGrades() {
      return [...new Set(this.lessons.map(l => l.grade))].sort();
    },
    uniqueStatuses() {
      return [...new Set(this.lessons.map(l => l.status))].sort();
    },
    filteredLessons() {
      const search = this.searchQuery.toLowerCase();
      return this.lessons.filter(lesson => {
        const matchesSearch =
          lesson.teacher.toLowerCase().includes(search) ||
          lesson.plan.toLowerCase().includes(search) ||
          lesson.category.toLowerCase().includes(search) ||
          lesson.grade.toLowerCase().includes(search) ||
          lesson.status.toLowerCase().includes(search);

        const matchesTeacher = this.filters.teacher ? lesson.teacher === this.filters.teacher : true;
        const matchesGrade = this.filters.grade ? lesson.grade === this.filters.grade : true;
        const matchesStatus = this.filters.status ? lesson.status === this.filters.status : true;

        return matchesSearch && matchesTeacher && matchesGrade && matchesStatus;
      });
    },
    paginatedFilteredLessons() {
      const start = (this.currentPage - 1) * this.lessonsPerPage;
      return this.filteredLessons.slice(start, start + this.lessonsPerPage);
    },
    totalPages() {
      return Math.max(Math.ceil(this.filteredLessons.length / this.lessonsPerPage), 1);
    },
    pageNumbers() {
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

      for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
          range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    }
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.currentPage = 1;
      }
    },
    searchQuery() {
      this.currentPage = 1;
    }
  }
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
