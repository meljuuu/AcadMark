<template>
    <div class="container">
      <div class="nav-title">
        <h1>Personnel</h1>
      </div>
  
      <div class="content">
        <div class="filtering-section">
          <div class="search-bar">
            <Dropdown
              :showAccess="true"
              @update:modelValue="selectedAccess = $event"
            />
            <input type="text" v-model="searchQuery" placeholder="Search..." />
            <!-- Uncomment these when you have the components and modals ready -->
            <!--
            <Buttons @click="openAddModal" />
            <ImportClassListButton @click="openImportModal" />
            <Modal ref="addModalRef" />
            -->
          </div>
        </div>
  
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>NAME</th>
                <th>QUALIFICATION</th>
                <th>ACCESS</th>
                <th>EMAIL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(student, index) in paginatedStudents"
                :key="student.lrn"
                @click="showUnReleasedModal(student)"
              >
                <td>{{ student.lrn }}</td>
                <td>{{ student.name }}</td>
                <td>{{ student.track }}</td>
                <td>{{ student.curriculum }}</td>
                <td>{{ student.batch }}</td>
                <td>
                  <span :class="['status', student.status.toLowerCase().replace(/\s+/g, '-')]">
                    {{ student.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="filteredStudents.length === 0">
                <td colspan="6" style="text-align:center; padding: 20px;">No results found.</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="pagination" v-if="totalPages > 1">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Prev
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>
          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
  
        <!-- Example modal placeholder -->
        <div v-if="modalVisible" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content">
            <h3>Student Details</h3>
            <p><strong>Employee</strong> {{ modalStudent.lrn }}</p>
            <p><strong>Name</strong> {{ modalStudent.name }}</p>
            <p><strong>Qualification</strong> {{ modalStudent.track }}</p>
            <p><strong>Access</strong> {{ modalStudent.curriculum }}</p>
            <p><strong>Email</strong> {{ modalStudent.batch }}</p>
            <p><strong>Action</strong> {{ modalStudent.status }}</p>
            <button @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    components: {
      Dropdown,
    },
    data() {
      return {
        searchQuery: '',
        selectedAccess: '',
        currentPage: 1,
        pageSize: 10,
        modalVisible: false,
        modalStudent: {},
        // Example dataset for demonstration
        students: [
          {
            lrn: '1234567890',
            name: 'John Doe',
            track: 'STEM',
            curriculum: 'SHS',
            batch: '2023',
            status: 'Approved',
            access: 'Admin',
          },
          {
            lrn: '0987654321',
            name: 'Jane Smith',
            track: 'ABM',
            curriculum: 'JHS',
            batch: '2024',
            status: 'Review',
            access: 'Teacher',
          },
          // Add more sample students here
        ],
      };
    },
    computed: {
      filteredStudents() {
        // Filter by search query (name or LRN) and by selectedAccess
        return this.students.filter((student) => {
          const matchesSearch =
            student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            student.lrn.includes(this.searchQuery);
          const matchesAccess = this.selectedAccess
            ? student.access.toLowerCase() === this.selectedAccess.toLowerCase()
            : true;
          return matchesSearch && matchesAccess;
        });
      },
      totalPages() {
        return Math.ceil(this.filteredStudents.length / this.pageSize);
      },
      paginatedStudents() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.filteredStudents.slice(start, start + this.pageSize);
      },
    },
    watch: {
      searchQuery() {
        this.currentPage = 1;
      },
      selectedAccess() {
        this.currentPage = 1;
      },
    },
    methods: {
      goToPage(page) {
        this.currentPage = page;
      },
      showUnReleasedModal(student) {
        this.modalStudent = student;
        this.modalVisible = true;
      },
      closeModal() {
        this.modalVisible = false;
        this.modalStudent = {};
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    width: 125%;
    box-sizing: border-box;
  }
  
  .nav-title h1 {
    color: #295f98;
    font-weight: bold;
    font-size: 48px;
    padding: 0;
    margin: 0;
  }
  
  .content {
    padding: 30px 30px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 5px;
    box-shadow:
      rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
  
  .filtering-section {
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .filters {
    display: flex;
    gap: 10px;
  }
  .filter-dropdown {
    padding: 15px 20px;
    width: 160px;
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
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M14 7l-5 5 5 5V7z'/></svg>");
  }
  
  .filter-dropdown:focus {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M7 10l5 5 5-5H7z'/></svg>");
  }
  
  .search-bar {
    display: flex;
    gap: 10px;
  }
  
  .search-bar input {
    padding: 8px;
    border: 1px solid #295f98;
    border-radius: 5px;
    width: 250px;
  }
  
  .add-student {
    background: #295f98;
    color: #fff;
    border: none;
    padding: 15px 20px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .table-container {
    background: #fff;
    border-radius: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 600px;
    box-shadow:
      rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border: 1px solid #ddd;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
  }
  
  th {
    padding-top: 20px;
    background: #295f98;
    color: white;
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
  
  .status {
    min-width: 70px;
    display: inline-block;
    padding: 5px 20px;
    border-radius: 5px;
    font-size: 12px;
    color: white;
    text-transform: capitalize;
  }
  
  .status.approved {
    background: #0c5a48;
  }
  
  .status.review {
    background-color: #fbdf5a;
    color: #333;
  }
  
  .status.revised {
    background-color: #b32113;
  }
  
  .status.not-applicable {
    background-color: #7e7a79;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination button {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 8px 12px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .pagination button.active {
    background-color: #295f98;
    color: white;
  }
  
  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background: white;
    padding: 20px 30px;
    border-radius: 10px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }
  .modal-content button {
    margin-top: 20px;
    background-color: #295f98;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  