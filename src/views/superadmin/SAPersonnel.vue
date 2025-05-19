<template>
  <div class="w-full">
    <h1 class="text-5xl font-bold mb-6">Personnel Setup</h1>
    <div class="bg-white shadow-lg border border-gray-200 rounded-lg p-6 mb-6 flex flex-col" style="height: 880px;">
        <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div class="flex gap-4 flex-wrap items-center">
              <div class="filters">
                  <select v-model="selectedAccess" class="filter-dropdown">
                      <option value="">All Access</option>
                      <option value="Admin">Admin</option>
                      <option value="Teacher">Teacher</option>
                  </select>
              </div>

              <div class="relative">
                  <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search..."
                  class="border border-[#295f98] rounded px-10 py-2 "
                  />
                  <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
          </div>


          <button
            @click="showModal = true"
            class="bg-[#295f98] text-white px-4 py-2 rounded hover:bg-blue-900 whitespace-nowrap cursor-pointer"
          >
            Add Faculty
          </button>

          <!-- Import & Use the Modal -->
          <AddFacultyModal
            v-model="showModal"
            @submit="handleFacultySubmit"
          />
        </div>

        <EditFacultyModal
          v-if="editData"
          v-model="showEditModal"
          @submit="handleFacultyEdit"
        />

        <div class="overflow-x-auto flex-1 overflow-y-auto" style="min-height: 0;">
          <table class="w-full table-auto border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-6 py-3 text-left font-medium text-gray-700 border-b border-gray-300">
                  Employee No.
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700 border-b border-gray-300" >
                  Name
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700 border-b border-gray-300">     
                  Qualification
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700 border-b border-gray-300">
                  Access
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700 border-b border-gray-300">
                  Email
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700 border-b border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(employee, index) in paginatedEmployees"
                :key="index"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 border-b border-gray-300">
                  {{ employee.empNo }}
                </td>
                <td class="px-6 py-4 border-b border-gray-300">
                  {{ employee.name }}
                </td>
                <td class="px-6 py-4 border-b border-gray-300">
                  {{ employee.qualification }}
                </td>
                <td class="px-6 py-4 border-b border-gray-300">
                  {{ employee.access }}
                </td>
                <td class="px-6 py-4 border-b border-gray-300">
                  {{ employee.email }}
                </td>
                <td class="px-6 py-4 border-b border-gray-300 space-x-2">
                  <button
                    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                    @click="openEditModal(employee)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>

                  <button
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    @click="confirmDelete(employee)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
import { ref } from 'vue';
import Swal from 'sweetalert2';
import AddFacultyModal from './components/AddFacultyModal.vue';
import EditFacultyModal from './components/EditFacultyModal.vue';

<<<<<<< Updated upstream

