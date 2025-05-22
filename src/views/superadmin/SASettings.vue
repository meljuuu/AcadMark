<template>
  <div class="w-full">
    <h1 class="text-5xl font-bold mb-6">Settings</h1>

    <div class="mx-auto bg-white p-8 rounded-2xl w-full w-full mb-6">

       <div class="flex justify-between p-8 rounded-xl mb-6" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <div v-for="tab in tabs" :key="tab" class="w-[48%] cursor-pointer"
                :class="activeTab === tab ? 'border-blue border-b-2' : ''" @click="activeTab = tab">
                <p class="text-center pb-2 font-semibold text-lg" :class="activeTab === tab.value ? 'text-blue' : ''">
                    {{ tab }}
                </p>
            </div>
        </div>
      



      <div class="text-xl text-center">
        <div v-if="activeTab === 'Subjects'">
            <div class="mx-auto bg-white shadow-lg p-8 rounded-2xl w-full w-full mb-6 border border-gray-200">
                <form>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Subject ID</label>
                        </div>
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Subject Code</label>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-8">
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Subject Name</label>
                        </div>
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Grade Level</label>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button 
                        type="button"
                        @click="confirmAddSubject"
                        class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors duration-200 cursor-pointer">
                            Add Subject
                        </button>
                    </div>
                </form>
            </div>

            <div class="mx-auto bg-white shadow-lg p-8 rounded-2xl w-full border border-gray-200 h-[940px] flex flex-col">
                <div class="mb-4 flex items-center justify-between gap-4">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search..."
                            class="border border-[#295f98] rounded px-10 py-2 text-lg"
                            />
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>

                    <div class="flex gap-4">
                        <select v-model="selectedId" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="subject in uniqueIds" :key="subject" :value="subject">{{ subject }}</option>
                        </select>

                        <select v-model="selectedCode" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="subject in uniqueCodes" :key="subject" :value="subject">{{ subject }}</option>
                        </select>

                        <select v-model="selectedGrade" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="grade in uniqueGrades" :key="grade" :value="grade">{{ grade }}</option>
                        </select>
                    </div>
                </div>


                <!-- Scrollable Table Section -->
                <div class="overflow-y-auto flex-grow">
                    <table class="min-w-full divide-y divide-gray-200 text-left">
                        <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                            <tr>
                                <th class="px-6 py-3">Subject ID</th>
                                <th class="px-6 py-3">Subject Code</th>
                                <th class="px-6 py-3">Subject Name</th>
                                <th class="px-6 py-3">Grade Level</th>
                                <th class="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="subject in paginatedSubjects" :key="subject.id">
                                <td class="px-6 py-4 whitespace-nowrap text-lg">{{ subject.id }}</td>
                                <td class="px-6 py-4 text-lg">{{ subject.code }}</td>
                                <td class="px-6 py-4 text-lg">{{ subject.name }}</td>
                                <td class="px-6 py-4 text-lg">{{ subject.grade }}</td>
                                <td class="px-6 py-4 flex space-x-2 text-lg">
                                    <button
                                        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                                        @click="confirmDeleteSubject">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination at the bottom -->
                <div class="flex justify-center items-center mt-4 space-x-1 pt-4 border-t border-gray-300">
                    <button
                        class="px-3 text-lg border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                        :disabled="currentPage === 1"
                        @click="currentPage--">
                        <span>←</span> Previous
                    </button>

                    <button
                        v-for="page in pageNumbers"
                        :key="page"
                        class="py-1 text-lg border border-[#295F98] rounded w-10 text-center"
                        :class="{
                            'bg-[#295F98] text-white': page === currentPage,
                            'text-gray-600': page !== currentPage,
                            'cursor-default': page === '...',
                            'cursor-pointer': page !== '...',
                        }"
                        @click="page !== '...' && (currentPage = page)"
                        :disabled="page === '...'">
                        {{ page }}
                    </button>

                    <button
                        class="px-3 text-lg border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                        :disabled="currentPage === totalPages"
                        @click="currentPage++">
                        Next <span>→</span>
                    </button>
                </div>
            </div>
        </div>

        <div v-else-if="activeTab === 'Section'">
          <div class="mx-auto bg-white shadow-lg p-8 rounded-2xl w-full w-full mb-6 border border-gray-200">
                <form>
                    <div class="grid grid-cols-4 gap-4 mb-8">
                      <div class="floating-label">
                        <select class="input" v-model="selectedHighSchool" required>
                          <option value=""></option>
                          <option v-for="school in highSchool" :key="school" :value="school">
                            {{ school }}
                          </option>
                        </select>
                        <label>High School</label>
                      </div>

                      <div class="floating-label">
                        <select class="input" v-model="selectedGrade" required :disabled="!selectedHighSchool">
                          <option value=""></option>
                          <option v-for="grade in filteredGrades" :key="grade" :value="grade">
                            {{ grade }}
                          </option>
                        </select>
                        <label>Grade Level</label>
                      </div>

                     <div class="floating-label">
                      <select class="input" v-model="selectedCurriculumTrack" required :disabled="!selectedHighSchool">
                        <option value=""></option>
                        <option v-for="item in filteredCurriculumTrack" :key="item" :value="item">
                          {{ item }}
                        </option>
                      </select>
                      <label>{{ curriculumOrTrackLabel }}</label>
                    </div>
                  </div>

                  <div class="space-y-2">
                      <div class="flex items-end gap-2">
                        <div class="floating-label mb-4">
                          <input
                            v-model="newSection"
                            type="text"
                            class="input"
                            placeholder=" "
                          />
                          <label>Section</label>
                        </div>
                        <button
                          @click="addSection"
                          type="button"
                          class="bg-blue-500 text-white px-3 py-1 rounded h-9 cursor-pointer"
                          title="Add Section"
                        >
                          +
                        </button>
                      </div>

                      <div
                        v-for="(section, index) in sections"
                        :key="index"
                        class="flex items-end gap-2"
                      >
                        <div class="floating-label mb-4">
                          <input
                            v-model="section.value"
                            type="text"
                            class="input"
                            placeholder=" "
                            disabled
                          />
                          <label>Section</label>
                        </div>

                        <button
                          @click="removeSection(index)"
                          class="bg-red-500 text-white px-3 py-1 rounded h-9 cursor-pointer"
                          title="Remove Section"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                   <div class="flex justify-end">
                        <button 
                          type="button"
                          @click="confirmAddSection"
                          class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors duration-200 cursor-pointer">
                            Add Section
                        </button>
                    </div>
                </form>
          </div>

            <div class="mx-auto bg-white shadow-lg p-8 rounded-2xl w-full border border-gray-200 h-[940px] flex flex-col">
                <div class="mb-4 flex items-center justify-between gap-4">
                    <div class="relative">
                        <input
                            v-model="searchRecordsQuery"
                            type="text"
                            placeholder="Search..."
                            class="border border-[#295f98] rounded px-10 py-2 text-lg"
                            />
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>

                    <div class="flex gap-4">
                      <select v-model="selectedRecordsHighSchool" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="school in uniqueRecordsHighSchools" :key="school" :value="school">{{ school }}</option>
                      </select>

                      <select v-model="selectedRecordsGradeLevel" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="level in uniqueRecordsGradeLevels" :key="level" :value="level">{{ level }}</option>
                      </select>

                      <select v-model="selectedRecordsTrack" class="filter-dropdown">
                        <option value="">All</option>
                        <option v-for="track in uniqueRecordsTracks" :key="track" :value="track">{{ track }}</option>
                      </select>
                    </div>
                </div>


                <!-- Scrollable Table Section -->
                <div class="overflow-y-auto flex-grow">
                  <table class="min-w-full divide-y divide-gray-200 text-left">
                    <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                      <tr>
                        <th class="px-6 py-3">High School Education</th>
                        <th class="px-6 py-3">Grade Level</th>
                        <th class="px-6 py-3">Curriculum/ Track</th>
                        <th class="px-6 py-3">Section</th>
                        <th class="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="(section, index) in paginatedSections" :key="index">
                        <td class="px-6 py-4 text-lg">{{ section.highSchool }}</td>
                        <td class="px-6 py-4 text-lg">{{ section.gradeLevel }}</td>
                        <td class="px-6 py-4 text-lg">{{ section.curriculumTrack }}</td>
                        <td class="px-6 py-4 text-lg">{{ section.section }}</td>
                        <td class="px-6 py-4 flex space-x-2 text-lg">
                          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                            @click="confirmDeleteRecord">
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="flex justify-center items-center mt-4 space-x-1 pt-4 border-t border-gray-300">
                  <button
                    class="px-3 text-lg border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                    :disabled="currentRecordsPage === 1"
                    @click="currentRecordsPage--"
                  >
                    <span>←</span> Previous
                  </button>

                  <button
                    v-for="page in sectionPageNumbers"
                    :key="page"
                    class="py-1 text-lg border border-[#295F98] rounded w-10 text-center"
                    :class="{
                      'bg-[#295F98] text-white': page === currentRecordsPage,
                      'text-gray-600': page !== currentRecordsPage,
                      'cursor-default': page === '...',
                      'cursor-pointer': page !== '...',
                    }"
                    @click="page !== '...' && (currentRecordsPage = page)"
                    :disabled="page === '...'"
                  >
                    {{ page }}
                  </button>

                  <button
                    class="px-3 text-lg border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                    :disabled="currentRecordsPage === totalSectionPages"
                    @click="currentRecordsPage++"
                  >
                    Next <span>→</span>
                  </button>
                </div>
              </div>
        </div>

        <div v-else-if="activeTab === 'School Year'">
          <div class="mx-auto bg-white shadow-lg p-8 rounded-2xl w-full w-full mb-6 border border-gray-200">
                <form>
                    <div class="grid grid-cols-4 gap-4 mb-4">
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>School Year</label>
                        </div>
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>Start Date</label>
                        </div>
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>End Date</label>
                        </div>
                        <div class="floating-label mb-4">
                            <input
                                type="text"
                                class="input"
                                placeholder=" "
                            />
                            <label>S.Y Name</label>
                        </div>
                    </div>

                   <div class="flex justify-end">
                        <button 
                          type="button"
                          @click="confirmAddSchoolYear"
                          class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors duration-200 cursor-pointer">
                            Add S.Y
                        </button>
                    </div>
                </form>
            </div>
            <div class="mx-auto bg-white shadow-lg p-8 rounded-2xl w-full border border-gray-200 h-[940px] flex flex-col">
                <div class="mb-4 flex justify-end">
                  <div class="relative">
                    <input
                      v-model="searchSchoolYearQuery"
                      type="text"
                      placeholder="Search..."
                      class="border border-[#295f98] rounded px-10 py-2 text-lg"
                    />
                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>


                <!-- Scrollable Table Section -->
                <div class="overflow-y-auto flex-grow">
                  <table class="min-w-full divide-y divide-gray-200 text-left">
                    <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                      <tr>
                        <th class="px-6 py-3">School Year</th>
                        <th class="px-6 py-3">Start Date</th>
                        <th class="px-6 py-3">End Date</th>
                        <th class="px-6 py-3">S.Y Name</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="(item, index) in paginatedSchoolYears" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap text-lg">{{ item.sy }}</td>
                        <td class="px-6 py-4 text-lg">{{ item.startDate }}</td>
                        <td class="px-6 py-4 text-lg">{{ item.endDate }}</td>
                        <td class="px-6 py-4 text-lg">{{ item.syName }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


            <div class="flex justify-center items-center mt-4 space-x-1 pt-4 border-t border-gray-300">
              <button
                class="px-3 text-lg border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                :disabled="currentSchoolYearPage === 1"
                @click="currentSchoolYearPage--"
              >
                <span>←</span> Previous
              </button>

              <button
                v-for="page in totalSchoolYearPages"
                :key="page"
                class="py-1 text-lg border border-[#295F98] rounded w-10 text-center"
                :class="{
                  'bg-[#295F98] text-white': page === currentSchoolYearPage,
                  'text-gray-600': page !== currentSchoolYearPage,
                }"
                @click="currentSchoolYearPage = page"
              >
                {{ page }}
              </button>

              <button
                class="px-3 text-lg border border-[#295F98] text-[#295F98] py-1 rounded w-28 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer"
                :disabled="currentSchoolYearPage === totalSchoolYearPages"
                @click="currentSchoolYearPage++"
              >
                Next <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2';

