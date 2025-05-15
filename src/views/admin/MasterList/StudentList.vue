<!-- StudentList.vue -->
<template>
    <div>
        <span class="text-black text-2xl font-semibold mb-8 cursor-pointer hover:text-blue-500" @click="goBack">
            &lt; <span class="underline hover:underline">Back</span>
        </span>

        <div class="student-list-container mb-6">
            <div class="flex justify-between items-center">
                <div class="flex gap-4">
                    <div class="relative w-30">
                        <select v-model="genderFilter"
                            class="appearance-none border border-gray-300 rounded-md px-5 py-2 w-full">
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="All">All</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    <div class="relative w-30">
                        <select v-model="sortOrder"
                            class="appearance-none border border-gray-300 rounded-md px-5 py-2 w-full">
                            <option value="Latest">Latest</option>
                            <option value="Oldest">Oldest</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="relative flex-1 mx-4 w">
                    <input v-model="searchTerm" type="text" placeholder="Search..."
                        class="border border-gray-300 rounded-md py-2 px-3 pl-10 w-62" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div class="flex gap-2">
                    <button class="bg-[#858585] p-2 rounded cursor-pointer" @click="handleDownload">
                        <img src="/assets/img/admin/download.svg" class="w-7 h-7 object-contain" alt="Download Icon">
                    </button>
                    <button class="bg-red p-2 rounded cursor-pointer" @click="handleDeleteAll">
                        <img src="/assets/img/admin/delete.svg" class="w-7 h-7 object-contain" alt="Delete Icon">
                    </button>
                    <button class="bg-blue p-2 rounded cursor-pointer" @click="showAddModal = true">
                        <img src="/assets/img/admin/add.svg" class="w-7 h-7 object-contain" alt="">
                    </button>
                    <button class="bg-green p-2 rounded cursor-pointer" @click="openEditModal">
                        <img src="/assets/img/admin/edit.svg" class="w-7 h-7 object-contain" alt="Edit Icon">
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="student-list-container">
        <div class="overflow-x-auto bg-white shadow mb-6">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="bg-gray-100 font-semibold px-4 py-3 text-center">LRN</th>
                        <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Full Name</th>
                        <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Gender</th>
                        <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Birthdate</th>
                        <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Age</th>
                        <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in filteredStudents" :key="student.lrn">
                        <td class="px-4 py-3  text-center text-base font-medium">{{ student.lrn }}</td>
                        <td class="px-4 py-3  text-center text-base font-medium">{{ student.fullName }}</td>
                        <td class="px-4 py-3  text-center text-base font-medium">{{ student.gender }}</td>
                        <td class="px-4 py-3  text-center text-base font-medium">{{ student.birthdate }}</td>
                        <td class="px-4 py-3  text-center text-base font-medium">{{ calculateAge(student.birthdate) }}
                        </td>
                        <td class="px-4 py-3  text-center text-base font-medium">{{ student.address }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg p-8 w-[90vw] max-w-5xl relative">
            <div class="flex justify-between items-start gap-8">
                <div>
                    <!-- Left: Filters -->
                    <div class="flex gap-4">
                        <div class="relative w-30">
                            <select v-model="modalGenderFilter"
                                class="appearance-none border border-gray-300 rounded-md px-5 py-2 w-full">
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="All">All</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <div class="relative w-30">
                            <select v-model="modalSortOrder"
                                class="appearance-none border border-gray-300 rounded-md px-5 py-2 w-full">
                                <option value="Latest">Latest</option>
                                <option value="Oldest">Oldest</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Restore Select All Checkbox below filters -->
                    <label class="flex items-center mt-4">
                        <input type="checkbox" v-model="modalSelectAll" @change="toggleModalSelectAll">
                        <span class="ml-2">Select All</span>
                    </label>
                </div>

                <!-- Right: Search -->
                <div class="relative flex-1 mx-4 w-full">
                    <input v-model="modalSearchTerm" type="text" placeholder="Search..."
                        class="border border-gray-300 rounded-md py-2 px-3 pl-10 w-full" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <!-- Table with checkboxes -->
            <div class="mt-6 max-h-[60vh] overflow-auto">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">LRN</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Full Name</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Gender</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Birthdate</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Age</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in filteredModalStudents" :key="student.lrn">
                            <td>
                                <input type="checkbox" v-model="modalSelectedStudents" :value="student.lrn">
                            </td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.lrn }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.fullName }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.gender }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.birthdate }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ calculateAge(student.birthdate)
                                }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.address }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-end gap-2 mt-6">
                <button class="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                    @click="showAddModal = false">Cancel</button>
                <button class="px-6 py-2 rounded bg-blue hover:bg-blue-700 text-white cursor-pointer"
                    @click="handleAddStudents">Add Students</button>
            </div>
        </div>
    </div>

    <div v-if="showEditModal" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg p-8 w-[90vw] max-w-5xl relative">
            <button @click="showEditModal = false"
                class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl">&times;</button>
            <div class="flex justify-between items-start gap-8">
                <div>
                    <!-- Left: Filters -->
                    <div class="flex gap-4">
                        <div class="relative w-30">
                            <select v-model="editModalGenderFilter"
                                class="appearance-none border border-gray-300 rounded-md px-5 py-2 w-full">
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="All">All</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <!-- Select All Checkbox -->
                    <label class="flex items-center mt-4">
                        <input type="checkbox" v-model="editModalSelectAll" @change="toggleEditModalSelectAll">
                        <span class="ml-2">Select All</span>
                    </label>
                </div>
                <!-- Right: Search -->
                <div class="relative flex-1 mx-4 w-full">
                    <input v-model="editModalSearchTerm" type="text" placeholder="Search..."
                        class="border border-gray-300 rounded-md py-2 px-3 pl-10 w-full" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <!-- Table with checkboxes -->
            <div class="mt-6 max-h-[60vh] overflow-auto">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">LRN</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Full Name</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Gender</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Birthdate</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Age</th>
                            <th class="bg-gray-100 font-semibold px-4 py-3 text-center">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in filteredEditModalStudents" :key="student.lrn">
                            <td>
                                <input type="checkbox" v-model="editModalSelectedStudents" :value="student.lrn">
                            </td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.lrn }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.fullName }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.gender }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.birthdate }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ calculateAge(student.birthdate)
                            }}</td>
                            <td class="px-4 py-3  text-center text-base font-medium">{{ student.address }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-end gap-2 mt-6">
                <button class="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                    @click="showEditModal = false">Cancel</button>
                <button class="px-6 py-2 rounded bg-green hover:bg-green-700 text-white cursor-pointer"
                    @click="handleUpdateClass">Update Class</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';

const props = defineProps({
    selectedCard: {
        type: Object,
        required: true,
    },
});

const genderFilter = ref('Female');
const sortOrder = ref('Latest');
const searchTerm = ref('');
const selectAll = ref(false);
const selectedStudents = ref([]);
const showAddModal = ref(false);

// Modal-specific filter/search/sort state
const modalGenderFilter = ref('Female');
const modalSortOrder = ref('Latest');
const modalSearchTerm = ref('');
const modalSelectAll = ref(false);
const modalSelectedStudents = ref([]);

const showEditModal = ref(false);
const editModalGenderFilter = ref('Female');
const editModalSearchTerm = ref('');
const editModalSelectAll = ref(false);
const editModalSelectedStudents = ref([]);

const randomNames = [
    'Juan Dela Cruz',
    'Maria Clara Santos',
    'Jose Rizal',
    'Andres Bonifacio',
    'Gabriela Silang',
    'Emilio Aguinaldo',
    'Lapu-Lapu',
    'Melchora Aquino',
    'Apolinario Mabini',
    'Gregoria de Jesus',
];
const randomAddresses = [
    'Brgy. San Isidro, Quezon City',
    'Brgy. Mabini, Batangas City',
    'Brgy. Poblacion, Makati City',
    'Brgy. Sto. Niño, Marikina City',
    'Brgy. Balibago, Angeles City',
    'Brgy. San Roque, Cebu City',
    'Brgy. Bagumbayan, Taguig City',
    'Brgy. Malinta, Valenzuela City',
    'Brgy. San Antonio, Pasig City',
    'Brgy. Tambo, Parañaque City',
];
const randomGenders = ['M', 'F'];
const randomBirthdates = [
    '2001-03-21',
    '2002-07-15',
    '2000-12-05',
    '2003-01-10',
    '2001-09-30',
    '2002-04-18',
    '2000-11-22',
    '2003-06-09',
    '2001-08-14',
    '2002-02-27',
];

function randomLRN(index) {
    return '10693001' + (100 + index).toString();
}

const students = ref(
    Array.from({ length: 10 }, (_, i) => ({
        lrn: randomLRN(i),
        fullName: randomNames[i],
        gender: randomGenders[i % 2],
        birthdate: randomBirthdates[i],
        address: randomAddresses[i],
    }))
);

const filteredStudents = computed(() => {
    let result = [...students.value];

    // Apply gender filter if not 'All'
    if (genderFilter.value !== 'All') {
        const genderCode = genderFilter.value === 'Female' ? 'F' : 'M';
        result = result.filter((student) => student.gender === genderCode);
    }

    // Apply search filter if searchTerm exists
    if (searchTerm.value.trim()) {
        const term = searchTerm.value.toLowerCase();
        result = result.filter(
            (student) =>
                student.fullName.toLowerCase().includes(term) ||
                student.lrn.includes(term) ||
                student.address.toLowerCase().includes(term)
        );
    }

    // Apply sorting
    if (sortOrder.value === 'Latest') {
        // For demo, no actual sorting since all dates are the same
        // In real app, would sort by date
    } else {
        result.reverse();
    }

    return result;
});

function goBack() {
    // emits are handled differently in <script setup>
    // use defineEmits
    emit('goBack');
}

const emit = defineEmits(['goBack']);

function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (
        month < birthDate.getMonth() ||
        (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }
    return age;
}

function handleDownload() {
    const exportData = filteredStudents.value.map(student => ({
        ...student,
        age: calculateAge(student.birthdate),
    }));

    const wsData = [
        ['LRN', 'Full Name', 'Gender', 'Birthdate', 'Age', 'Address'],
        ...exportData.map(student => [
            student.lrn,
            student.fullName,
            student.gender,
            student.birthdate,
            student.age ? String(student.age) : '',
            student.address,
        ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'StudentList.xlsx';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

function handleDeleteAll() {
    students.value = [];
}

function toggleSelectAll() {
    if (selectAll.value) {
        selectedStudents.value = filteredStudents.value.map(s => s.lrn);
    } else {
        selectedStudents.value = [];
    }
}

const possibleModalStudents = ref(
    Array.from({ length: 10 }, (_, i) => ({
        lrn: '20093001' + (100 + i),
        fullName: [
            'Ana Lopez', 'Mark Reyes', 'Carmela Cruz', 'Ramon Santos', 'Liza Dizon',
            'Paolo Mendoza', 'Jessa Lim', 'Miguel Torres', 'Katrina Ramos', 'Enrico David',
        ][i],
        gender: i % 2 === 0 ? 'F' : 'M',
        birthdate: [
            '2002-05-12', '2001-11-23', '2003-07-08', '2000-09-15', '2002-01-30',
            '2001-03-19', '2003-12-02', '2000-06-25', '2002-10-10', '2001-08-05',
        ][i],
        address: [
            'Brgy. San Juan, Manila', 'Brgy. Malate, Manila', 'Brgy. San Miguel, Bulacan',
            'Brgy. San Pedro, Laguna', 'Brgy. San Nicolas, Ilocos Norte', 'Brgy. San Pablo, Batangas',
            'Brgy. San Rafael, Pampanga', 'Brgy. San Mateo, Rizal', 'Brgy. San Isidro, Nueva Ecija',
            'Brgy. San Antonio, Zambales',
        ][i],
    }))
);

const filteredModalStudents = computed(() => {
    let result = [...possibleModalStudents.value];
    if (modalGenderFilter.value !== 'All') {
        const genderCode = modalGenderFilter.value === 'Female' ? 'F' : 'M';
        result = result.filter((student) => student.gender === genderCode);
    }
    if (modalSearchTerm.value.trim()) {
        const term = modalSearchTerm.value.toLowerCase();
        result = result.filter(
            (student) =>
                student.fullName.toLowerCase().includes(term) ||
                student.lrn.includes(term) ||
                student.address.toLowerCase().includes(term)
        );
    }
    if (modalSortOrder.value === 'Latest') {
        // For demo, no actual sorting since all dates are the same
    } else {
        result.reverse();
    }
    return result;
});

function toggleModalSelectAll() {
    if (modalSelectAll.value) {
        modalSelectedStudents.value = filteredModalStudents.value.map(s => s.lrn);
    } else {
        modalSelectedStudents.value = [];
    }
}

function handleAddStudents() {
    // Add checked students to main list if not already present
    const toAdd = possibleModalStudents.value.filter(s => modalSelectedStudents.value.includes(s.lrn));
    for (const student of toAdd) {
        if (!students.value.some(mainS => mainS.lrn === student.lrn)) {
            students.value.push({ ...student });
        }
    }
    showAddModal.value = false;
    // Optionally clear selection
    modalSelectedStudents.value = [];
    modalSelectAll.value = false;
}

const filteredEditModalStudents = computed(() => {
    let result = [...students.value];
    if (editModalGenderFilter.value !== 'All') {
        const genderCode = editModalGenderFilter.value === 'Female' ? 'F' : 'M';
        result = result.filter((student) => student.gender === genderCode);
    }
    if (editModalSearchTerm.value.trim()) {
        const term = editModalSearchTerm.value.toLowerCase();
        result = result.filter(
            (student) =>
                student.fullName.toLowerCase().includes(term) ||
                student.lrn.includes(term) ||
                student.address.toLowerCase().includes(term)
        );
    }
    return result;
});

function toggleEditModalSelectAll() {
    if (editModalSelectAll.value) {
        editModalSelectedStudents.value = filteredEditModalStudents.value.map(s => s.lrn);
    } else {
        editModalSelectedStudents.value = [];
    }
}

function handleUpdateClass() {
    // Only keep students that are checked
    students.value = students.value.filter(s => editModalSelectedStudents.value.includes(s.lrn));
    showEditModal.value = false;
    // Optionally clear selection
    editModalSelectedStudents.value = [];
    editModalSelectAll.value = false;
}

function openEditModal() {
    showEditModal.value = true;
    // Preselect all students in the edit modal
    editModalSelectedStudents.value = students.value.map(s => s.lrn);
    editModalSelectAll.value = true;
}
</script>

<style scoped>
.student-list-container {
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.student-list-container>div {
    box-shadow: none !important;
    border: none !important;
}
</style>