<template>
  <h1 class="text-5xl font-bold mb-6">Classes</h1>

  <div class="container mx-auto p-6 shadow-lg">
    <div class="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <!-- Filters & Search -->
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div class="flex flex-wrap gap-4">
          <Dropdown
            :showStatus="true"
            @update:selectedStatus="selectedStatus = $event"
          />

          <Dropdown
            :showGrade="true"
            @update:selectedGrade="selectedGrade = $event"
          />

          <Dropdown
            :showCurriculum="true"
            @update:selectedCurriculum="selectedCurriculum = $event"
          />

          <Dropdown
            :showTrack="true"
            @update:selectedTrack="selectedTrack = $event"
          />
        </div>

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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
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
              <td class="px-6 py-4">
                <input type="checkbox" :value="item.id" v-model="selectedRows" @click.stop />
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
      <div
        class="bg-white rounded-xl shadow-md w-full max-w-md p-6 space-y-4 relative"
      >
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
          <label
            class="block text-base font-medium text-gray-700 mb-1"
            >Comment</label
          >
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
import { ref, computed } from "vue";
import Dropdown from "@/SAcomponents/SAdropdown.vue";

// Reactive filter states
const selectedStatus = ref("");
const selectedGrade = ref("");
const selectedCurriculum = ref("");
const selectedTrack = ref("");

// Search input state
const filters = ref({
  search: "",
});

// Sample data (replace with your real data)
const data = ref([
  {
    id: 1,
    grade: 10,
    curriculum: "K-12",
    track: "STEM",
    section: "A",
    adviser: "Mr. Smith",
    students: 30,
    date: "2023-05-01",
    status: "Active",
    comment: "",
  },
  {
    id: 2,
    grade: 11,
    curriculum: "BEC",
    track: "ABM",
    section: "B",
    adviser: "Ms. Johnson",
    students: 25,
    date: "2023-04-15",
    status: "Inactive",
    comment: "",
  },
  // ... more items here
]);

const selectedRows = ref([]);
const selected = ref(null);

// Computed filtered data based on dropdowns and search
const filteredData = computed(() => {
  return data.value.filter((item) => {
    const matchesStatus =
      !selectedStatus.value || item.status === selectedStatus.value;
    const matchesGrade =
      !selectedGrade.value || item.grade === Number(selectedGrade.value);
    const matchesCurriculum =
      !selectedCurriculum.value || item.curriculum === selectedCurriculum.value;
    const matchesTrack =
      !selectedTrack.value || item.track === selectedTrack.value;

    const searchTerm = filters.value.search.toLowerCase();
    const matchesSearch =
      item.adviser.toLowerCase().includes(searchTerm) ||
      item.section.toLowerCase().includes(searchTerm);

    return matchesStatus && matchesGrade && matchesCurriculum && matchesTrack && matchesSearch;
  });
});

function openModal(item) {
  selected.value = item;
}
</script>