const tabs = ['Subjects', 'Section', 'School Year']
const activeTab = ref('Subjects')

const highSchool = ["Junior High School", "Senior High School"]
const juniorGrades = ["Grade 7", "Grade 8", "Grade 9", "Grade 10"]
const seniorGrades = ["Grade 11", "Grade 12"]
const juniorCurriculum = ["SPA", "SPJ", "BEC"]
const seniorTrack = ["TVL", "HUMMS", "TVL-IEM"]

const searchQuery = ref('')
const selectedId = ref('')
const selectedCode = ref('')
const selectedGrade = ref('')
const selectedHighSchool = ref('')
const selectedCurriculumTrack = ref('')

const searchRecordsQuery = ref('')
const selectedRecordsHighSchool = ref('')
const selectedRecordsGradeLevel = ref('')
const selectedRecordsTrack = ref('')

const filteredGrades = computed(() => {
  if (selectedHighSchool.value === "Junior High School") {
    return juniorGrades
  } else if (selectedHighSchool.value === "Senior High School") {
    return seniorGrades
  } else {
    return []
  }
})

const filteredCurriculumTrack = computed(() => {
  if (selectedHighSchool.value === "Junior High School") {
    return juniorCurriculum
  } else if (selectedHighSchool.value === "Senior High School") {
    return seniorTrack
  } else {
    return []
  }
})

