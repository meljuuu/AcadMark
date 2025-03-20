<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="title">Classes</h1>
      <div class="flex space-x-2 items-center">
        <select v-model="selectedTrack" class="border p-2 rounded">
          <option value="ALL">Academic Track: ALL</option>
          <option value="STEM">STEM</option>
          <option value="HUMSS">HUMSS</option>
          <option value="EM">EM</option>
        </select>
        <select v-model="selectedGrade" class="border p-2 rounded">
          <option value="12">Grade: 12</option>
          <option value="11">Grade: 11</option>
        </select>
        <input v-model="searchQuery" type="text" placeholder="Search..." class="border p-2 rounded w-1/2">
      </div>
    </div>

    <div class="border rounded-lg overflow-hidden shadow-sm">
      <table class="w-full border-collapse">
        <thead class="bg-gray-100">
          <tr class="text-left border-b">
            <th class="p-3">SECTION</th>
            <th class="p-3">TOTAL STUDENTS</th>
            <th class="p-3">MALE</th>
            <th class="p-3">FEMALE</th>
            <th class="p-3">ACADEMIC TRACK</th>
            <th class="p-3">GRADE LEVEL</th>
            <th class="p-3">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(classItem, index) in paginatedClasses" :key="index" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ classItem.section }}</td>
            <td class="p-3">{{ classItem.total }}</td>
            <td class="p-3">{{ classItem.male }}</td>
            <td class="p-3">{{ classItem.female }}</td>
            <td class="p-3">{{ classItem.track }}</td>
            <td class="p-3">{{ classItem.grade }}</td>
            <td class="p-3">
              <button class="bg-gray-200 px-4 py-1 rounded">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages" class="px-3 py-1 border rounded">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedTrack: 'ALL',
      selectedGrade: '12',
      currentPage: 1,
      perPage: 10, // Show 10 data per page
      classes: [
        { section: 'Einstein', total: 26, male: 12, female: 14, track: 'EM', grade: 12 },
        { section: 'Newton', total: 30, male: 15, female: 15, track: 'STEM', grade: 12 },
        { section: 'Curie', total: 28, male: 13, female: 15, track: 'HUMSS', grade: 12 },
        { section: 'Tesla', total: 32, male: 16, female: 16, track: 'STEM', grade: 11 },
        { section: 'Rizal', total: 29, male: 14, female: 15, track: 'HUMSS', grade: 11 },
        { section: 'Darwin', total: 27, male: 13, female: 14, track: 'EM', grade: 11 },
        { section: 'Fleming', total: 25, male: 11, female: 14, track: 'STEM', grade: 12 },
        { section: 'Mendel', total: 31, male: 16, female: 15, track: 'HUMSS', grade: 12 },
        { section: 'Hawking', total: 28, male: 14, female: 14, track: 'EM', grade: 11 },
        { section: 'Pascal', total: 30, male: 15, female: 15, track: 'STEM', grade: 11 },
        { section: 'Galileo', total: 27, male: 13, female: 14, track: 'HUMSS', grade: 11 },
        { section: 'Archimedes', total: 26, male: 12, female: 14, track: 'EM', grade: 12 },
        { section: 'Faraday', total: 32, male: 17, female: 15, track: 'STEM', grade: 12 },
        { section: 'Bohr', total: 28, male: 14, female: 14, track: 'HUMSS', grade: 11 },
        { section: 'Kepler', total: 30, male: 15, female: 15, track: 'STEM', grade: 11 },
        { section: 'Turing', total: 29, male: 14, female: 15, track: 'EM', grade: 12 },
        { section: 'Einstein', total: 26, male: 12, female: 14, track: 'EM', grade: 12 },
        { section: 'Newton', total: 30, male: 15, female: 15, track: 'STEM', grade: 12 },
        { section: 'Curie', total: 28, male: 13, female: 15, track: 'HUMSS', grade: 12 },
        { section: 'Tesla', total: 32, male: 16, female: 16, track: 'STEM', grade: 11 },
        { section: 'Rizal', total: 29, male: 14, female: 15, track: 'HUMSS', grade: 11 },
        { section: 'Darwin', total: 27, male: 13, female: 14, track: 'EM', grade: 11 },
        { section: 'Fleming', total: 25, male: 11, female: 14, track: 'STEM', grade: 12 },
        { section: 'Mendel', total: 31, male: 16, female: 15, track: 'HUMSS', grade: 12 },
        { section: 'Hawking', total: 28, male: 14, female: 14, track: 'EM', grade: 11 },
        { section: 'Pascal', total: 30, male: 15, female: 15, track: 'STEM', grade: 11 },
        { section: 'Galileo', total: 27, male: 13, female: 14, track: 'HUMSS', grade: 11 },
        { section: 'Archimedes', total: 26, male: 12, female: 14, track: 'EM', grade: 12 },
        { section: 'Faraday', total: 32, male: 17, female: 15, track: 'STEM', grade: 12 },
        { section: 'Bohr', total: 28, male: 14, female: 14, track: 'HUMSS', grade: 11 },
        { section: 'Kepler', total: 30, male: 15, female: 15, track: 'STEM', grade: 11 },
        { section: 'Turing', total: 29, male: 14, female: 15, track: 'EM', grade: 12 },
      ],
    };
  },
  computed: {
    filteredClasses() {
      return this.classes.filter(classItem =>
        (this.selectedTrack === 'ALL' || classItem.track === this.selectedTrack) &&
        (classItem.grade.toString() === this.selectedGrade) &&
        (classItem.section.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    },
    paginatedClasses() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredClasses.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.filteredClasses.length / this.perPage);
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    }
  },
};
</script>

<style scoped>
th, td {
  text-align: left;
}
</style>
