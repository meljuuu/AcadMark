<template>
  <div class="w-full">
    <div class="flex items-center space-x-6 mb-6">
      <h1 class="text-5xl font-bold">Dashboard</h1>
      <div class="filters">
        <select
          id="dashboard-select"
          v-model="selectedDashboard"
          class="filter-dropdown"
        >
          <option value="teacher">Teacher Dashboard</option>
          <option value="admin">Admin Dashboard</option>
        </select>
      </div>
    </div>

    <!-- Teacher Dashboard -->
    <div v-if="selectedDashboard === 'teacher'">
      <!-- Cards -->
      <div class="flex justify-between gap-4 w-full mb-6">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-1/4 flex items-center space-x-4"
        >
          <i :class="card.icon" class="text-gray-500 text-4xl"></i>
          <div class="text-right ml-auto">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">
              {{ card.label }}
            </h2>
            <p class="text-3xl font-semibold">{{ card.value }}</p>
          </div>
        </div>
      </div>

      <!-- Academic Chart -->
      <div
        class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6"
      >
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          Academic Progress
        </h2>
        <div style="width: 100%; height: 500px">
          <canvas id="academicGroupedBarChart"></canvas>
        </div>
      </div>

      <!-- Recently Added Faculties & Grades Summary -->
      <div class="flex gap-6 mb-6 mt-6">
        <div
          class="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6"
        >
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            Recently Added Faculties
          </h2>
          <table id="faculty-table" class="w-full table-auto border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border-b border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th class="border-b border-gray-300 px-4 py-2 text-left">
                  Email
                </th>
                <th class="border-b border-gray-300 px-4 py-2 text-left">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(faculty, index) in faculties" :key="index">
                <td class="border-b border-gray-300 px-4 py-2">
                  {{ faculty.name }}
                </td>
                <td class="border-b border-gray-300 px-4 py-2">
                  {{ faculty.email }}
                </td>
                <td class="border-b border-gray-300 px-4 py-2">
                  {{ faculty.role }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6"
        >
          <h2 class="text-xl font-semibold text-gray-700 mb-8">
            Summary of Grades Approval
          </h2>
          <div class="flex justify-center items-center">
            <canvas
              id="statusPieChart"
              style="width: 370px; height: 370px"
            ></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Dashboard -->
    <div v-else-if="selectedDashboard === 'admin'">
      <div class="flex justify-between gap-4 w-full mb-6">
        <div
          v-for="(admincard, index) in admincards"
          :key="index"
          class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-1/4 flex items-center space-x-4"
        >
          <i :class="admincard.icon" class="text-gray-500 text-4xl"></i>
          <div class="text-right ml-auto">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">
              {{ admincard.label }}
            </h2>
            <p class="text-3xl font-semibold">{{ admincard.value }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          Total Students Per Grade
        </h2>
        <div style="width: 100%; height: 500px">
          <canvas id="totalStudentsChart"></canvas>
        </div>
      </div>

      <div class="flex gap-6 mb-6 mt-6">
        <div
          class="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6"
        >
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            Recently Added Students
          </h2>
          <table id="students-table" class="w-full table-auto border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border-b border-gray-300 px-4 py-2 text-left">LRN</th>
                <th class="border-b border-gray-300 px-4 py-2 text-left">Name</th>
                <th class="border-b border-gray-300 px-4 py-2 text-left">Gender</th>
                <!-- <th class="border-b border-gray-300 px-4 py-2 text-left">Age</th> -->
                <th class="border-b border-gray-300 px-4 py-2 text-left">Grade Level</th>
                <th class="border-b border-gray-300 px-4 py-2 text-left">Track</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in students" :key="index">
                <td class="border-b border-gray-300 px-4 py-2">{{ student.lrn }}</td>
                <td class="border-b border-gray-300 px-4 py-2">{{ student.name }}</td>
                <td class="border-b border-gray-300 px-4 py-2">{{ student.gender }}</td>
                <!-- <td class="border-b border-gray-300 px-4 py-2">{{ student.age }}</td> -->
                <td class="border-b border-gray-300 px-4 py-2">{{ student.gradeLevel }}</td>
                <td class="border-b border-gray-300 px-4 py-2">{{ student.track }}</td>
              </tr>
            </tbody>
          </table>
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

       <div class="flex gap-6 mb-6 mt-6">
        <div class="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            Pending Classes Approval
          </h2>
          <div class="flex justify-center items-center" style="width: 100%; height: 500px">
            <canvas id="studentsPieChart"></canvas>
          </div>

        </div>

        <div class="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            Recently Submitted Classes
          </h2>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr>
                <th class="border-b border-gray-300 px-4 py-2">Grade Level</th>
                <th class="border-b border-gray-300 px-4 py-2">Track</th>
                <th class="border-b border-gray-300 px-4 py-2">Section</th>
                <th class="border-b border-gray-300 px-4 py-2">Adviser</th>
                <th class="border-b border-gray-300 px-4 py-2">No. of Students</th>
                <th class="border-b border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cls, index) in classesData" :key="index" class="border-b border-gray-200">
                <td class="px-4 py-2">{{ cls.grade }}</td>
                <td class="px-4 py-2">{{ cls.track }}</td>
                <td class="px-4 py-2">{{ cls.section }}</td>
                <td class="px-4 py-2">{{ cls.adviser }}</td>
                <td class="px-4 py-2">{{ cls.students }}</td>
                <td class="px-4 py-2">
                  <span
                    :class="[
                      'inline-block w-20 text-center px-3 py-1 rounded-md text-sm text-white',
                      cls.status === 'active' ? 'bg-green-900' : 'bg-red-600'
                    ]"
                  >
                    {{ cls.status.charAt(0).toUpperCase() + cls.status.slice(1) }}
                  </span>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);

  export default {
    name: 'Dashboard',
    data() {
      return {
        selectedDashboard: 'teacher',
        // Teacher Data
        cards: [
          {
            label: 'Total Teachers',
            value: 25,
            icon: 'fas fa-chalkboard-teacher',
          },
          { label: 'Total Students', value: 250, icon: 'fas fa-users' },
          {
            label: 'Academic Progress',
            value: '85%',
            icon: 'fas fa-chart-line',
          },
          { label: 'Pending Grades', value: 13, icon: 'fas fa-tasks' },
        ],
        academicProgress: [
          { grade: 'Grade 7', veryGood: 8, good: 12, failed: 5 },
          { grade: 'Grade 8', veryGood: 10, good: 15, failed: 3 },
          { grade: 'Grade 9', veryGood: 7, good: 14, failed: 6 },
          { grade: 'Grade 10', veryGood: 9, good: 10, failed: 4 },
          { grade: 'Grade 11', veryGood: 11, good: 13, failed: 2 },
          { grade: 'Grade 12', veryGood: 6, good: 16, failed: 7 },
        ],
        faculties: [
          {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            role: 'Admin',
          },
          {
            name: 'Bob Smith',
            email: 'bob.smith@example.com',
            role: 'Faculty',
          },
          {
            name: 'Carol Davis',
            email: 'carol.davis@example.com',
            role: 'Faculty',
          },
          { name: 'David Lee', email: 'david.lee@example.com', role: 'Admin' },
          {
            name: 'Eva Martinez',
            email: 'eva.martinez@example.com',
            role: 'Faculty',
          },
          {
            name: 'Frank Wilson',
            email: 'frank.wilson@example.com',
            role: 'Faculty',
          },
          { name: 'Grace Kim', email: 'grace.kim@example.com', role: 'Admin' },
          {
            name: 'Henry Clark',
            email: 'henry.clark@example.com',
            role: 'Faculty',
          },
          {
            name: 'Ivy Scott',
            email: 'ivy.scott@example.com',
            role: 'Faculty',
          },
          {
            name: 'Jack Turner',
            email: 'jack.turner@example.com',
            role: 'Admin',
          },
        ],
        // Admin Data
        admincards: [
          { label: 'Total Classes', value: 15, icon: 'fas fa-chalkboard-teacher' },
          { label: 'Total Students', value: 120, icon: 'fas fa-users' },
          { label: 'Pending Classes', value: 10, icon: 'fas fa-hourglass-half' },
          { label: 'Pending Students', value: 50, icon: 'fas fa-user-clock' }
        ],
        totalStudentsPerGrade: [
          { grade: 'Grade 7', students: 120 },
          { grade: 'Grade 8', students: 135 },
          { grade: 'Grade 9', students: 150 },
          { grade: 'Grade 10', students: 145 },
          { grade: 'Grade 11', students: 130 },
          { grade: 'Grade 12', students: 125 },
        ],
        students: [
          { lrn: "1000000001", name: "Juan Dela Cruz", gender: "Male", age: 16, gradeLevel: "Grade 10", track: "STEM" },
          { lrn: "1000000002", name: "Maria Clara", gender: "Female", age: 17, gradeLevel: "Grade 11", track: "ABM" },
          { lrn: "1000000003", name: "Pedro Penduko", gender: "Male", age: 18, gradeLevel: "Grade 12", track: "HUMSS" },
          { lrn: "1000000004", name: "Luzviminda Santos", gender: "Female", age: 16, gradeLevel: "Grade 10", track: "GAS" },
          { lrn: "1000000005", name: "Carlos Rizal", gender: "Male", age: 15, gradeLevel: "Grade 9", track: "STEM" },
          { lrn: "1000000006", name: "Ana Lopez", gender: "Female", age: 17, gradeLevel: "Grade 11", track: "ABM" },
          { lrn: "1000000007", name: "Miguel Torres", gender: "Male", age: 18, gradeLevel: "Grade 12", track: "HUMSS" },
          { lrn: "1000000008", name: "Isabella Cruz", gender: "Female", age: 16, gradeLevel: "Grade 10", track: "STEM" },
          { lrn: "1000000009", name: "Josefa Mendoza", gender: "Female", age: 17, gradeLevel: "Grade 11", track: "GAS" },
          { lrn: "1000000010", name: "Andres Bonifacio", gender: "Male", age: 18, gradeLevel: "Grade 12", track: "ABM" }
        ],
        pendingClassesData: [
          { grade: 'Grade 7', students: 110 },
          { grade: 'Grade 8', students: 95 },
          { grade: 'Grade 9', students: 130 },
          { grade: 'Grade 10', students: 125 },
          { grade: 'Grade 11', students: 105 },
          { grade: 'Grade 12', students: 115 },
        ],
          classesData: [
          { grade: "7", track: "General", section: "A", adviser: "Ms. Santos", students: 35, status: "active" },
          { grade: "7", track: "General", section: "B", adviser: "Mr. Cruz", students: 33, status: "pending" },
          { grade: "8", track: "General", section: "C", adviser: "Ms. Reyes", students: 30, status: "active" },
          { grade: "8", track: "Academic", section: "D", adviser: "Mr. Lopez", students: 28, status: "active" },
          { grade: "9", track: "Academic", section: "E", adviser: "Ms. Garcia", students: 32, status: "pending" },
          { grade: "10", track: "STEM", section: "F", adviser: "Mr. Diaz", students: 27, status: "active" },
          { grade: "10", track: "ABM", section: "G", adviser: "Ms. Mendoza", students: 29, status: "pending" },
          { grade: "11", track: "STEM", section: "H", adviser: "Mr. Ramos", students: 25, status: "active" },
          { grade: "11", track: "ABM", section: "I", adviser: "Ms. Cruz", students: 31, status: "pending" },
          { grade: "12", track: "General", section: "J", adviser: "Mr. Flores", students: 26, status: "active" },
        ],
      };
    },
    watch: {
      selectedDashboard(newVal) {
        if (newVal === 'teacher') {
          this.$nextTick(() => {
            this.renderGroupedBarChart();
            this.renderStatusPieChart();
          });
        }
        if (newVal === 'admin') {
          this.$nextTick(() => {
            this.renderTotalStudentsChart();
            this.renderSubmissionStatusChart();
            this.renderStudentsPieChart();
          });
        }
      },
    },
    mounted() {
      if (this.selectedDashboard === 'teacher') {
        this.renderGroupedBarChart();
        this.renderStatusPieChart();
      }
      if (this.selectedDashboard === 'admin') {
        this.renderTotalStudentsChart();
        this.renderSubmissionStatusChart();
        this.renderStudentsPieChart();

      }
    },
    methods: {
      // Admin
      renderTotalStudentsChart() {
        const ctx = document.getElementById('totalStudentsChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.totalStudentsPerGrade.map(item => item.grade),
            datasets: [{
              label: 'Total Students',
              data: this.totalStudentsPerGrade.map(item => item.students),
              backgroundColor: 'rgba(59, 130, 246, 0.8)', 
              borderRadius: 5,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 10,
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

      renderStudentsPieChart() {
        const ctx = document.getElementById('studentsPieChart').getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.pendingClassesData.map(item => item.grade),
            datasets: [{
              data: this.pendingClassesData.map(item => item.students),
              backgroundColor: [
                '#3B82F6', // Blue
                '#10B981', // Green
                '#F59E0B', // Amber
                '#EF4444', // Red
                '#8B5CF6', // Purple
                '#EC4899', // Pink
              ],
              borderColor: '#fff',
              borderWidth: 2,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  font: {
                    size: 16,
                    family: 'Arial, sans-serif',
                    weight: 'bold',
                  },
                  usePointStyle: true,
                  pointStyle: 'rect',
                },
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        });
      },

      // Teacher
      renderGroupedBarChart() {
        const ctx = document
          .getElementById('academicGroupedBarChart')
          .getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.academicProgress.map((item) => item.grade),
            datasets: [
              {
                label: 'Very Good (90-100)',
                data: this.academicProgress.map((item) => item.veryGood),
                backgroundColor: 'rgba(34, 197, 94, 0.8)', // Green
              },
              {
                label: 'Good (75-89)',
                data: this.academicProgress.map((item) => item.good),
                backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue
              },
              {
                label: 'Failed (60-74)',
                data: this.academicProgress.map((item) => item.failed),
                backgroundColor: 'rgba(239, 68, 68, 0.8)', // Red
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Let canvas fill the container size
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
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 5,
                },
              },
            },
          },
        });
      },

      renderStatusPieChart() {
        const ctx = document.getElementById('statusPieChart').getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Accepted', 'Pending', 'Decline'],
            datasets: [
              {
                data: [40, 25, 15],
                backgroundColor: [
                  'rgba(34, 197, 94, 0.8)',
                  'rgba(255, 165, 0, 0.8)',
                  'rgba(239, 68, 68, 0.8)',
                ],
                borderColor: 'white',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  font: {
                    size: 18,
                    family: 'Arial, sans-serif',
                    weight: 'bold',
                  },
                  usePointStyle: true,
                  pointStyle: 'rect',
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
  padding: 15px 20px;
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