const curriculumOrTrackLabel = computed(() => {
  if (selectedHighSchool.value === "Junior High School") {
    return 'Curriculum'
  } else if (selectedHighSchool.value === "Senior High School") {
    return 'Track'
  } else {
    return 'Curriculum/Track'
  }
})

const sections = ref([]);
const newSection = ref('');

const addSection = () => {
  const trimmed = newSection.value.trim();
  if (!trimmed) return;
  sections.value.push({ value: trimmed });
  newSection.value = '';
};

const removeSection = (index) => {
  sections.value.splice(index, 1);
};

const sectionRecords = ref([
  {
    highSchool: 'Junior High School',
    gradeLevel: 'Grade 10',
    curriculumTrack: 'SPJ',
    section: '10-Diamond',
  },
  {
    highSchool: 'Senior High School',
    gradeLevel: 'Grade 11',
    curriculumTrack: 'TVL',
    section: '11-STEM A',
  },
  {
    highSchool: 'Senior High School',
    gradeLevel: 'Grade 12',
    curriculumTrack: 'HUMMS',
    section: '12-STEM B',
  },
  {
    highSchool: 'Junior High School',
    gradeLevel: 'Grade 7',
    curriculumTrack: 'BEC',
    section: '7-Topaz',
  },
  {
    highSchool: 'Junior High School',
    gradeLevel: 'Grade 8',
    curriculumTrack: 'SPA',
    section: '8-Emerald',
  },
  {
    highSchool: 'Junior High School',
    gradeLevel: 'Grade 9',
    curriculumTrack: 'SHS',
    section: '9-Ruby',
  },
  {
 
    highSchool: 'Junior High School',
    gradeLevel: 'Grade 10',
    curriculumTrack: 'SPJ',
    section: '10-Amethyst',
  },
  {

    highSchool: 'Senior High School',
    gradeLevel: 'Grade 11',
    curriculumTrack: 'TVL-IEM',
    section: '11-TVL B',
  },
  {
    highSchool: 'Senior High School',
    gradeLevel: 'Grade 12',
    curriculumTrack: 'TVL',
    section: '12-TVL A',
  },
  {
    highSchool: 'Junior High School',
    gradeLevel: 'Grade 8',
    curriculumTrack: 'BEC',
    section: '8-Garnet',
  },
  {
    highSchool: 'Junior High School',
    gradeLevel: 'Grade 7',
    curriculumTrack: 'SPA',
    section: '7-Pearl',
  },
  {
    highSchool: 'Senior High School',
    gradeLevel: 'Grade 12',
    curriculumTrack: 'TVL-IEM',
    section: '12-ICT C',
  }
])

