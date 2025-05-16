<template>
  <div class="container">
    <div class="nav-title">
      <h1>Personnel</h1>
    </div>

    <div class="content">
      <div class="filtering-section">
        <div class="search-bar">
          <Dropdown :showAccess="true" @update:selectedAccess="selectedAccess = $event" />
          <input type="text" v-model="searchQuery" placeholder="Search..." />
        </div>

        <div class="buttons">
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
            <tr v-for="student in paginatedStudents" :key="student.lrn">
              <td>{{ student.lrn }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.track }}</td>
              <td>
                <span :class="['status', student.status.toLowerCase().replace(' ', '-')]">
                  {{ student.status }}
                </span>
              </td>
              <td>{{ student.email }}</td>
              <td>Actions here</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
</template>

<script>
import Dropdown from "@/SAcomponents/SAdropdown.vue";

export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      selectedAccess: "",
      searchQuery: "",
      students: [], // You can fetch and populate this from an API
      currentPage: 1,
      itemsPerPage: 20,
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter((student) => {
        return (
          (!this.searchQuery ||
            student.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            student.lrn?.includes(this.searchQuery)) &&
          (!this.selectedAccess || student.status === this.selectedAccess)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
    },
    paginatedStudents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredStudents.slice(start, end);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
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

.content{
  background-color: #ffffff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
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
