<template>
    <div class="flex justify-between m-5">
        <div class="flex justify-between w-90">
            <Dropdown :showSort="true" v-model="selectedSort" />
        </div>

        <div class="flex w-1/2 justify-between">
            <Searchbar v-model="searchQuery" />
            <button @click="generateCSV" class="bg-[#30612E] text-white px-5 py-1 rounded-md">Generate Report</button>
        </div>
    </div>

    <div class="overflow-x-auto p-5 rounded-[5px]">
        <table class="w-full border-collapse border-none rounded-[5px]">
            <thead class="bg-gray-100">
                <tr>
                    <th v-for="header in headers" :key="header"
                        class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody class="text-center font-medium">
                <tr v-if="filteredStudents.length === 0">
                    <td colspan="8" class="px-4 py-2">No students available.</td>
                </tr>
                <tr v-for="student in filteredStudents" :key="student.lrn">
                    <td class="px-4 py-2">{{ student.lrn }}</td>
                    <td class="px-4 py-2">{{ student.lastName + ", " + student.firstName + " " + student.middleName }}
                    </td>
                    <td class="px-4 py-2">{{ student.sex }}</td>
                    <td class="px-4 py-2">{{ getGradeForQuarter(student, "first") }}</td>
                    <td class="px-4 py-2">{{ getGradeForQuarter(student, "second") }}</td>
                    <td class="px-4 py-2">{{ getGradeForQuarter(student, "third") }}</td>
                    <td class="px-4 py-2">{{ getGradeForQuarter(student, "fourth") }}</td>
                    <td class="px-4 py-2">{{ getFinalGrade(student) }}</td>
                    <td :class="getRemarks(student) === 'Passed' ? 'text-[#23AD00]' : 'text-[#FF0000]'"
                        class="px-4 py-2 font-bold">
                        {{ getRemarks(student) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Dropdown from '@/components/dropdown.vue';
import Searchbar from '@/components/searchbar.vue';

const props = defineProps({
    subject_id: {
        type: String,
        required: true,
    },
});

const headers = ref([
    'LRN', 'Name', 'Gender', '1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter', 'Final Grade', 'Remarks'
]);

const students = ref([]);
const selectedSort = ref('default');
const searchQuery = ref("");

const fetchStudents = () => {
    try {
        const key = `submittedGrade_${props.subject_id}`;
        const storedData = JSON.parse(localStorage.getItem(key)) || [];
        students.value = storedData;
    } catch (error) {
        console.error("Error fetching students from localStorage:", error);
        students.value = [];
    }
};

const getGradeForQuarter = (student, quarter) => {
    return student.grades?.[quarter] || '-';
};

const getFinalGrade = (student) => {
    const grades = ['first', 'second', 'third', 'fourth'];
    let total = 0;
    let gradeCount = 0;
    let hasAnyValidGrade = false;

    for (let quarter of grades) {
        const grade = student.grades?.[quarter];
        if (grade !== '-' && grade !== undefined && grade !== null && grade !== '') {
            hasAnyValidGrade = true;
            total += parseFloat(grade);
            gradeCount++;
        }
    }

    if (!hasAnyValidGrade) return 'No grade';
    if (gradeCount < 4) return 'INC';

    return (total / gradeCount).toFixed(2);
};

const getRemarks = (student) => {
    const finalGrade = getFinalGrade(student);
    if (finalGrade !== 'No grade' && finalGrade !== 'INC' && parseFloat(finalGrade) > 75) {
        return 'Passed';
    }
    return 'Failed';
};

// Helper function to convert grades to numeric value for sorting
const gradeToNumeric = (grade) => {
    if (grade === 'No grade') return -1; // "No grade" is treated as the lowest grade
    if (grade === 'INC') return 0; // "INC" is treated as higher than "No grade" but lower than valid grades
    return parseFloat(grade);
};

const filteredStudents = computed(() => {
    let sortedStudents = students.value.filter(student => {
        const fullName = (student.firstName + " " + student.middleName + " " + student.lastName).toLowerCase();
        return fullName.includes(searchQuery.value.toLowerCase());
    });

    switch (selectedSort.value) {
        case 'Sort by A-Z':
            sortedStudents.sort((a, b) => a.lastName.localeCompare(b.lastName));
            break;
        case 'Sort by Z-A':
            sortedStudents.sort((a, b) => b.lastName.localeCompare(a.lastName));
            break;
        case 'Sort by Grade (Highest)':
            sortedStudents.sort((a, b) => {
                const gradeA = getFinalGrade(a);
                const gradeB = getFinalGrade(b);
                return gradeToNumeric(gradeB) - gradeToNumeric(gradeA); // Highest grade first
            });
            break;
        case 'Sort by Grade (Lowest)':
            sortedStudents.sort((a, b) => {
                const gradeA = getFinalGrade(a);
                const gradeB = getFinalGrade(b);
                return gradeToNumeric(gradeA) - gradeToNumeric(gradeB); // Lowest grade first
            });
            break;
        default:
            break;
    }

    return sortedStudents;
});

onMounted(fetchStudents);
</script>