<template>
  <div class="flex flex-col gap-10 py-5 px-5 overflow-x-hidden ssm:w-[75vw] sm:w-[80vw] md:w-[84vw] max-w-[84vw]">
    <div class="flex justify-between items-center">
      <h1 class="title">Dashboard</h1>
      <p class="title">Total Students: {{ totalStudents }}</p>
    </div>

    <!-- Advisory Class Section -->
    <div class="flex ssm:flex-col sm:w-full md:flex-row justify-between ssm:gap-3 md:gap-10">
      <div class="p-5 border-blue border-2 ssm:w-full md:w-1/2 rounded-2xl overflow-hidden">
        <p class="font-semibold text-[32px]">Advisory Class</p>

        <div class="flex ssm:flex-col md:flex-row gap-10 p-5 items-center">
          <div
            class="flex items-center border-2 gap-5 border-blue ssm:px-5 ssm:py-2 md:px-10 md:py-17 rounded-2xl ssm:w-full ssm:justify-center ssm:items-center md:w-auto">
            <div class="text-center">
              <div v-if="advisoryStats">
                <p class="font-medium text-5xl">
                  {{ advisoryStats.totalStudents }}
                </p>
                <p>Total Students</p>
              </div>
              <div v-else>
                <p>Loading advisory stats...</p>
              </div>
            </div>
            <div>
              <img src="/assets/img/dashboard/total.png" alt="" class="w-auto" />
            </div>
          </div>

          <div class="flex md:flex-col ssm:flex-row gap-5 ssm:justify-between md:items-center w-full">
            <div class="flex items-center border-2 border-blue gap-2 px-2 py-5 rounded-xl w-full">
              <img src="/assets/img/dashboard/male.png" alt="" class="w-auto ssm:w-7" />
              <p class="text-[40px] ssm:text-[30px] font-medium">
                {{ advisoryStats.maleCount }}
              </p>
              <p class="text-base">Male Students</p>
            </div>
            <div class="flex items-center border-2 border-blue gap-2 px-2 py-5 rounded-xl w-full">
              <img src="/assets/img/dashboard/female.png" alt="" class="w-auto ssm:w-7" />
              <p class="text-[40px] ssm:text-[30px] font-medium">
                {{ advisoryStats.femaleCount }}
              </p>
              <p class="text-base">Female Students</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Subject Class Section -->
      <div class="ssm:w-full md:w-1/2 border border-[#cecece] p-5 rounded-2xl overflow-hidden"
        style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px">
        <p class="font-semibold text-[32px]">Subject Class</p>

        <div class="flex flex-row gap-10 p-5 items-center">
          <div
            class="w-40 aspect-square rounded-full border-15 border-blue text-center flex flex-col justify-center items-center p-4">
            <p class="text-3xl font-semibold leading-tight">
              {{
                subjectClassesGrouped && subjectClassesGrouped.length > 0 ?
                subjectClassesGrouped.reduce((sum, classGroup) =>
                  sum + (classGroup.subjects ? classGroup.subjects.reduce((subSum, subject) => subSum + subject.count, 0) : 0), 0)
                : 0
              }}
            </p>
            <p class="text-base leading-tight">TOTAL</p>
            <p class="text-base leading-tight">STUDENTS</p>
          </div>

          <div class="flex flex-col gap-2 w-full overflow-hidden">
            <div v-for="(classGroup, classIdx) in (subjectClassesGrouped || [])" :key="classIdx"
                 class="flex flex-col border border-[#cecece] gap-2 py-2 pr-4 rounded-lg w-full overflow-hidden mb-4"
                 style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                <div class="flex items-center">
                   <div class="h-full w-[7px] bg-blue rounded-full mr-2 ml-2"></div>
                   <p class="font-medium text-xl truncate">{{ classGroup.name }}</p>
                </div>
                <div v-for="(subjectItem, subjectIdx) in (classGroup.subjects || [])" :key="subjectIdx" class="flex items-center gap-3 ml-5">
                    <p class="font-medium text-lg">{{ subjectItem.count }}</p>
                    <p class="text-base text-[#7b7b7b] leading-none truncate">
                        {{ subjectItem.subject }}
                    </p>
                </div>
            </div>
            <div v-if="subjectClassesGrouped && subjectClassesGrouped.length === 0" class="flex flex-col items-center justify-center py-10 text-gray-500">
                <img src="/assets/img/dashboard/no-data.png" alt="No Data" class="w-32 h-32 mb-4 opacity-50" />
                <p class="text-lg font-medium">No Subject Classes Assigned</p>
                <p class="text-ssm">You are not currently assigned to teach any subject classes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary of Grades Section -->
    <div class="p-5 border border-[#cecece] rounded-2xl w-full overflow-hidden"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px">
      <div>
        <p class="font-semibold text-[32px]">Summary of Grades</p>
      </div>

      <div class="flex justify-center gap-10 items-center my-5 flex-wrap">
        <div class="flex gap-2">
          <div class="rounded-full w-5 h-5 bg-blue"></div>
          <p class="text-blue text-base">90-100 Grade</p>
        </div>

        <div class="flex gap-2">
          <div class="rounded-full w-5 h-5 bg-green"></div>
          <p class="text-green text-base">85-89 Grade</p>
        </div>

        <div class="flex gap-2">
          <div class="rounded-full w-5 h-5 bg-yellow"></div>
          <p class="text-yellow text-base">80-84 Grade</p>
        </div>

        <div class="flex gap-2">
          <div class="rounded-full w-5 h-5 bg-orange"></div>
          <p class="text-orange text-base">75-79 Grade</p>
        </div>

        <div class="flex gap-2">
          <div class="rounded-full w-5 h-5 bg-red"></div>
          <p class="text-red text-base">75 Below Grade</p>
        </div>
      </div>

      <div class="h-[400px] overflow-hidden">
        <BarChart chartId="gradeChart" :labels="gradeChartData.labels" :datasets="gradeChartData.datasets"
          :options="gradeChartOptions" :height="400" />
      </div>
    </div>

    <!-- Submitted Grades and Recent Submitted Grades -->
    <div class="flex ssm:flex-col md:flex-row justify-between gap-10 w-full">
      <div class="ssm:w-full md:w-1/2 p-5 border border-[#cecece] rounded-2xl flex flex-col gap-5 overflow-hidden"
        style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px">
        <p class="font-semibold text-[32px]">Total Submitted Grades</p>


        <div class="h-[400px] overflow-hidden">
          <BarChart 
            chartId="submittedGradesChart" 
            :labels="submittedGradesChartData.labels"
            :datasets="submittedGradesChartData.datasets" 
            :options="submittedGradesChartOptions" 
            :height="400" 
          />
        </div>
      </div>

      <div class="ssm:w-full md:w-1/2 p-5 border border-[#cecece] rounded-2xl overflow-hidden"
        style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px">
        <p class="font-semibold text-[32px]">Recent Submitted Grades</p>

        <div class="overflow-x-auto mt-5 w-full">
          <table v-if="recentSubmittedGrades.length > 0" class="w-full">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-3 text-center text-base">LRN</th>
                <th class="p-3 text-center text-base">Name</th>
                <th class="p-3 text-center text-base">Class Type</th>
                <th class="p-3 text-center text-base">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(grade, index) in recentSubmittedGrades" :key="index"
                class="border-b border-[#cecece] hover:bg-gray-50">
                <td class="p-3 text-center text-base">{{ grade.lrn }}</td>
                <td class="p-3 text-center text-base">{{ grade.name }}</td>
                <td class="p-3 text-center text-base">{{ grade.classType }}</td>
                <td class="p-3 text-center text-base">
                  <span :class="getStatusClass(grade.status)" class="px-2 py-1 rounded-full text-sm font-semibold">
                    {{ grade.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="flex flex-col items-center justify-center py-10 text-gray-500">
            <img src="/assets/img/dashboard/no-data.png" alt="No Data" class="w-32 h-32 mb-4 opacity-50" />
            <p class="text-lg font-medium">No Submitted Grades Yet</p>
            <p class="text-ssm">You haven't submitted any grades for review.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Grades Section -->
    <div class="p-5 border border-[#cecece] rounded-2xl w-full overflow-hidden"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px">
      <p class="font-semibold text-[32px]">Recent Graded</p>

      <div class="overflow-x-auto mt-5 w-full">
        <table v-if="recentGrades.length > 0" class="w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 text-center text-base">Student</th>
              <th class="p-3 text-center text-base">Subject</th>
              <th class="p-3 text-center text-base">Final Grade</th>
              <th class="p-3 text-center text-base">Status</th>
              <th class="p-3 text-center text-base">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(grade, index) in recentGrades" :key="index" class="border-b border-[#cecece] hover:bg-gray-50">
              <td class="p-3 text-center text-base">{{ grade.student }}</td>
              <td class="p-3 text-center text-base">{{ grade.subject }}</td>
              <td class="p-3 text-center font-semibold">{{ grade.grade }}</td>
              <td class="p-3 text-center text-base">
                <span :class="getGradeStatusClass(grade.grade)" class="px-3 py-1 rounded-full text-sm font-semibold">
                  {{ getGradeStatus(grade.grade) }}
                </span>
              </td>
              <td class="p-3 text-center text-sm text-gray-600">
                {{ grade.date }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="flex flex-col items-center justify-center py-10 text-gray-500">
          <img src="/assets/img/dashboard/no-data.png" alt="No Data" class="w-32 h-32 mb-4 opacity-50" />
          <p class="text-lg font-medium">No Grades Recorded Yet</p>
          <p class="text-ssm">
            You haven't recorded any grades for your students.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import BarChart from '@/components/barchart.vue';
import {
  getAdvisoryStats,
  getSubjectClasses,
  getGradeSummary,
  getRecentGrades,
} from '@/service/dashboardService';

const advisoryStats = ref({
  totalStudents: 0,
  maleCount: 0,
  femaleCount: 0,
});

const subjectClassesGrouped = ref([]);
const gradeChartData = ref({ labels: [], datasets: [] });
const recentGrades = ref([]);
const recentSubmittedGrades = ref([]);
const submittedGradesChartData = ref({
  labels: ['APPROVED', 'PENDING', 'DECLINED'],
  datasets: [
    {
      label: '',
      data: [0, 0, 0],
      backgroundColor: '#295F98'
    },
    {
      label: 'Subject Class',
      data: [0, 0, 0],
      backgroundColor: '#0C5A48'
    }
  ]
});

const submittedGradesChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: {
          size: 14,
          weight: 'bold'
        },
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 10,
        boxHeight: 10,
        margin: 20
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12,
          weight: 'bold'
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0,0,0,0.1)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 12,
          weight: 'bold'
        }
      }
    }
  },
  barPercentage: 0.6,
  categoryPercentage: 0.8
});

