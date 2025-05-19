<template>
  <div>
    <h1 class="text-5xl font-bold mb-6">Dashboard</h1>
    <!-- First container with 3 cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white rounded-lg border border-gray-300 shadow-md p-6">
        <h2 class="text-2xl font-semibold text-right mb-8">Total Students</h2>
        <div class="flex items-center justify-between">
          <p class="text-4xl font-semibold">{{ stats.students }}</p>
          <i class="fas fa-users text-5xl"></i>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-300 shadow-md p-6">
        <h2 class="text-2xl font-semibold text-right mb-8">Total Teachers</h2>
        <div class="flex items-center justify-between">
          <p class="text-4xl font-semibold">{{ stats.teachers }}</p>
          <i class="fas fa-chalkboard-teacher text-5xl"></i>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-300 shadow-md p-6">
        <h2 class="text-2xl font-semibold text-right mb-8">Total Classes</h2>
        <div class="flex items-center justify-between">
          <p class="text-4xl font-semibold">{{ stats.classes }}</p>
          <i class="fas fa-chalkboard text-5xl"></i>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-300 shadow-md p-6">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-semibold text-left">
            Students Gender Distribution
          </h2>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <span class="text-sm text-gray-700">Male</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-[#10b981] rounded-sm"></div>
              <span class="text-sm text-gray-700">Female</span>
            </div>
          </div>
        </div>
        <canvas id="genderChart" class="w-full h-64"></canvas>
      </div>

      <div class="bg-white rounded-lg border border-gray-300 shadow-md p-6">
        <h2 class="text-2xl font-semibold text-left mb-8">
          Total Student per Grade
        </h2>
        <div class="flex items-center justify-center gap-8">
          <!-- Pie Chart -->
          <canvas id="gradeChart" width="350" height="350"></canvas>

          <!-- Custom Legend -->
          <ul id="gradeLegend" class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="w-4 h-4 bg-[#3b82f6] inline-block rounded-sm"></span>
              Grade 7
            </li>
            <li class="flex items-center gap-2">
              <span class="w-4 h-4 bg-[#10b981] inline-block rounded-sm"></span>
              Grade 8
            </li>
            <li class="flex items-center gap-2">
              <span class="w-4 h-4 bg-[#facc15] inline-block rounded-sm"></span>
              Grade 9
            </li>
            <li class="flex items-center gap-2">
              <span class="w-4 h-4 bg-[#f97316] inline-block rounded-sm"></span>
              Grade 10
            </li>
            <li class="flex items-center gap-2">
              <span class="w-4 h-4 bg-[#ec4899] inline-block rounded-sm"></span>
              Grade 11
            </li>
            <li class="flex items-center gap-2">
              <span class="w-4 h-4 bg-[#8b5cf6] inline-block rounded-sm"></span>
              Grade 12
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-lg border border-gray-300 shadow-md p-6 mt-6 h-[530px] flex flex-col mb-6"
    >
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4"
      >
        <h2 class="text-2xl font-semibold text-left">
          Recently Added Students
        </h2>
        <div class="filters flex flex-wrap gap-4">
          <select
            v-model="selectedGrade"
            class="filter-dropdown"
          >
            <option value="">All Grades</option>
            <option v-for="grade in gradeOptions" :key="grade" :value="grade">
              {{ grade }}
            </option>
          </select>

          <select
            v-model="selectedTrack"
            class="filter-dropdown"
          >
            <option value="">All Tracks</option>
            <option v-for="track in trackOptions" :key="track" :value="track">
              {{ track }}
            </option>
          </select>
        </div>

      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-gray-700">LRN</th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">
                Full Name
              </th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">
                Gender
              </th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">Age</th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">
                Grade Level
              </th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">
                Curriculum
              </th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">
                Track
              </th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">
                Date Added
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="student in filteredStudents" :key="student.lrn">
              <td class="px-4 py-2">{{ student.lrn }}</td>
              <td class="px-4 py-2">{{ student.fullName }}</td>
              <td class="px-4 py-2">{{ student.gender }}</td>
              <td class="px-4 py-2">{{ student.age }}</td>
              <td class="px-4 py-2">{{ student.gradeLevel }}</td>
              <td class="px-4 py-2">{{ student.curriculum }}</td>
              <td class="px-4 py-2">{{ student.track }}</td>
              <td class="px-4 py-2">{{ student.dateAdded }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-lg border border-gray-300 shadow-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-left">Manage Class</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100 text-sm">
              <tr>
                <th class="px-4 py-2 text-left font-medium text-gray-700">
                  Grade Level
                </th>
                <th class="px-1 py-2 text-left font-medium text-gray-700">
                  Track
                </th>
                <th class="px-2 py-2 text-left font-medium text-gray-700">
                  Section
                </th>
                <th class="px-2 py-2 text-left font-medium text-gray-700">
                  Adviser
                </th>
                <th class="px-4 py-2 text-left font-medium text-gray-700">
                  No. Student
                </th>
                <th class="px-4 py-2 text-left font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 text-sm">
              <tr v-for="(item, index) in classes" :key="index">
                <td class="px-4 py-2">{{ item.grade }}</td>
                <td class="px-1 py-2">{{ item.track }}</td>
                <td class="px-2 py-2">{{ item.section }}</td>
                <td class="px-2 py-2">{{ item.adviser }}</td>
                <td class="px-4 py-2">{{ item.students }}</td>
                <td class="px-4 py-2">
                  <span
                    :class="
                      item.status === 'Active' ? 'bg-green-800' : 'bg-red-600'
                    "
                    class="text-white px-1 py-1 rounded-sm text-[11px] w-[60px] h-[20px] inline-block text-center"
                  >
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            Total Submitted Students
          </h2>
          <p class="text-sm text-center text-gray-600 mb-4">Comparison between the Advisory Class and Subject Class</p>
          <div class="flex justify-center items-center" style="width: 100%; height: 400px">
            <canvas id="submissionStatusChart"></canvas>
          </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';

  Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
  );

  export default {
    name: 'Dashboard',
    data() {
      return {
        stats: {
          students: 1200,
          teachers: 85,
          classes: 42,
        },
        selectedGrade: '',
        selectedTrack: '',
        recentStudents: [
          {
            lrn: '100000000001',
            fullName: 'Angela Reyes',
            gender: 'Female',
            age: 13,
            gradeLevel: 'Grade 7',
            curriculum: 'Junior High School',
            track: 'Academic',
            dateAdded: '2025-05-10',
          },
          {
            lrn: '100000000002',
            fullName: 'Bryan Gomez',
            gender: 'Male',
            age: 13,
            gradeLevel: 'Grade 7',
            curriculum: 'Junior High School',
            track: 'Arts and Design',
            dateAdded: '2025-05-10',
          },
          {
            lrn: '100000000003',
            fullName: 'Daniel Ramos',
            gender: 'Male',
            age: 14,
            gradeLevel: 'Grade 8',
            curriculum: 'Junior High School',
            track: 'Academic',
            dateAdded: '2025-05-11',
          },
          {
            lrn: '100000000004',
            fullName: 'Ella Cruz',
            gender: 'Female',
            age: 15,
            gradeLevel: 'Grade 9',
            curriculum: 'Junior High School',
            track: 'Arts and Design',
            dateAdded: '2025-05-12',
          },
          {
            lrn: '100000000005',
            fullName: 'Francis Lim',
            gender: 'Male',
            age: 15,
            gradeLevel: 'Grade 9',
            curriculum: 'Junior High School',
            track: 'Sports',
            dateAdded: '2025-05-12',
          },
          {
            lrn: '100000000006',
            fullName: 'Grace Navarro',
            gender: 'Female',
            age: 16,
            gradeLevel: 'Grade 10',
            curriculum: 'Junior High School',
            track: 'Academic',
            dateAdded: '2025-05-13',
          },
          {
            lrn: '100000000007',
            fullName: 'Isabel Tan',
            gender: 'Female',
            age: 17,
            gradeLevel: 'Grade 11',
            curriculum: 'Senior High School',
            track: 'STEM',
            dateAdded: '2025-05-14',
          },
          {
            lrn: '10000000008',
            fullName: 'Joshua Dela Peña',
            gender: 'Male',
            age: 17,
            gradeLevel: 'Grade 11',
            curriculum: 'Senior High School',
            track: 'ABM',
            dateAdded: '2025-05-14',
          },
          {
            lrn: '10000000009',
            fullName: 'Karla Villanueva',
            gender: 'Female',
            age: 18,
            gradeLevel: 'Grade 12',
            curriculum: 'Senior High School',
            track: 'HUMSS',
            dateAdded: '2025-05-15',
          },
          {
            lrn: '10000000010',
            fullName: 'Leo Fernandez',
            gender: 'Male',
            age: 18,
            gradeLevel: 'Grade 12',
            curriculum: 'Senior High School',
            track: 'TVL',
            dateAdded: '2025-05-15',
          },
        ],
        classes: [
          {
            grade: 'Grade 11',
            track: 'STEM',
            section: 'A',
            adviser: 'Mr. Cruz',
            students: 35,
            status: 'Active',
          },
          {
            grade: 'Grade 12',
            track: 'ABM',
            section: 'B',
            adviser: 'Ms. Dela Cruz',
            students: 30,
            status: 'Pending',
          },
          {
            grade: 'Grade 10',
            track: 'General',
            section: 'C',
            adviser: 'Sir Reyes',
            students: 40,
            status: 'Active',
          },
          {
            grade: 'Grade 9',
            track: 'Arts & Design',
            section: 'D',
            adviser: 'Mrs. Santos',
            students: 28,
            status: 'Pending',
          },
          {
            grade: 'Grade 11',
            track: 'HUMSS',
            section: 'E',
            adviser: 'Mr. Villanueva',
            students: 33,
            status: 'Active',
          },
          {
            grade: 'Grade 12',
            track: 'STEM',
            section: 'F',
            adviser: 'Ms. Navarro',
            students: 31,
            status: 'Active',
          },
          {
            grade: 'Grade 10',
            track: 'General',
            section: 'G',
            adviser: 'Sir Lopez',
            students: 38,
            status: 'Pending',
          },
          {
            grade: 'Grade 9',
            track: 'TVL',
            section: 'H',
            adviser: 'Ms. Garcia',
            students: 25,
            status: 'Active',
          },
          {
            grade: 'Grade 12',
            track: 'ABM',
            section: 'I',
            adviser: 'Mr. Aquino',
            students: 29,
            status: 'Pending',
          },
          {
            grade: 'Grade 11',
            track: 'STEM',
            section: 'J',
            adviser: 'Mrs. Lim',
            students: 36,
            status: 'Active',
          },
        ],
      };
    },
    computed: {
      uniqueStudents() {
        const seen = new Set();
        return this.recentStudents.filter((student) => {
          if (seen.has(student.lrn)) return false;
          seen.add(student.lrn);
          return true;
        });
      },
      gradeOptions() {
        return [
          ...new Set(this.uniqueStudents.map((s) => s.gradeLevel)),
        ].sort();
      },
      trackOptions() {
        return [...new Set(this.uniqueStudents.map((s) => s.track))].sort();
      },
      filteredStudents() {
        return this.uniqueStudents.filter((student) => {
          const matchesGrade =
            this.selectedGrade === '' ||
            student.gradeLevel === this.selectedGrade;
          const matchesTrack =
            this.selectedTrack === '' || student.track === this.selectedTrack;
          return matchesGrade && matchesTrack;
        });
      },
    },
    mounted() {
      this.renderGenderChart();
      this.renderGradeChart();
      this.renderSubmissionStatusChart();

    },
    methods: {
      renderGenderChart() {
        const ctx = document.getElementById('genderChart')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['JHS Male', 'JHS Female', 'SHS Male', 'SHS Female'],
            datasets: [
              {
                label: 'Number of Students',
                data: [150, 130, 170, 160],
                backgroundColor: ['#3b82f6', '#10b981', '#3b82f6', '#10b981'],
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      },
      renderGradeChart() {
        const ctx = document.getElementById('gradeChart')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [
              'Grade 7',
              'Grade 8',
              'Grade 9',
              'Grade 10',
              'Grade 11',
              'Grade 12',
            ],
            datasets: [
              {
                data: [100, 150, 130, 120, 140, 160],
                backgroundColor: [
                  '#3b82f6',
                  '#10b981',
                  '#facc15',
                  '#f97316',
                  '#ec4899',
                  '#8b5cf6',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      },
      renderSubmissionStatusChart() {
        const ctx = document.getElementById('submissionStatusChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Approved', 'Pending', 'Declined'],
            datasets: [
              {
                label: 'Male',
                data: [15, 10, 5],
                backgroundColor: 'rgba(255, 206, 86, 0.8)', // Yellow
              },
              {
                label: 'Female',
                data: [12, 8, 6],
                backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 5,
                },
              },
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  font: {
                    size: 14,
                    family: 'Arial, sans-serif',
                    weight: 'bold',
                  },
                },
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        });
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
