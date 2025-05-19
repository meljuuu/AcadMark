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

  export default {
    data() {
        return {
        filters: {
            grade: '',
            curriculum: '',
            track: '',
            status: '',
        },
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 10,
        personnel: [
            { grade: 7,  curriculum: "K-12", track: "STEM",   section: "A",  adviser: "Mr. Alvin Cruz",        student: 32, date: "2024-06-03", status: "Active"  },
            { grade: 7,  curriculum: "BEC",  track: "ABM",    section: "B",  adviser: "Ms. Bianca Reyes",      student: 29, date: "2024-06-04", status: "Pending"  },
            { grade: 7,  curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Carlo Santos",      student: 24, date: "2024-05-30", status: "Inactive"},
            { grade: 7,  curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Dana Vicente",     student: 28, date: "2024-06-01", status: "Active"  },

            { grade: 8,  curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Mr. Edgar Ramos",       student: 31, date: "2024-06-02", status: "Active"  },
            { grade: 8,  curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Ms. Faith Molina",      student: 26, date: "2024-06-05", status: "Inactive"},
            { grade: 8,  curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Gary Flores",       student: 27, date: "2024-05-28", status: "Active"  },
            { grade: 8,  curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Hazel Abad",       student: 30, date: "2024-05-31", status: "Pending"  },

            { grade: 9,  curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Mr. Ivan Torres",       student: 33, date: "2024-06-03", status: "Inactive"},
            { grade: 9,  curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Ms. Jane Lim",          student: 25, date: "2024-06-04", status: "Active"  },
            { grade: 9,  curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Kent Navarro",      student: 23, date: "2024-06-01", status: "Pending"  },
            { grade: 9,  curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Liza Bautista",    student: 30, date: "2024-05-29", status: "Inactive"},

            { grade: 10, curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Mr. Mark Sevilla",      student: 34, date: "2024-06-02", status: "Active"  },
            { grade: 10, curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Ms. Nica Herrera",      student: 28, date: "2024-06-05", status: "Active"  },
            { grade: 10, curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Oscar Dizon",       student: 26, date: "2024-05-30", status: "Inactive"},
            { grade: 10, curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Paula Gomez",      student: 29, date: "2024-05-31", status: "Active"  },

            { grade: 11, curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Mr. Quinn Rivera",      student: 35, date: "2024-06-03", status: "Active"  },
            { grade: 11, curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Ms. Rina Alvarez",      student: 30, date: "2024-06-04", status: "Inactive"},
            { grade: 11, curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Mr. Simon Velasco",     student: 22, date: "2024-06-01", status: "Active"  },
            { grade: 11, curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mrs. Tina Cuevas",      student: 31, date: "2024-05-29", status: "Active"  },

            { grade: 11, curriculum: "K-12",track: "STEM",   section: "E",  adviser: "Ms. Uma Magno",         student: 28, date: "2024-06-06", status: "Active"  },
            { grade: 11, curriculum: "BEC", track: "ABM",    section: "F",  adviser: "Mr. Vince Carreon",     student: 27, date: "2024-06-07", status: "Inactive"},
            { grade: 11, curriculum: "SPED",track: "TVL",    section: "G",  adviser: "Ms. Wendy Perez",       student: 24, date: "2024-06-03", status: "Pending"  },
            { grade: 11, curriculum: "K-12",track: "HUMSS",  section: "H",  adviser: "Mr. Xavier Uy",         student: 32, date: "2024-06-02", status: "Active"  },

            { grade: 12, curriculum: "K-12",track: "STEM",   section: "A",  adviser: "Ms. Yna De Guzman",     student: 36, date: "2024-06-04", status: "Active"  },
            { grade: 12, curriculum: "BEC", track: "ABM",    section: "B",  adviser: "Mr. Zach Lopez",        student: 29, date: "2024-06-05", status: "Inactive"},
            { grade: 12, curriculum: "SPED",track: "TVL",    section: "C",  adviser: "Ms. Abby Soriano",      student: 25, date: "2024-06-01", status: "Active"  },
            { grade: 12, curriculum: "K-12",track: "HUMSS",  section: "D",  adviser: "Mr. Ben Santos",        student: 30, date: "2024-05-30", status: "Pending"  },

            { grade: 12, curriculum: "K-12",track: "STEM",   section: "E",  adviser: "Mrs. Carla Ramos",      student: 33, date: "2024-06-06", status: "Active"  },
            { grade: 12, curriculum: "BEC", track: "ABM",    section: "F",  adviser: "Mr. Derek Sison",       student: 28, date: "2024-06-07", status: "Inactive"},
            { grade: 12, curriculum: "SPED",track: "TVL",    section: "G",  adviser: "Ms. Ella Villanueva",   student: 26, date: "2024-06-03", status: "Pending"  },
            { grade: 12, curriculum: "K-12",track: "HUMSS",  section: "H",  adviser: "Mr. Felix Robles",      student: 31, date: "2024-06-02", status: "Active"  },

            { grade: 9,  curriculum: "K-12",track: "STEM",   section: "E",  adviser: "Ms. Gail Vallar",       student: 28, date: "2024-06-08", status: "Inactive"},
            { grade: 10, curriculum: "BEC", track: "ABM",    section: "E",  adviser: "Mr. Hugo Reyes",        student: 27, date: "2024-06-09", status: "Active"  },
            { grade: 8,  curriculum: "SPED",track: "TVL",    section: "E",  adviser: "Ms. Iris Villa",        student: 23, date: "2024-06-10", status: "Inactive"},
            { grade: 7,  curriculum: "K-12",track: "HUMSS",  section: "E",  adviser: "Mr. Jake Santos",       student: 29, date: "2024-06-05", status: "Pending"  },

            { grade: 10, curriculum: "K-12",track: "STEM",   section: "F",  adviser: "Mrs. Kara Del Rosario", student: 30, date: "2024-06-06", status: "Pending"  },
            { grade: 11, curriculum: "BEC", track: "ABM",    section: "I",  adviser: "Mr. Leo Ramos",         student: 28, date: "2024-06-07", status: "Inactive"},
            { grade: 7,  curriculum: "SPED",track: "TVL",    section: "F",  adviser: "Ms. Mona Cruz",         student: 24, date: "2024-06-08", status: "Active"  },
            { grade: 9,  curriculum: "K-12",track: "HUMSS",  section: "F",  adviser: "Mr. Noel Pascual",      student: 30, date: "2024-06-09", status: "Active"  }
        ],
      };
    },
     computed: {
        uniqueGrades() {
        return [...new Set(this.personnel.map((p) => p.grade))].sort((a, b) => a - b);
        },
        uniqueCurriculums() {
        return [...new Set(this.personnel.map((p) => p.curriculum))].sort();
        },
        uniqueTracks() {
        return [...new Set(this.personnel.map((p) => p.track))].sort();
        },
        uniqueStatuses() {
        return [...new Set(this.personnel.map((p) => p.status))].sort();
        },
        filteredPersonnel() {
        return this.personnel.filter((p) => {
            const matchesGrade = this.filters.grade ? p.grade == this.filters.grade : true;
            const matchesCurriculum = this.filters.curriculum ? p.curriculum === this.filters.curriculum : true;
            const matchesTrack = this.filters.track ? p.track === this.filters.track : true;
            const matchesStatus = this.filters.status ? p.status === this.filters.status : true;

            const search = this.searchQuery.trim().toLowerCase();
            const matchesSearch = search
            ? (
                p.grade.toString() +
                ' ' +
                p.curriculum +
                ' ' +
                p.track +
                ' ' +
                p.section +
                ' ' +
                p.adviser +
                ' ' +
                p.student.toString() +
                ' ' +
                p.date +
                ' ' +
                p.status
                )
                .toLowerCase()
                .includes(search)
            : true;

            return matchesGrade && matchesCurriculum && matchesTrack && matchesStatus && matchesSearch;
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
        const baseClass = 'inline-block w-[100px] text-center px-2 py-1 text-white rounded-lg text-sm font-medium';

        switch (status) {
            case 'Active':
            return `${baseClass} bg-green-600`;
            case 'Pending':
            return `${baseClass} bg-yellow-500`;
            case 'Inactive':
            return `${baseClass} bg-red-600`;
            default:
            return `${baseClass} bg-gray-400`;
        }
        }
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

.text-white {
  color: white;
}

.text-black {
  color: black;
}
</style>
