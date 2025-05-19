<template>
    <div class="w-full">
        <h1 class="text-5xl font-bold mb-6">Classes</h1>

        <div class="bg-white shadow-lg border border-gray-200 rounded-lg p-6 mb-6 flex flex-col" style="height: 865px;">
           <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
            <!-- Filters on the left -->
                <div class="filters flex gap-4 flex-wrap">
                    <select class="filter-dropdown" v-model="filters.grade" @change="handleChange">
                    <option value="">All Grades</option>
                    <option v-for="grade in uniqueGrades" :key="grade" :value="grade">{{ grade }}</option>
                    </select>

                    <select class="filter-dropdown" v-model="filters.curriculum" @change="handleChange">
                    <option value="">All Curriculums</option>
                    <option v-for="curriculum in uniqueCurriculums" :key="curriculum" :value="curriculum">{{ curriculum }}</option>
                    </select>

                    <select class="filter-dropdown" v-model="filters.track" @change="handleChange">
                    <option value="">All Tracks</option>
                    <option v-for="track in uniqueTracks" :key="track" :value="track">{{ track }}</option>
                    </select>

                    <select class="filter-dropdown" v-model="filters.status" @change="handleChange">
                    <option value="">All Statuses</option>
                    <option v-for="status in uniqueStatuses" :key="status" :value="status">{{ status }}</option>
                    </select>
                </div>

                <!-- Search bar on the right -->
                <div class="search-bar" style="position: relative; min-width: 200px; max-width: 300px; flex-shrink: 0;">
                    <input
                    type="text"
                    placeholder="Search..."
                    v-model="searchQuery"
                    @input="handleChange"
                    style="padding-left: 30px; width: 100%;"
                    />
                    <i class="fa fa-search" style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%); color: #888;"></i>
                </div>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                        <th class="border-b border-gray-300"></th>
                        <th class="border-b border-gray-300">Grade Level</th>
                        <th class="border-b border-gray-300">Curriculum</th>
                        <th class="border-b border-gray-300">Track</th>
                        <th class="border-b border-gray-300">Class Section</th>
                        <th class="border-b border-gray-300">Class Advisory</th>
                        <th class="border-b border-gray-300">Student Added</th>
                        <th class="border-b border-gray-300">Date Added</th>
                        <th class="border-b border-gray-300">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="personnel in paginatedPersonnel" :key="personnel.section + personnel.adviser">
                            <td class="px-6 py-4 border-b border-gray-300"><input type="checkbox" /></td>
                            <td class="px-6 py-4 border-b border-gray-300">{{ personnel.grade }}</td>
                            <td class="px-6 py-4 border-b border-gray-300">{{ personnel.curriculum }}</td>
                            <td class="px-6 py-4 border-b border-gray-300">{{ personnel.track }}</td>
                            <td class="px-6 py-4 border-b border-gray-300">{{ personnel.section }}</td>
                            <td class="px-6 py-4 border-b border-gray-300">{{ personnel.adviser }}</td>
                            <td class="px-6 py-4 border-b border-gray-300">{{ personnel.student }}</td>
                            <td class="px-6 py-4 border-b border-gray-300">{{ personnel.date }}</td>
                            <td class="px-6 py-4 border-b border-gray-300">
                                <span :class="statusClass(personnel.status)">
                                    {{ personnel.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center items-center mt-4 space-x-1 pt-4 border-t border-gray-300">
                <button
                    class="px-3 border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                    @click="prevPage"
                    :disabled="currentPage === 1"
                >
                    ← Previous
                </button>
                
                <button
                    v-for="page in totalPages"
                    :key="page"
                    class="py-1 border border-[#295F98] rounded w-10 text-center"
                    :class="[
                        page === currentPage ? 'bg-[#295F98] text-white' : 'text-gray-600',
                        page === '...' ? 'cursor-default' : 'cursor-pointer',
                        currentPage === page ? 'active' : '',
                    ]"
                    @click="page !== '...' && (currentPage = page)"
                >
                    {{ page }}
                </button>
                
                <button
                    class="px-3 border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                >
                    Next →
                </button>
            </div>
            
        </div>
    </div>
</template>

<script>
import { getClassesWithStudentCount } from "@/service/superadminService";

export default {
  data() {
    return {
      rawClasses: [],
      currentPage: 1,
      itemsPerPage: 5,
      searchQuery: "",
      filters: {
        grade: "",
        curriculum: "",
        track: "",
        status: "",
      },
    };
  },
  computed: {
    personnel() {
      return this.rawClasses
        .map(item => ({
          grade: item.Grade_Level,
          curriculum: item.Curriculum,
          track: item.Track,
          section: item.Section,
          adviser: item.adviser
          ? `${item.adviser.FirstName} ${item.adviser.MiddleName} ${item.adviser.LastName}`
          : "N/A",
          student: item.student_added ?? 0,
          date: new Date(item.created_at).toLocaleDateString(),
          status: item.Status,
        }))
        .filter(item => {
          const matchesGrade = this.filters.grade ? item.grade === this.filters.grade : true;
          const matchesCurriculum = this.filters.curriculum ? item.curriculum === this.filters.curriculum : true;
          const matchesTrack = this.filters.track ? item.track === this.filters.track : true;
          const matchesStatus = this.filters.status ? item.status === this.filters.status : true;
          const matchesSearch = Object.values(item).some(val =>
            String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          return matchesGrade && matchesCurriculum && matchesTrack && matchesStatus && matchesSearch;
        });
    },
    paginatedPersonnel() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.personnel.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.personnel.length / this.itemsPerPage);
    },
    uniqueGrades() {
      return [...new Set(this.rawClasses.map(c => c.Grade_Level).filter(Boolean))];
    },
    uniqueCurriculums() {
      return [...new Set(this.rawClasses.map(c => c.Curriculum).filter(Boolean))];
    },
    uniqueTracks() {
      return [...new Set(this.rawClasses.map(c => c.Track).filter(Boolean))];
    },
    uniqueStatuses() {
      return [...new Set(this.rawClasses.map(c => c.Status).filter(Boolean))];
    },
  },
  methods: {
    async fetchClasses() {
      try {
        const data = await getClassesWithStudentCount();
        this.rawClasses = data;
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    },
    handleChange() {
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    statusClass(status) {
      switch (status?.toLowerCase()) {
        case "active":
          return "text-green-600 font-semibold";
        case "inactive":
          return "text-red-600 font-semibold";
        default:
          return "text-gray-600 font-semibold";
      }
    },
  },
  mounted() {
    this.fetchClasses();
  },
};
</script>





<style scoped>
.container {
  width: 125%;
  padding: 10px;
  box-sizing: border-box;
}


.nav-title h1 {
  color: #295f98;
  font-weight: bold;
  font-size: 48px;
  padding: 0;
  margin: 0;
}

.filters {
  display: flex;
  align-items: center;
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

.search-bar {
  position: relative; /* needed for absolute icon */
  margin-left: auto;  /* pushes search bar right */
  width: 300px;       /* fixed width or min/max */
}

.search-bar input { 
  padding: 8px 8px 8px 30px; /* left padding to fit icon */
  border: 1px solid #295f98;
  border-radius: 5px;
  width: 100%;
}

.search-bar i {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #295f98;
}

.table-container {
  flex: 1; /* Fills the remaining space */
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 700px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: center;
  font-size: 14px;
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

.bg-green {
  background-color: #28a745;
}

.bg-red {
  background-color: #dc3545;
}

.bg-yellow {
  background-color: #ffc107;
}
.status-active {
  font-weight: 600;
  color: #16a34a; /* green-600 */
}

.status-pending {
  font-weight: 600;
  color: #eab308; /* yellow-500 */
}

.status-inactive {
  font-weight: 600;
  color: #dc2626; /* red-600 */
}

.status-default {
  font-weight: 600;
  color: #9ca3af; /* gray-400 */
}

.text-black {
  color: black;
}
</style>
