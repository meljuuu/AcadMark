<template>
    <div class="max-h-[412px]">
        <div class="flex justify-between px-5 py-3">
            <Dropdown :showQuarter="true" v-model="selectedQuarter" />
            <Searchbar v-model="searchQuery" />
        </div>

        <div class="overflow-auto px-5">
            <table class="w-full border-collapse text-center text-sm">
                <thead class="bg-gray-100 text-[#464F60] text-[15px] font-semibold">
                    <tr>
                        <th class="p-2 w-1/6">LRN</th>
                        <th class="p-2 w-1/6">Name</th>
                        <th class="p-2 w-1/6">Gender</th>
                        <th class="p-2 w-1/6">Age</th>
                        <th class="p-2 w-1/6">Grade</th>
                        <th class="p-2 w-1/6">Status</th>
                    </tr>
                </thead>
                <tbody class="font-medium text-[15px]">
                    <tr v-if="filteredStudents.length === 0">
                        <td colspan="6" class="p-2 text-center">No students available.</td>
                    </tr>
                    <tr v-for="student in filteredStudents" :key="student.lrn" class="hover:bg-gray-200 cursor-pointer"
                        @click="openModal(student)">
                        <td class="p-2 w-1/6">{{ student.lrn }}</td>
                        <td class="p-2 w-1/6">{{ student.lastName + ", " + student.firstName + " " + student.middleName
                        }}</td>
                        <td class="p-2 w-1/6">{{ student.sex }}</td>
                        <td class="p-2 w-1/6">{{ getAge(student.birthDate) }}</td>
                        <td class="p-2 w-1/6">{{ getGradeForQuarter(student) }}</td>
                        <td class="p-2 w-1/6">
                            <span
                                class="px-4 py-2 rounded text-white inline-block w-[135px] font-light text-center bg-[#FF9204]">
                                Pending
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <modal v-if="showMessage" :showMessage="showMessage" @close="closeModal" :trackStand="trackStand"
            :selectedStudent="selectedStudent" :selectedQuarter="selectedQuarter" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Dropdown from '@/components/dropdown.vue';
import Searchbar from '@/components/searchbar.vue';
import modal from '@/components/modal.vue';

const props = defineProps({
    subject_id: {
        type: String,
        required: true,
    },
    trackStand: {
        type: String,
        required: true,
    },
});

const students = ref([]);
const selectedQuarter = ref("1st");
const searchQuery = ref("");
const showMessage = ref(false);
const selectedStudent = ref(null);

const quarterMapping = {
    "1st": "first",
    "2nd": "second",
    "3rd": "third",
    "4th": "fourth"
};

const fetchStudents = () => {
    try {
        const key = `submittedGrade_${props.subject_id}`;
        const storedData = JSON.parse(localStorage.getItem(key)) || [];
        students.value = storedData;
    } catch (error) {
        students.value = [];
    }
};

const filteredStudents = computed(() => {
    if (!searchQuery.value) {
        return students.value;
    }
    return students.value.filter(student => {
        return student.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});

const getGradeForQuarter = (student) => {
    const quarterKey = quarterMapping[selectedQuarter.value];
    return student.grades[quarterKey] || '';
};

const getAge = (birthDate) => {
    const birth = new Date(birthDate);
    const ageDifMs = Date.now() - birth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const openModal = (student) => {
    selectedStudent.value = student;
    showMessage.value = true;
};

const closeModal = () => {
    showMessage.value = false;
};

onMounted(() => {
    fetchStudents();
});
</script>
