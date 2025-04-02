  <template>
    <div class="flex flex-col gap-10 py-5">
      <h1 class="title">Dashboard</h1>

      <div class="flex justify-between flex-grow gap-10">
        <div class="p-5 border-blue border-2 w-1/2 rounded-2xl">
          <p class="font-semibold text-[32px]">Advisory Class</p>

          <div class="flex gap-10 p-5 items-center">
            <div class="flex items-center border-2 border-blue px-10 py-17 rounded-2xl">
              <div class="text-center">
                <p class="font-medium text-5xl">60</p>
                <p>Total Students</p>
              </div>
              <div><img src="/public/assets/img/dashboard/total.png" alt=""></div>
            </div>

            <div class="flex flex-col gap-5 items-center max-h-[229px]">
              <div class="flex items-center border-2 border-blue gap-2 px-2 py-5 rounded-xl w-full">
                <img src="/public/assets/img/dashboard/male.png" alt="">
                <p class="text-[40px] font-medium">18</p>
                <p class="text-base">Male Students</p>
              </div>

              <div class="flex items-center border-2 border-blue gap-2 px-2 py-5 rounded-xl w-full">
                <img src="/public/assets/img/dashboard/female.png" alt="">
                <p class="text-[40px] font-medium">18</p>
                <p class="text-base">Female Students</p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/2 border border-[#cecece] p-5 rounded-2xl" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
          <p class="font-semibold text-[32px]">Subject Class</p>

          <div class="flex gap-10 p-5 items-center">
            <div
              class="w-50 h-50 rounded-full border-15 border-blue text-center flex flex-col justify-center items-center">
              <p class="text-4xl font-semibold">300</p>
              <p class="text-lg">TOTAL</p>
              <p class="text-lg leading-[10px]">STUDENTS</p>
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex gap-5" v-for="(chunk, index) in chunkedClasses" :key="index">
                <div v-for="(classItem, idx) in chunk" :key="idx"
                  class="flex border border-[#cecece] gap-3 py-2 pr-4 rounded-lg w-[180px] flex-1"
                  style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">

                  <div class="flex items-center">
                    <div class="h-full w-[7px] bg-blue rounded-full mr-2 ml-2"></div>
                    <p class="font-medium text-[32px]">{{ classItem.count }}</p>
                  </div>

                  <div>
                    <p class="text-lg">{{ classItem.name }}</p>
                    <p class="text-base text-[#7b7b7b] leading-none">{{ classItem.subject }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-5 border border-[#cecece] rounded-2xl" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
        <div>
          <p class="font-semibold text-[32px]">Summary of Grades</p>
        </div>

        <div class="flex justify-center gap-10 items-center my-5">
          <div class="flex gap-2">
            <div class="rounded-full w-5 h-5 bg-blue"></div>
            <p class="text-blue">90-100 Grade</p>
          </div>

          <div class="flex gap-2">
            <div class="rounded-full w-5 h-5 bg-[#0C5A48]"></div>
            <p class="text-[#0C5A48]">85-89 Grade</p>
          </div>

          <div class="flex gap-2">
            <div class="rounded-full w-5 h-5 bg-[#D0D000]"></div>
            <p class="text-[#D0D000]">80-84 Grade</p>
          </div>

          <div class="flex gap-2">
            <div class="rounded-full w-5 h-5 bg-[#FF9184]"></div>
            <p class="text-[#FF9184]">75-79 Grade</p>
          </div>

          <div class="flex gap-2">
            <div class="rounded-full w-5 h-5 bg-[#D30000]"></div>
            <p class="text-[#D30000]">75 Below Grade</p>
          </div>
        </div>

        <BarChart chartId="gradeChart" :labels="gradeChartData.labels" :datasets="gradeChartData.datasets"
          :options="gradeChartOptions" :height="400" />
      </div>

      <div class="flex justify-between gap-10">
        <div class="w-1/2 p-5 border border-[#cecece] rounded-2xl flex flex-col gap-5"
          style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
          <p class="font-semibold text-[32px]">Total Submitted Grades</p>

          <div class="flex items-center justify-center gap-5">
            <div class="flex gap-3">
              <div class="bg-blue w-5 h-5 rounded-full"></div>
              <p class="text-blue">Advisory Class</p>
            </div>

            <div class="flex gap-3">
              <div class="bg-[#0C5A48] w-5 h-5 rounded-full"></div>
              <p class="text-[#0C5A48]">Subject Class</p>
            </div>
          </div>

          <BarChart chartId="submittedGradesChart" :labels="submittedGradesData.labels"
            :datasets="submittedGradesData.datasets" :options="submittedGradesOptions" :height="600" />
        </div>

        <div class="w-1/2 p-5 border border-[#cecece] rounded-2xl" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
          <p class="font-semibold text-[32px]">Recent Submitted Grades</p>

          <div class="flex flex-col gap-5 mt-5">
            <div v-for="(grade, index) in recentSubmittedGrades" :key="index"
              class="flex justify-around items-center p-3 border border-[#cecece] rounded-2xl"
              style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
              <p>{{ grade.id }}</p>
              <p>{{ grade.name }}</p>
              <p>{{ grade.class }}</p>
              <p>{{ grade.status }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-5 border border-[#cecece] rounded-2xl" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
        <p class="font-semibold text-[32px]">Recent Graded</p>

        <div>
          <div class="flex flex-col gap-5">
            <div v-for="(grade, index) in recentGraded" :key="index"
              class="flex justify-around border border-[#cecece] p-3 rounded-2xl"
              style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
              <p>{{ grade.id }}</p>
              <p>{{ grade.name }}</p>
              <p>{{ grade.level }}</p>
              <p>{{ grade.strand }}</p>
              <p>{{ grade.class }}</p>
              <p>{{ grade.subject }}</p>
              <p>{{ grade.grade }}</p>
              <p>{{ grade.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { computed, onMounted } from 'vue';
import BarChart from '@/components/barchart.vue';

const subjectClasses = [
  { count: 60, name: "Favilla", subject: "English Class" },
  { count: 60, name: "SILANG", subject: "Math Class" },
  { count: 60, name: "THEGO", subject: "Science Class" },
  { count: 60, name: "TIERRA", subject: "Physics Class" },
  { count: 60, name: "AIRE", subject: "Astronomy Class" },
  { count: 60, name: "Solomon", subject: "Quantum Class" }
];

const chunkedClasses = computed(() => {
  const chunkSize = 2;
  return subjectClasses.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }
    result[chunkIndex].push(item);
    return result;
  }, []);
});

// Grade Chart Data
const gradeChartData = {
  labels: ['AIRE', 'EINSTEIN', 'FAVILLA', 'SILANG', 'THEGO'],
  datasets: [
    {
      label: '90-100',
      data: [10, 15, 12, 18, 18],
      backgroundColor: '#295F98',
      borderRadius: 50
    },
    {
      label: '85-89',
      data: [18, 18, 25, 22, 19],
      backgroundColor: '#0C5A48',
      borderRadius: 50
    },
    {
      label: '80-84',
      data: [18, 18, 15, 17, 16],
      backgroundColor: '#D0D000',
      borderRadius: 50
    },
    {
      label: '75-79',
      data: [8, 12, 10, 11, 9],
      backgroundColor: '#FF9184',
      borderRadius: 50
    },
    {
      label: 'Below 75',
      data: [4, 5, 3, 7, 6],
      backgroundColor: '#D30000',
      borderRadius: 50
    }
  ]
};

const gradeChartOptions = {
  barThickness: 40,
  maxBarThickness: 35
};

// Submitted Grades Chart Data
const submittedGradesData = {
  labels: ['APPROVED', 'PENDING', 'DECLINED'],
  datasets: [
    {
      label: 'Advisory Class',
      data: [45, 12, 3],
      backgroundColor: '#295F98',
    },
    {
      label: 'Subject Class',
      data: [180, 45, 15],
      backgroundColor: '#0C5A48',
    }
  ]
};

const submittedGradesOptions = {
  barPercentage: 3,
  categoryPercentage: 0.15,
  datasets: {
    barThickness: 5,
    maxBarThickness: 10,
  }
};

// Recent Submitted Grades Data
const recentSubmittedGrades = [
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' },
  { id: '10693001001', name: 'Bueno, Ryan Joshua E.', class: 'Advisory Class', status: 'Approved' }
];

// Recent Graded Data
const recentGraded = [
  {
    id: '10693001001',
    name: 'Bueno, Ryan Joshua E.',
    level: 'Senior High School',
    strand: 'EIM',
    class: 'Advisory Class',
    subject: 'Science',
    grade: '97',
    status: 'Passed'
  },
  {
    id: '10693001001',
    name: 'Bueno, Ryan Joshua E.',
    level: 'Senior High School',
    strand: 'EIM',
    class: 'Advisory Class',
    subject: 'Science',
    grade: '97',
    status: 'Passed'
  },
  {
    id: '10693001001',
    name: 'Bueno, Ryan Joshua E.',
    level: 'Senior High School',
    strand: 'EIM',
    class: 'Advisory Class',
    subject: 'Science',
    grade: '97',
    status: 'Passed'
  },
  {
    id: '10693001001',
    name: 'Bueno, Ryan Joshua E.',
    level: 'Senior High School',
    strand: 'EIM',
    class: 'Advisory Class',
    subject: 'Science',
    grade: '97',
    status: 'Passed'
  },
  {
    id: '10693001001',
    name: 'Bueno, Ryan Joshua E.',
    level: 'Senior High School',
    strand: 'EIM',
    class: 'Advisory Class',
    subject: 'Science',
    grade: '97',
    status: 'Passed'
  }
];
</script>