    <template>
        <div class="modal-container">
            <!-- Close button emitting a custom event -->


            <!-- Conditional Rendering for 'lis' -->
            <div v-if="showLis">
                <button @click="$emit('close')" class="close-btn">Close</button>
                <table class="w-full bg-[#F6F6F6]">
                    <thead class="text-center">
                        <tr class="text-semibold text-[#464F60] text-[15px]">
                            <th rowspan="2">LRN</th>
                            <th rowspan="2">Full Name</th>
                            <th colspan="4">Quarter</th>
                            <th rowspan="2">Average</th>
                            <th rowspan="2">Remarks</th>
                        </tr>
                        <tr class="text-semibold text-[#464F60] text-[15px]">
                            <th>Q1</th>
                            <th>Q2</th>
                            <th>Q3</th>
                            <th>Q4</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="student in students" :key="student.student_id">
                            <td>{{ student.lrn }}</td>
                            <td>{{ student.firstName }} {{ student.lastName }}</td>
                            <td>{{ student.grades.first || '-' }}</td>
                            <td>{{ student.grades.second || '-' }}</td>
                            <td>{{ student.grades.third || '-' }}</td>
                            <td>{{ student.grades.fourth || '-' }}</td>
                            <td>{{ calculateAverage(student.grades) }}</td>
                            <td>{{ getRemarks(student) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Conditional Rendering for 'message' -->
            <!-- Show student details only if selectedStudent is not null -->
            <!-- Show student details -->
            <!-- Show student details only if selectedStudent is not null -->
            <div v-if="selectedStudent">
                <div class="flex items-center justify-center ">
                    <div class="bg-white p-10 flex flex-col gap-5">
                        <p class="text-blue font-semibold text-2xl">STUDENT INFO</p>
                        <div class="flex flex-col gap-3">
                            <div class="flex gap-10">
                                <div class="flex flex-col gap-1">
                                    <div>
                                        <p class="text-blue text-xs font-bold">Student Name</p>
                                        <p class="text-2xl font-medium">{{ selectedStudent.firstName }} {{
                                            selectedStudent.lastName }}</p>
                                    </div>
                                    <div>
                                        <p class="text-blue text-xs font-bold">LRN</p>
                                        <p class="text-2xl font-medium">{{ selectedStudent.lrn }}</p>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-1">
                                    <div>
                                        <p class="text-blue text-xs font-bold">Sex</p>
                                        <p class="text-2xl font-medium">{{ selectedStudent.sex }}</p>
                                    </div>
                                    <div>
                                        <p class="text-blue text-xs font-bold">Curriculum</p>
                                        <p class="text-2xl font-medium">{{ selectedStudent.curriculum }}</p>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-1">
                                    <div>
                                        <p class="text-blue text-xs font-bold">Birthdate</p>
                                        <p class="text-2xl font-medium">{{ selectedStudent.birthDate }}</p>
                                    </div>
                                    <div>
                                        <p class="text-blue text-xs font-bold">Academic Track</p>
                                        <p class="text-2xl font-medium">{{ trackStand }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p class="text-blue font-semibold text-2xl">GRADING</p>
                        <div class="flex flex-col gap-3">
                            <div class="flex gap-5">
                                <div>
                                    <p class="text-blue text-xs font-bold">Quarter Grade</p>
                                    <input type="text" class="border-[1px] w-35 h-9 text-center" v-model="quarterGrade"
                                        readonly />
                                </div>
                                <div>
                                    <p class="text-blue text-xs font-bold">Remarks</p>
                                    <div class="w-35 h-9 border-[1px] rounded-[5px] items-center justify-center flex">
                                        <p class="font-bold"
                                            :style="{ color: getRemarks(selectedStudent) === 'Passed' ? '#23AD00' : 'red' }">
                                            {{ getRemarks(selectedStudent) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p class="text-blue font-semibold text-2xl">Comment</p>
                            <textarea class="w-full h-32 text-left p-2 rounded-[12px] border border-black" readonly
                                style="resize: none;">ADMIN COMMENT...</textarea>
                        </div>

                        <div class="flex justify-end gap-2">
                            <button
                                class="font-light text-lg bg-[#656464] px-6 py-2 text-white rounded-md cursor-pointer hover:bg-[#cecece]"
                                @click="$emit('close')">Close</button>
                            <div class="relative group">
                                <button
                                    class="font-light text-lg bg-[#0C5A48] px-6 py-2 text-white rounded-md hover:bg-[#cecece]">
                                    Edit
                                </button>
                                <div
                                    class="tooltip absolute invisible bg-black text-white text-sm rounded-md px-3 py-2 bottom-full mb-2 opacity-0 group-hover:visible w-50 group-hover:opacity-100">
                                    You can only edit once it's not accepted
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script setup>
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
    subject_id: {
        type: String,
        required: true
    },
    showLis: {
        type: Boolean,
        required: true
    },
    showMessage: {
        type: Boolean,
        required: true
    },
    selectedStudent: {
        type: Object,
        required: true,
    },
    selectedQuarter: {
        type: String,
        required: true,
    },
    trackStand: {
        type: String,
        required: true,
    },
});

const students = ref([]);

// Function to load the students from localStorage based on subject_id
const loadStudents = () => {
    const subjectKey = `subject_${props.subject_id}`; // Format the key
    const storedData = localStorage.getItem(subjectKey);

    if (storedData) {
        students.value = JSON.parse(storedData);
    } else {
        console.error(`No data found for key ${subjectKey}`);
    }
};

// Calculate the average grade for a student
const calculateAverage = (grades) => {
    const allGradesEmpty = [grades.first, grades.second, grades.third, grades.fourth].every(grade => grade === '-' || grade === '' || grade === null);

    if (allGradesEmpty) {
        return '-';  // Return "-" if all grades are empty, null, or "-"
    }

    const anyGradeMissing = [grades.first, grades.second, grades.third, grades.fourth].some(grade => grade === '-' || grade === '' || grade === null);

    if (anyGradeMissing) {
        return 'INC';  // Return "INC" if any grade is missing
    }

    const gradeValues = Object.values(grades)
        .map(grade => grade !== '-' && grade !== '' && grade !== null ? parseFloat(grade) : NaN)
        .filter(val => !isNaN(val));  // Only keep valid numbers

    if (gradeValues.length === 0) {
        return 'INC';  // If no valid grades available, return "INC"
    }

    const total = gradeValues.reduce((acc, curr) => acc + curr, 0);
    return (total / gradeValues.length).toFixed(2);
};

// Get the remarks based on average
const getRemarks = (student) => {
    const quarterGrade = calculateAverage(student.grades);

    // Check if the quarterGrade is null, empty string, or "-", or <= 75
    if (quarterGrade === '-' || quarterGrade === null || quarterGrade === '' || parseFloat(quarterGrade) <= 75) {
        return 'Failed';
    }

    // Otherwise, it passed
    return 'Passed';
};

// Watch the subject_id prop to reload students if it changes
watchEffect(() => {
    if (props.subject_id) {
        loadStudents();
    }
});

// Computed property to map selected quarter to grade
const quarterMapping = {
    "1st": "first",
    "2nd": "second",
    "3rd": "third",
    "4th": "fourth"
};

// Getting the grade for the selected quarter
const quarterGrade = computed(() => {
    if (props.selectedStudent) {
        const quarterKey = quarterMapping[props.selectedQuarter];
        return props.selectedStudent.grades[quarterKey] || '-';
    }
    return '-';  // Return default value when no student is selected
});
</script>



<style scoped>
.modal-container {
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    padding: 10%;
    background-color: rgba(0, 0, 0, 0.5);
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
}
</style>