const schoolYear = ref([
  {
    sy: '2022-2023',
    startDate: '2022-08-01',
    endDate: '2023-06-15',
    syName: 'Academic Year 2022-2023'
  },
  {
      sy: '2023-2024',
      startDate: '2023-08-01',
      endDate: '2024-06-15',
      syName: 'Academic Year 2023-2024'
    },
    {
      sy: '2024-2025',
      startDate: '2024-08-01',
      endDate: '2025-06-15',
      syName: 'Academic Year 2024-2025'
    }
  ])


  const subjects = ref([
    { id: '101', code: 'ENG101', name: 'English Language', grade: 'Grade 7' },
    { id: '102', code: 'MATH101', name: 'Basic Math', grade: 'Grade 8' },
    { id: '103', code: 'SCI101', name: 'General Science', grade: 'Grade 7' },
    { id: '104', code: 'HIST101', name: 'World History', grade: 'Grade 8' },
    { id: '105', code: 'GEO101', name: 'Geography', grade: 'Grade 9' },
    { id: '106', code: 'BIO101', name: 'Biology', grade: 'Grade 10' },
    { id: '107', code: 'CHEM101', name: 'Chemistry', grade: 'Grade 11' },
    { id: '108', code: 'PHY101', name: 'Physics', grade: 'Grade 12' },
    { id: '109', code: 'COMP101', name: 'Computer Science', grade: 'Grade 9' },
    { id: '110', code: 'ART101', name: 'Art and Design', grade: 'Grade 7' },
    { id: '111', code: 'MUSIC101', name: 'Music', grade: 'Grade 10' },
    { id: '112', code: 'PE101', name: 'Physical Education', grade: 'Grade 8' },
    { id: '113', code: 'ENG102', name: 'English Literature', grade: 'Grade 11' }
  ])

  const uniqueIds = computed(() => [...new Set(subjects.value.map(subject => subject.id))])
  const uniqueCodes = computed(() => [...new Set(subjects.value.map(subject => subject.code))])
  const uniqueGrades = computed(() => [...new Set(subjects.value.map(subject => subject.grade))])

  const filteredSubjects = computed(() => {
    const query = searchQuery.value.toLowerCase()

    return subjects.value.filter(subject => {
      const matchesSearch =
        subject.name.toLowerCase().includes(query) ||
        subject.id.toString().toLowerCase().includes(query) ||
        subject.code.toLowerCase().includes(query) ||
        subject.grade.toLowerCase().includes(query)

      const matchesId = !selectedId.value || subject.id === selectedId.value
      const matchesCode = !selectedCode.value || subject.code === selectedCode.value
      const matchesGrade = !selectedGrade.value || subject.grade === selectedGrade.value

      return matchesSearch && matchesId && matchesCode && matchesGrade
    })
  })

  const currentPage = ref(1)
  const itemsPerPage = 10

  const totalPages = computed(() =>
    Math.ceil(filteredSubjects.value.length / itemsPerPage)
  )

  const paginatedSubjects = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredSubjects.value.slice(start, start + itemsPerPage)
  })

  const pageNumbers = computed(() => {
    const pages = []
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
    return pages
  })


  const uniqueRecordsHighSchools = computed(() =>
    [...new Set(sectionRecords.value.map(record => record.highSchool))])

  const uniqueRecordsGradeLevels = computed(() =>
    [...new Set(sectionRecords.value.map(record => record.gradeLevel))])

  const uniqueRecordsTracks = computed(() =>
    [...new Set(sectionRecords.value.map(record => record.curriculumTrack))])

  const currentRecordsPage = ref(1)
  const recordsPerPage = 10

  const filteredSection = computed(() => {
    const query = searchRecordsQuery.value.toLowerCase()

    return sectionRecords.value.filter(record => {
      const matchesSearch =
        record.highSchool.toLowerCase().includes(query) ||
        record.gradeLevel.toLowerCase().includes(query) ||
        record.curriculumTrack.toLowerCase().includes(query) ||
        record.section.toLowerCase().includes(query)

      const matchesHighSchool = !selectedRecordsHighSchool.value || record.highSchool === selectedRecordsHighSchool.value
      const matchesGrade = !selectedRecordsGradeLevel.value || record.gradeLevel === selectedRecordsGradeLevel.value
      const matchesTrack = !selectedRecordsTrack.value || record.curriculumTrack === selectedRecordsTrack.value

      return matchesSearch && matchesHighSchool && matchesGrade && matchesTrack
    })
  })

  const totalSectionPages = computed(() =>
    Math.ceil(filteredSection.value.length / recordsPerPage)
  )

  const paginatedSections = computed(() => {
    const start = (currentRecordsPage.value - 1) * recordsPerPage
    return filteredSection.value.slice(start, start + recordsPerPage)
  })

  const sectionPageNumbers = computed(() => {
    const pages = []
    for (let i = 1; i <= totalSectionPages.value; i++) {
      pages.push(i)
    }
    return pages
  })