export default {
  components: {
  AddFacultyModal,
  EditFacultyModal,
=======
export default {
  components: {
    AddFacultyModal,
    EditFacultyModal,
>>>>>>> Stashed changes
  },
  data() {
    return {
      showModal: false,
      showEditModal: false,
      editData: null,
      currentPage: 1,
      perPage: 10,
      selectedAccess: '',
      searchQuery: '',
      employees: [
        { empNo: 'EMP001', name: 'John Doe', qualification: 'BSEd - English', access: 'Teacher', email: 'john@example.com' },
        { empNo: 'EMP002', name: 'Jane Smith', qualification: 'BSEd - Math', access: 'Admin', email: 'jane@example.com' },
        { empNo: 'EMP003', name: 'Alice Johnson', qualification: 'BSEd - Science', access: 'Teacher', email: 'alice@example.com' },
        { empNo: 'EMP004', name: 'Mark Lee', qualification: 'BSEd - Filipino', access: 'Teacher', email: 'mark@example.com' },
        { empNo: 'EMP005', name: 'Ella Cruz', qualification: 'BSEd - English', access: 'Admin', email: 'ella@example.com' },
        { empNo: 'EMP006', name: 'Chris Evans', qualification: 'BSEd - Math', access: 'Teacher', email: 'chris@example.com' },
        { empNo: 'EMP007', name: 'Marie Gomez', qualification: 'BSEd - Science', access: 'Teacher', email: 'marie@example.com' },
        { empNo: 'EMP008', name: 'Nathan Reyes', qualification: 'BSEd - Filipino', access: 'Admin', email: 'nathan@example.com' },
        { empNo: 'EMP009', name: 'Sophia Tan', qualification: 'BSEd - English', access: 'Teacher', email: 'sophia@example.com' },
        { empNo: 'EMP010', name: 'Leo Cruz', qualification: 'BSEd - Math', access: 'Teacher', email: 'leo@example.com' },
        { empNo: 'EMP011', name: 'Angela Torres', qualification: 'BSEd - Science', access: 'Teacher', email: 'angela@example.com' },
        { empNo: 'EMP012', name: 'Victor Santos', qualification: 'BSEd - Filipino', access: 'Admin', email: 'victor@example.com' },
        { empNo: 'EMP013', name: 'Bea Lim', qualification: 'BSEd - English', access: 'Teacher', email: 'bea@example.com' },
        { empNo: 'EMP014', name: 'Joshua Dela Cruz', qualification: 'BSEd - Math', access: 'Teacher', email: 'joshua@example.com' },
        { empNo: 'EMP015', name: 'Rica Ramirez', qualification: 'BSEd - Science', access: 'Admin', email: 'rica@example.com' },
        { empNo: 'EMP016', name: 'Kevin Chua', qualification: 'BSEd - Filipino', access: 'Teacher', email: 'kevin@example.com' },
        { empNo: 'EMP017', name: 'Mika Santos', qualification: 'BSEd - English', access: 'Teacher', email: 'mika@example.com' },
        { empNo: 'EMP018', name: 'Daniel Gomez', qualification: 'BSEd - Math', access: 'Admin', email: 'daniel@example.com' },
        { empNo: 'EMP019', name: 'Hannah Uy', qualification: 'BSEd - Science', access: 'Teacher', email: 'hannah@example.com' },
        { empNo: 'EMP020', name: 'Ivan De Leon', qualification: 'BSEd - Filipino', access: 'Teacher', email: 'ivan@example.com' },
      ],
    };
  },
  methods: {
    handleFacultySubmit(name) {
      console.log('Faculty submitted:', name);
    },
    openEditModal(employee) {
      this.editData = { ...employee };
      this.showEditModal = true;
    },
    handleFacultyEdit(updatedData) {
      console.log('Faculty updated:', updatedData);
      const index = this.employees.findIndex(emp => emp.empNo === updatedData.empNo);
      if (index !== -1) {
        this.employees[index] = { ...updatedData };
      }
      this.showEditModal = false;
    },
    confirmDelete(employee) {
      Swal.fire({
        title: 'Are you sure?',
        text: `Delete employee ${employee.name}? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.employees = this.employees.filter(emp => emp.empNo !== employee.empNo);
          Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
        }
      });
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.perPage);
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredEmployees.slice(start, start + this.perPage);
    },
    filteredEmployees() {
      const query = this.searchQuery.toLowerCase();
      return this.employees.filter((employee) => {
        const matchesAccess =
          this.selectedAccess === '' || employee.access === this.selectedAccess;

        const matchesSearch =
          employee.empNo.toLowerCase().includes(query) ||
          employee.name.toLowerCase().includes(query) ||
          employee.qualification.toLowerCase().includes(query) ||
          employee.access.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query);

        return matchesAccess && matchesSearch;
      });
    },
    pageNumbers() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;

      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        if (current > 3) pages.push('...');
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if (current < total - 2) pages.push('...');
        pages.push(total);
      }
      return pages;
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
  width: 210px;
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
