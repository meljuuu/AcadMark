<template>
  <div class="overflow-x-auto">
    <h1 class="title">Dashboard</h1>

    <div class="bg-[#fff] px-20 py-10 gap-7 flex flex-col rounded-[10px]"
      style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px 1px;">

      <Dropdown :showCurriculum="true" :showAcademicTrack="true" />

      <div class="flex justify-between gap-5 flex-wrap items-center">

        <div v-for="(block, index) in blocks" :key="index"
          class="border-[1px] border-[#AFAFAF] rounded-md p-5 shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <div class="flex gap-10">
            <div class="flex flex-col justify-center items-center">
              <p class="font-bold text-5xl text-[#292929]">{{ block.value }}</p>
              <p>{{ block.label }}</p>
            </div>

            <img :src="block.imgSrc" alt="Icon" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 bg-[#fff] rounded-[10px]" style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px 1px;">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="border px-4 py-2 text-left whitespace-nowrap">Section</th>
              <th class="border px-4 py-2 text-left whitespace-nowrap">Total Students</th>
              <th class="border px-4 py-2 text-left whitespace-nowrap">Male</th>
              <th class="border px-4 py-2 text-left whitespace-nowrap">Female</th>
              <th class="border px-4 py-2 text-left whitespace-nowrap">Academic Track</th>
              <th class="border px-4 py-2 text-left whitespace-nowrap">Grade</th>
              <th class="border px-4 py-2 text-left whitespace-nowrap">Class Type</th>
              <th class="border px-4 py-2 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(section, index) in sections" :key="index">
              <td class="border px-4 py-2">{{ section.name }}</td>
              <td class="border px-4 py-2">{{ section.totalStudents }}</td>
              <td class="border px-4 py-2">{{ section.male }}</td>
              <td class="border px-4 py-2">{{ section.female }}</td>
              <td class="border px-4 py-2">{{ section.academicTrack }}</td>
              <td class="border px-4 py-2">{{ section.grade }}</td>
              <td class="border px-4 py-2">{{ section.classType }}</td>
              <td class="border px-4 py-2">
                <button class="bg-blue-500 text-white px-4 py-2 rounded">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import Dropdown from '../components/dropdown.vue';
import { ref } from 'vue';


const blocks = ref([
  { value: 125, label: 'TOTAL STUDENTS', imgSrc: '/assets/img/dashboard/Vector.png' },
  { value: 125, label: 'MALES STUDENTS', imgSrc: '/assets/img/dashboard/Vector.png' },
  { value: 125, label: 'FEMALE STUDENTS', imgSrc: '/assets/img/dashboard/Vector.png' },
  { value: 125, label: 'TOTAL SUBJECTS', imgSrc: '/assets/img/dashboard/Vector.png' }
]);


const sections = ref([
  { name: 'Section A', totalStudents: 40, male: 20, female: 20, academicTrack: 'STEM', grade: 10, classType: 'Regular' },
  { name: 'Section B', totalStudents: 35, male: 17, female: 18, academicTrack: 'ABM', grade: 11, classType: 'Special' },
  { name: 'Section C', totalStudents: 45, male: 22, female: 23, academicTrack: 'GAS', grade: 12, classType: 'Regular' },
  { name: 'Section D', totalStudents: 50, male: 25, female: 25, academicTrack: 'STEM', grade: 15, classType: 'Regular' },
  { name: 'Section E', totalStudents: 30, male: 12, female: 18, academicTrack: 'ABM', grade: 9, classType: 'Special' },
  { name: 'Section F', totalStudents: 55, male: 28, female: 27, academicTrack: 'GAS', grade: 14, classType: 'Regular' }
]);
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: none;
  text-align: center;
  font-size: 15px;
}

th {
  color: #464F60;
  font-weight: 600;
  font-size: 18px;
}

td {
  font-weight: 500;
}
</style>