const searchSchoolYearQuery = ref('');
const currentSchoolYearPage = ref(1);
const schoolYearItemsPerPage = 10;

const filteredSchoolYears = computed(() => {
  const query = searchSchoolYearQuery.value.toLowerCase();
  return schoolYear.value.filter((year) =>
    year.sy.toLowerCase().includes(query) ||
    year.syName.toLowerCase().includes(query)
  );
});

const paginatedSchoolYears = computed(() => {
  const start = (currentSchoolYearPage.value - 1) * schoolYearItemsPerPage;
  return filteredSchoolYears.value.slice(start, start + schoolYearItemsPerPage);
});

const totalSchoolYearPages = computed(() =>
  Math.ceil(filteredSchoolYears.value.length / schoolYearItemsPerPage)
);

  const confirmAddSection = async () => {
    const result = await Swal.fire({
      title: 'Add Section',
      text: 'Are you sure you want to add a new section?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Add',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      // Call your actual logic here
      addSection();

      await Swal.fire({
        icon: 'success',
        title: 'Added',
        text: 'The section has been added successfully.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const confirmAddSubject = async () => {
    const result = await Swal.fire({
      title: 'Add Subject',
      text: 'Are you sure you want to add a new subject?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Add',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      // Call your actual logic here
      addSection();

      await Swal.fire({
        icon: 'success',
        title: 'Added',
        text: 'The subject has been added successfully.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const confirmAddSchoolYear = async () => {
    const result = await Swal.fire({
      title: 'Add School Year',
      text: 'Are you sure you want to add a new school year?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Add',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      // Call your actual logic here
      addSection();

      await Swal.fire({
        icon: 'success',
        title: 'Added',
        text: 'The school year has been added successfully.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };




  const confirmDeleteSubject = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this subject?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D30000',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'The subject has been deleted.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const confirmDeleteRecord = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D30000',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'The record has been deleted.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  watch([searchQuery, selectedId, selectedCode, selectedGrade, 
  searchRecordsQuery, selectedRecordsHighSchool, selectedRecordsGradeLevel, selectedRecordsTrack, searchSchoolYearQuery], () => {
    currentPage.value = 1
  })
  </script>


<style scoped>
.floating-label {
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}

.floating-label .input {
  padding: 1rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  background: white;
}

.floating-label label {
  position: absolute;
  left: 0.5rem;
  top: 0.75rem;
  background: white;
  color: #888;
  padding: 0 0.25rem;
  transition: all 0.2s ease;
  pointer-events: none;
}

.floating-label input {
  transform: translateY(1.5rem);
  font-size: 1rem;
}

.floating-label select {
  padding: 1rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  background: white;
  transform: translateY(1.5rem);
  font-size: 1rem;
}




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