// Chart options
const gradeChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0,0,0,0.1)',
        drawBorder: false,
      },
    },
  },
  barThickness: 40,
  maxBarThickness: 35,
});

const loadAdvisoryStats = async () => {
  try {
    const response = await getAdvisoryStats();
    advisoryStats.value = {
      totalStudents: response.totalStudents || 0,
      maleCount: response.maleCount || 0,
      femaleCount: response.femaleCount || 0,
    };
  } catch (error) {
    console.error('Error loading subject class stats:', error);
    advisoryStats.value = { totalStudents: 0, maleCount: 0, femaleCount: 0 };
  }
};

const loadSubjectClasses = async () => {
  try {
    const response = await getSubjectClasses();
    // Group classes by class name and filter for non-advisory classes
    const groupedClasses = response.reduce((acc, curr) => {
      // Only process if isAdvisory is false/0
      if (curr.isAdvisory === false || curr.isAdvisory === 0) {
        const key = curr.ClassName;
        if (!acc[key]) {
          acc[key] = {
            name: key,
            subjects: []
          };
        }
        acc[key].subjects.push({
          subject: curr.SubjectName,
          count: curr.student_count
        });
      }
      return acc;
    }, {});
    
    subjectClassesGrouped.value = Object.values(groupedClasses);
  } catch (error) {
    console.error('Error loading subject classes:', error);
    subjectClassesGrouped.value = [];
  }
};

