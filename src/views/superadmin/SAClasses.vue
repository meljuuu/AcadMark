<template>

<h1 class="text-5xl font-bold mb-6">Classes</h1>

  <div class="container mx-auto p-6 shadow-lg">
    <div class="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <!-- Filters & Search -->
      <div class="flex flex-wrap justify-between items-center gap-4">
        <!-- Left Filters -->
        <div class="flex flex-wrap gap-4">
          <select v-model="filters.status" class="min-w-[140px] border border-gray-300 rounded-md px-4 py-3 text-base">
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select v-model="filters.grade" class="min-w-[140px] border border-gray-300 rounded-md px-4 py-3 text-base">
            <option value="">Grade 7-10</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
          </select>

          <select v-model="filters.schoolType" class="min-w-[200px] border border-gray-300 rounded-md px-4 py-3 text-base">
            <option value="">Junior/Senior High School</option>
            <option value="Junior">Junior High School</option>
            <option value="Senior">Senior High School</option>
          </select>

          <select v-model="filters.track" class="min-w-[140px] border border-gray-300 rounded-md px-4 py-3 text-base">
            <option value="">Track</option>
            <option value="STEM">STEM</option>
            <option value="ABM">ABM</option>
            <option value="HUMSS">HUMSS</option>
          </select>
        </div>

        <!-- Right-aligned search -->
        <div class="relative w-[400px]">
            <input
                v-model="filters.search"
                type="text"
                placeholder="Search"
                class="w-full border border-gray-300 rounded-md pl-11 pr-4 py-3 text-base"
            />
            <svg
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-base text-left text-gray-700">
          <thead class="bg-gray-50 text-gray-600 uppercase tracking-wide text-sm">
            <tr>
              <th class="px-6 py-4"></th>
              <th class="px-1 py-4">Grade</th>
              <th class="px-6 py-4">Curriculum</th>
              <th class="px-6 py-4">Track</th>
              <th class="px-6 py-4">Section</th>
              <th class="px-8 py-4">Adviser</th>
              <th class="px-6 py-4">Student Added</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-8 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredData"
              :key="item.id"
              class="hover:bg-gray-50 cursor-pointer transition"
              @click="openModal(item)"
            >
              <!-- Checkbox column -->
              <td class="px-6 py-4">
                <input 
                  type="checkbox" 
                  :value="item.id" 
                  v-model="selectedRows" 
                  @click.stop 
                />
              </td>

              <td class="px-5 py-4">{{ item.grade }}</td>
              <td class="px-13 py-4">{{ item.curriculum }}</td>
              <td class="px-7 py-4">{{ item.track }}</td>
              <td class="px-12 py-4">{{ item.section }}</td>
              <td class="px-7 py-4">{{ item.adviser }}</td>
              <td class="px-17 py-4">{{ item.students }}</td>
              <td class="px-2 py-4">{{ item.date }}</td>
              <td class="px-8 py-4">
                <span
                  :class="{
                    'text-green-600': item.status === 'Active',
                    'text-red-500': item.status === 'Inactive',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="selected"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-md w-full max-w-md p-6 space-y-4 relative">
        <button
          class="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
          @click="selected = null"
        >
          &times;
        </button>

        <h2 class="text-lg font-medium text-gray-800">Class Details</h2>

        <div class="text-base text-gray-700 space-y-1">
          <p><strong>Grade:</strong> {{ selected.grade }}</p>
          <p><strong>Curriculum:</strong> {{ selected.curriculum }}</p>
          <p><strong>Track:</strong> {{ selected.track }}</p>
          <p><strong>Section:</strong> {{ selected.section }}</p>
          <p><strong>Adviser:</strong> {{ selected.adviser }}</p>
          <p><strong>Students:</strong> {{ selected.students }}</p>
          <p><strong>Date:</strong> {{ selected.date }}</p>
          <p><strong>Status:</strong> {{ selected.status }}</p>
        </div>

        <div class="mt-4">
          <label class="block text-base font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            v-model="selected.comment"
            rows="4"
            class="w-full border border-gray-300 rounded-md p-3 text-base focus:ring-1 focus:ring-gray-400"
            placeholder="Enter comment..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ref({
  status: '',
  grade: '',
  schoolType: '',
  track: '',
  search: '',
})

const data = ref([
  {
    id: 1,
    grade: '7',
    curriculum: 'K-12',
    track: 'STEM',
    section: 'A',
    adviser: 'Mr. Santos',
    students: 35,
    date: '2024-06-10',
    status: 'Active',
    comment: 'Well-performing class',
  },
  {
    id: 2,
    grade: '10',
    curriculum: 'K-12',
    track: 'ABM',
    section: 'B',
    adviser: 'Ms. Reyes',
    students: 40,
    date: '2024-06-12',
    status: 'Inactive',
    comment: 'Needs improvement',
  },
  // Add more items as needed
])

const selected = ref(null)
const selectedRows = ref([])

const filteredData = computed(() =>
  data.value.filter((item) => {
    return (
      (!filters.value.status || item.status === filters.value.status) &&
      (!filters.value.grade || item.grade === filters.value.grade) &&
      (!filters.value.track || item.track === filters.value.track) &&
      (!filters.value.search ||
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(filters.value.search.toLowerCase())
        ))
    )
  })
)

const openModal = (item) => {
  selected.value = { ...item }
}
</script>
