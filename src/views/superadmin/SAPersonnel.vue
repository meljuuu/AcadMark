<template>
  <div class="container">
    <div class="nav-title">
      <h1>Personnel Setup</h1>
    </div>

    <div class="content">
      <div class="filtering-section">
        <div class="search-bar">
          <Dropdown
            :showAccess="true"
            @update:selectedAccess="selectedAccess = $event"
          />
          <input type="text" v-model="searchQuery" placeholder="Search..." />
        </div>

        <div class="buttons">
          <Buttons label="Add Faculty" @open-modal="showModal = true" />
        </div>
      </div>
  
      <div class="content">
        <div class="filtering-section">
          <div class="search-bar">
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

    <!-- Modal: conditionally rendered -->
    <Modal v-if="showModal" @close="showModal = false" />

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">← Previous</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next →</button>
    </div>
  </div>
  <br />
</template>

<script>
  import Dropdown from '@/SAcomponents/SAdropdown.vue';
  import Buttons from '@/SAcomponents/SAButtons.vue';
  import Modal from '@/SAcomponents/SAmodal.vue';

  export default {
    components: {
      Dropdown,
      Buttons,
      Modal,
    },
    data() {
      return {
        selectedAccess: '',
        searchQuery: '',
        showModal: false,
        personnel: [
          {
            employee: 'EMP001',
            name: 'Alice Johnson',
            qualification: 'MBA',
            access: 'Admin',
            email: 'alice.johnson@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP002',
            name: 'Bob Smith',
            qualification: 'MSc',
            access: 'Teacher',
            email: 'bob.smith@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP003',
            name: 'Carol White',
            qualification: 'PhD',
            access: 'Teacher',
            email: 'carol.white@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP004',
            name: 'David Brown',
            qualification: 'BSc',
            access: 'Admin',
            email: 'david.brown@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP005',
            name: 'Eva Green',
            qualification: 'MEd',
            access: 'Teacher',
            email: 'eva.green@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP006',
            name: 'Frank Black',
            qualification: 'BSc',
            access: 'Teacher',
            email: 'frank.black@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP007',
            name: 'Grace Lee',
            qualification: 'MBA',
            access: 'Admin',
            email: 'grace.lee@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP008',
            name: 'Henry Wilson',
            qualification: 'MSc',
            access: 'Teacher',
            email: 'henry.wilson@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP009',
            name: 'Isabel King',
            qualification: 'PhD',
            access: 'Teacher',
            email: 'isabel.king@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP010',
            name: 'Jackie Turner',
            qualification: 'MEd',
            access: 'Teacher',
            email: 'jackie.turner@example.com',
            status: 'Active',
          },

          {
            employee: 'EMP011',
            name: 'Kevin Scott',
            qualification: 'MBA',
            access: 'Admin',
            email: 'kevin.scott@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP012',
            name: 'Laura Adams',
            qualification: 'BSc',
            access: 'Teacher',
            email: 'laura.adams@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP013',
            name: 'Michael Evans',
            qualification: 'MSc',
            access: 'Teacher',
            email: 'michael.evans@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP014',
            name: 'Nina Collins',
            qualification: 'PhD',
            access: 'Admin',
            email: 'nina.collins@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP015',
            name: 'Oliver Young',
            qualification: 'BEd',
            access: 'Teacher',
            email: 'oliver.young@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP016',
            name: 'Patricia Hill',
            qualification: 'MEd',
            access: 'Teacher',
            email: 'patricia.hill@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP017',
            name: 'Quinn Lewis',
            qualification: 'MBA',
            access: 'Admin',
            email: 'quinn.lewis@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP018',
            name: 'Rachel Walker',
            qualification: 'BSc',
            access: 'Teacher',
            email: 'rachel.walker@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP019',
            name: 'Steven Harris',
            qualification: 'MSc',
            access: 'Teacher',
            email: 'steven.harris@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP020',
            name: 'Tina Martin',
            qualification: 'PhD',
            access: 'Teacher',
            email: 'tina.martin@example.com',
            status: 'Active',
          },

          {
            employee: 'EMP021',
            name: 'Uma Baker',
            qualification: 'MBA',
            access: 'Admin',
            email: 'uma.baker@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP022',
            name: 'Victor Carter',
            qualification: 'BEd',
            access: 'Teacher',
            email: 'victor.carter@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP023',
            name: 'Wendy Diaz',
            qualification: 'MEd',
            access: 'Teacher',
            email: 'wendy.diaz@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP024',
            name: 'Xander Fisher',
            qualification: 'MBA',
            access: 'Admin',
            email: 'xander.fisher@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP025',
            name: 'Yvonne Grant',
            qualification: 'BSc',
            access: 'Teacher',
            email: 'yvonne.grant@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP026',
            name: 'Zachary Howard',
            qualification: 'MSc',
            access: 'Teacher',
            email: 'zachary.howard@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP027',
            name: 'Angela Jenkins',
            qualification: 'PhD',
            access: 'Teacher',
            email: 'angela.jenkins@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP028',
            name: 'Brian Kelly',
            qualification: 'MEd',
            access: 'Teacher',
            email: 'brian.kelly@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP029',
            name: 'Cynthia Lopez',
            qualification: 'MBA',
            access: 'Admin',
            email: 'cynthia.lopez@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP030',
            name: 'Derek Morgan',
            qualification: 'BSc',
            access: 'Teacher',
            email: 'derek.morgan@example.com',
            status: 'Active',
          },

          {
            employee: 'EMP031',
            name: 'Ella Nelson',
            qualification: 'MSc',
            access: 'Teacher',
            email: 'ella.nelson@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP032',
            name: 'Fred Owens',
            qualification: 'PhD',
            access: 'Teacher',
            email: 'fred.owens@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP033',
            name: 'Gina Perez',
            qualification: 'MBA',
            access: 'Admin',
            email: 'gina.perez@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP034',
            name: 'Harry Quinn',
            qualification: 'BEd',
            access: 'Teacher',
            email: 'harry.quinn@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP035',
            name: 'Irene Roberts',
            qualification: 'MEd',
            access: 'Teacher',
            email: 'irene.roberts@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP036',
            name: 'James Stewart',
            qualification: 'MBA',
            access: 'Admin',
            email: 'james.stewart@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP037',
            name: 'Karen Thomas',
            qualification: 'BSc',
            access: 'Teacher',
            email: 'karen.thomas@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP038',
            name: 'Larry Underwood',
            qualification: 'MSc',
            access: 'Teacher',
            email: 'larry.underwood@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP039',
            name: 'Monica Vargas',
            qualification: 'PhD',
            access: 'Teacher',
            email: 'monica.vargas@example.com',
            status: 'Active',
          },
          {
            employee: 'EMP040',
            name: 'Nathan Williams',
            qualification: 'MEd',
            access: 'Teacher',
            email: 'nathan.williams@example.com',
            status: 'Active',
          },
        ],
        currentPage: 1,
        itemsPerPage: 20,
      };
    },
    computed: {
      filteredPersonnel() {
        const searchLower = this.searchQuery.toLowerCase();
        return this.personnel.filter((person) => {
          const matchesSearch =
            !this.searchQuery ||
            person.name.toLowerCase().includes(searchLower) ||
            person.employee.toLowerCase().includes(searchLower);

          const matchesAccess =
            this.selectedAccess === '' ||
            this.selectedAccess === 'All' ||
            person.access === this.selectedAccess;

          return matchesSearch && matchesAccess;
        });
      },
      totalPages() {
        return Math.ceil(this.filteredPersonnel.length / this.itemsPerPage);
      },
      paginatedPersonnel() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredPersonnel.slice(start, start + this.itemsPerPage);
      },
    },
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      handleOpenModal() {
        this.showModal = true;
      },
    },
  };
</script>

<style scoped>
  .container {
    width: 125%;
    padding: 10px;
    box-sizing: border-box;
  }

  .content {
    background-color: #ffffff;
    box-shadow:
      rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    padding: 30px 30px;
    border-radius: 5px;
  }

  .nav-title h1 {
    color: #295f98;
    font-weight: bold;
    font-size: 48px;
    padding: 0;
    margin: 0;
  }

  .filtering-section {
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .buttons {
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

  .status {
    min-width: 70px;
    display: inline-block;
  }

  .status.approved {
    background: #0c5a48;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    font-size: 12px;
  }
  .status.review {
    background-color: #fbdf5a;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    font-size: 12px;
  }

  .status.revised {
    background-color: #b32113;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    font-size: 12px;
  }

  .status.not-applicable {
    background-color: #7e7a79;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    font-size: 12px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .page {
    font-weight: bold;
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
  }

  .pagination button.active {
    background-color: #295f98;
    color: white;
  }

  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
