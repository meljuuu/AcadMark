<template>
  <div class="container">
    <div class="nav-title">
      <h1>Personnel Setup</h1>
    </div>

    <div class="content">
      <div class="filtering-section">

        <div class="filter">
          <Dropdown
            :showStatus="true"
            @update:selectedStatus="selectedStatus = $event"
          />

          <Dropdown
            :showGrade="true"
            @update:selectedGrade="selectedGrade = $event"
          />

          <Dropdown
            :showCurriculum="true"
            @update:selectedCurriculum="selectedCurriculum = $event"
          />

          <Dropdown
            :showTrack="true"
            @update:selectedTrack="selectedTrack = $event"
          />
        </div>

        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Search..." />
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>GRADE LEVEL</th>
              <th>CURRICULUM</th>
              <th>TRACK</th>
              <th>CLASS SECTION</th>
              <th>CLASS ADVISER</th>
              <th>STUDENT ADDED</th>
              <th>DATE ADDED</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="personnel in paginatedPersonnel"
              :key="personnel.employee"
            >
              <td>
                <input type="checkbox" />
              </td>
              <td>{{ personnel.grade }}</td>
              <td>{{ personnel.curriculum }}</td>
              <td>{{ personnel.track }}</td>
              <td>{{ personnel.section }}</td>
              <td>{{ personnel.adviser }}</td>
              <td>{{ personnel.student }}</td>
              <td>{{ personnel.date }}</td>
              <td>{{ personnel.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal: conditionally rendered -->
    <Modal v-if="showModal" @close="showModal = false" />

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        ← Previous
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next →
      </button>
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
  /*   1 */ { grade: 7,  curriculum: "K-12", track: "STEM",   section: "A",  adviser: "Mr. Alvin Cruz",        student: 32, date: "2024-06-03", status: "Active"  },
  /*   2 */ { grade: 7,  curriculum: "BEC",  track: "ABM",    section: "B",  adviser: "Ms. Bianca Reyes",      student: 29, date: "2024-06-04", status: "Active"  },
  /*   3 */ { grade: 7,  curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Carlo Santos",      student: 24, date: "2024-05-30", status: "Inactive"},
  /*   4 */ { grade: 7,  curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Dana Vicente",     student: 28, date: "2024-06-01", status: "Active"  },

  /*   5 */ { grade: 8,  curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Mr. Edgar Ramos",       student: 31, date: "2024-06-02", status: "Active"  },
  /*   6 */ { grade: 8,  curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Ms. Faith Molina",      student: 26, date: "2024-06-05", status: "Inactive"},
  /*   7 */ { grade: 8,  curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Gary Flores",       student: 27, date: "2024-05-28", status: "Active"  },
  /*   8 */ { grade: 8,  curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Hazel Abad",       student: 30, date: "2024-05-31", status: "Active"  },

  /*   9 */ { grade: 9,  curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Mr. Ivan Torres",       student: 33, date: "2024-06-03", status: "Inactive"},
  /*  10 */ { grade: 9,  curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Ms. Jane Lim",          student: 25, date: "2024-06-04", status: "Active"  },
  /*  11 */ { grade: 9,  curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Kent Navarro",      student: 23, date: "2024-06-01", status: "Active"  },
  /*  12 */ { grade: 9,  curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Liza Bautista",    student: 30, date: "2024-05-29", status: "Inactive"},

  /*  13 */ { grade: 10, curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Mr. Mark Sevilla",      student: 34, date: "2024-06-02", status: "Active"  },
  /*  14 */ { grade: 10, curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Ms. Nica Herrera",      student: 28, date: "2024-06-05", status: "Active"  },
  /*  15 */ { grade: 10, curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Oscar Dizon",       student: 26, date: "2024-05-30", status: "Inactive"},
  /*  16 */ { grade: 10, curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Paula Gomez",      student: 29, date: "2024-05-31", status: "Active"  },

  /*  17 */ { grade: 11, curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Mr. Quinn Rivera",      student: 35, date: "2024-06-03", status: "Active"  },
  /*  18 */ { grade: 11, curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Ms. Rina Alvarez",      student: 30, date: "2024-06-04", status: "Inactive"},
  /*  19 */ { grade: 11, curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Simon Velasco",     student: 22, date: "2024-06-01", status: "Active"  },
  /*  20 */ { grade: 11, curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Tina Cuevas",      student: 31, date: "2024-05-29", status: "Active"  },

  /*  21 */ { grade: 11, curriculum: "K-12",track: "STEM",   section: "E",  adviser: "Ms. Uma Magno",         student: 28, date: "2024-06-06", status: "Active"  },
  /*  22 */ { grade: 11, curriculum: "BEC", track: "ABM",    section: "F",  adviser: "Mr. Vince Carreon",     student: 27, date: "2024-06-07", status: "Inactive"},
  /*  23 */ { grade: 11, curriculum: "SPED",track: "TVL",    section: "G",  adviser: "Ms. Wendy Perez",       student: 24, date: "2024-06-03", status: "Active"  },
  /*  24 */ { grade: 11, curriculum: "K-12",track: "HUMSS",  section: "H",  adviser: "Mr. Xavier Uy",         student: 32, date: "2024-06-02", status: "Active"  },

  /*  25 */ { grade: 12, curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Ms. Yna De Guzman",     student: 36, date: "2024-06-04", status: "Active"  },
  /*  26 */ { grade: 12, curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Mr. Zach Lopez",        student: 29, date: "2024-06-05", status: "Inactive"},
  /*  27 */ { grade: 12, curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Ms. Abby Soriano",      student: 25, date: "2024-06-01", status: "Active"  },
  /*  28 */ { grade: 12, curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mr. Ben Santos",        student: 30, date: "2024-05-30", status: "Active"  },

  /*  29 */ { grade: 12, curriculum: "K-12",track: "STEM",   section: "E",  adviser: "Mrs. Carla Ramos",      student: 33, date: "2024-06-06", status: "Active"  },
  /*  30 */ { grade: 12, curriculum: "BEC", track: "ABM",    section: "F",  adviser: "Mr. Derek Sison",       student: 28, date: "2024-06-07", status: "Inactive"},
  /*  31 */ { grade: 12, curriculum: "SPED",track: "TVL",    section: "G",  adviser: "Ms. Ella Villanueva",   student: 26, date: "2024-06-03", status: "Active"  },
  /*  32 */ { grade: 12, curriculum: "K-12",track: "HUMSS",  section: "H",  adviser: "Mr. Felix Robles",      student: 31, date: "2024-06-02", status: "Active"  },

  /*  33 */ { grade: 9,  curriculum: "K-12",track: "STEM",   section: "E",  adviser: "Ms. Gail Vallar",       student: 28, date: "2024-06-08", status: "Inactive"},
  /*  34 */ { grade: 10, curriculum: "BEC", track: "ABM",    section: "E",  adviser: "Mr. Hugo Reyes",        student: 27, date: "2024-06-09", status: "Active"  },
  /*  35 */ { grade: 8,  curriculum: "SPED",track: "TVL",    section: "E",  adviser: "Ms. Iris Villa",        student: 23, date: "2024-06-10", status: "Inactive"},
  /*  36 */ { grade: 7,  curriculum: "K-12",track: "HUMSS",  section: "E",  adviser: "Mr. Jake Santos",       student: 29, date: "2024-06-05", status: "Active"  },

  /*  37 */ { grade: 10, curriculum: "K-12",track: "STEM",   section: "F",  adviser: "Mrs. Kara Del Rosario", student: 30, date: "2024-06-06", status: "Active"  },
  /*  38 */ { grade: 11, curriculum: "BEC", track: "ABM",    section: "I",  adviser: "Mr. Leo Ramos",         student: 28, date: "2024-06-07", status: "Inactive"},
  /*  39 */ { grade: 7,  curriculum: "SPED",track: "TVL",    section: "F",  adviser: "Ms. Mona Cruz",         student: 24, date: "2024-06-08", status: "Active"  },
  /*  40 */ { grade: 9,  curriculum: "K-12",track: "HUMSS",  section: "F",  adviser: "Mr. Noel Pascual",      student: 30, date: "2024-06-09", status: "Active"  }
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

  .filter {
    display: flex;
    gap: 20px;
    align-items: center;
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