const loadRecentGrades = async () => {
  try {
    const response = await getRecentGrades();
    recentGrades.value = response;
    
    // Count statuses for both advisory and subject classes
    const statusCounts = {
      advisory: { approved: 0, pending: 0, declined: 0 },
      subject: { approved: 0, pending: 0, declined: 0 }
    };

    response.forEach(grade => {
      const status = grade.status.toLowerCase();
      if (grade.isAdvisory) {
        statusCounts.advisory[status]++;
      } else {
        statusCounts.subject[status]++;
      }
    });

    // Update chart data
    submittedGradesChartData.value = {
      labels: ['APPROVED', 'PENDING', 'DECLINED'],
      datasets: [
        {
          label: 'Advisory Class',
          data: [
            statusCounts.advisory.approved,
            statusCounts.advisory.pending,
            statusCounts.advisory.declined
          ],
          backgroundColor: '#295F98'
        },
        {
          label: 'Subject Class',
          data: [
            statusCounts.subject.approved,
            statusCounts.subject.pending,
            statusCounts.subject.declined
          ],
          backgroundColor: '#0C5A48'
        }
      ]
    };

    // Update recent submitted grades for the table
    recentSubmittedGrades.value = response.slice(0, 8).map(grade => ({
      lrn: grade.student.split(' ')[0],
      name: grade.student,
      classType: grade.isAdvisory ? 'Advisory' : 'Subject',
      status: grade.status.toUpperCase()
    }));
  } catch (error) {
    console.error('Error loading recent grades:', error);
    recentGrades.value = [];
    recentSubmittedGrades.value = [];
  }
};

const getGradeStatus = (grade) => {
  const numGrade = Number(grade);
  if (numGrade >= 90) return 'Excellent';
  if (numGrade >= 85) return 'Very Good';
  if (numGrade >= 80) return 'Good';
  if (numGrade >= 75) return 'Satisfactory';
  return 'Failed';
};

const getGradeStatusClass = (grade) => {
  const numGrade = Number(grade);
  if (numGrade >= 90) return 'bg-blue-100 text-blue';
  if (numGrade >= 85) return 'bg-green-100 text-green';
  if (numGrade >= 80) return 'bg-yellow-100 text-yellow';
  if (numGrade >= 75) return 'bg-orange-100 text-orange';
  return 'bg-red-100 text-red';
};

const getStatusClass = (status) => {
  switch (status.toUpperCase()) {
    case 'APPROVED':
      return 'bg-green-100 text-green';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow';
    case 'DECLINED':
      return 'bg-red-100 text-red';
    default:
      return '';
  }
};

onMounted(async () => {
  try {
    await Promise.all([
      loadAdvisoryStats(),
      loadSubjectClasses(),
      loadRecentGrades()
    ]);

    const gradeSummary = await getGradeSummary();
    gradeChartData.value = {
      labels: Object.keys(gradeSummary),
      datasets: [
        {
          data: Object.values(gradeSummary),
          backgroundColor: [
            '#295F98', // Blue
            '#0C5A48', // Green
            '#FFFF00', // Yellow
            '#FF9204', // Orange
            '#D30000', // Red
          ],
        },
      ],
    };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    gradeChartData.value = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    };
  }
});
</script>

<style scoped>
/* Custom color classes that might not be in your Tailwind config */
.text-blue {
  color: #295f98;
}

.text-green {
  color: #0c5a48;
}

.text-yellow {
  color: #ffff00;
}

.text-orange {
  color: #ff9204;
}

.text-red {
  color: #d30000;
}

.bg-blue {
  background-color: #295f98;
}

.bg-green {
  background-color: #0c5a48;
}

.bg-yellow {
  background-color: #ffff00;
}

.bg-orange {
  background-color: #ff9204;
}

.bg-red {
  background-color: #d30000;
}

.bg-blue-100 {
  background-color: #295f9820;
}

.bg-green-100 {
  background-color: #0c5a4820;
}

.bg-yellow-100 {
  background-color: #ffff0020;
}

.bg-orange-100 {
  background-color: #ff920420;
}

.bg-red-100 {
  background-color: #d3000020;
}

.border-blue {
  border-color: #295f98;
}

.border-15 {
  border-width: 15px;
}
</style>
