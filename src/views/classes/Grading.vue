<template>
    <div class="flex max-h-[412px]">
        <!-- Left Section: Student Selection -->
        <div class="px-5 py-3">
            <div class="flex items-center gap-5">
                <Dropdown :showQuarter="true" :show-mark-status="true" v-model="selectedQuarter" />
                <p class="font-semibold text-lg">{{ formattedDate }}</p>
            </div>

            <!-- Select All Checkbox -->
            <div class="mt-4 flex items-center justify-end gap-2">
                <label for="select-all" class="ml-2 text-xs">Select All</label>
                <input type="checkbox" class="checkbox mr-[27px]" id="select-all" v-model="selectAll"
                    @change="toggleSelectAll" />
            </div>

            <!-- Displaying Student Names Dynamically -->
            <div v-if="studentsInSubject.length > 0" class="mt-4 overflow-y-auto max-h-[300px]">
                <ul>
                    <li v-for="(student, index) in studentsInSubject" :key="index"
                        class="flex justify-between py-2 mr-3" @click="setStudentInfo(index)">
                        <div class="flex items-center gap-5 cursor-pointer">
                            <div class="bg-[#23AD00] w-5 h-5 rounded-2xl"></div>
                            <p class="font-medium text-base">{{ student.lastName + ", " + student.firstName + " " +
                                student.middleName }}</p>
                        </div>
                        <div>
                            <input type="checkbox" class="checkbox" v-model="student.selected" />
                        </div>
                    </li>
                </ul>
            </div>

            <p v-else class="mt-4 text-red-500">No students found for this subject.</p>
        </div>

        <!-- Right Section: Student Info and Grading -->
        <div class="gap-4 flex flex-col mx-5 my-3 flex-1">
            <p class="text-blue font-semibold text-2xl">STUDENT INFO</p>
            <div class="flex flex-col gap-3">
                <div class="flex gap-10">
                    <div class="flex flex-col gap-2">
                        <div>
                            <p class="text-blue text-xs font-bold">Student Name</p>
                            <p class="text-2xl font-medium">{{ selectedStudent ? selectedStudent.firstName + " " +
                                selectedStudent.lastName : '(Select a Student)' }}</p>
                        </div>
                        <div>
                            <p class="text-blue text-xs font-bold">LRN</p>
                            <p class="text-2xl font-medium">{{ selectedStudent ? selectedStudent.lrn : 'N/A' }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-blue text-xs font-bold">Sex</p>
                        <p class="text-2xl font-medium">{{ selectedStudent ? selectedStudent.sex : 'N/A' }}</p>
                    </div>
                </div>
            </div>

            <p class="text-blue font-semibold text-2xl">GRADING</p>
            <div class="flex flex-col gap-4">
                <div class="flex gap-5">
                    <div>
                        <p class="text-blue text-xs font-bold">Quarter Grade</p>
                        <input type="text" class="border-[1px] w-35 h-9" v-model="Grade" />
                    </div>
                    <div>
                        <p class="text-blue text-xs font-bold">Remarks</p>
                        <div class="w-35 h-9 border-[1px] rounded-[5px] items-center justify-center flex">
                            <p class="font-bold text-green-500">Passed</p>
                        </div>
                    </div>
                </div>
                <p class="italic text-xs">You are grading for <span class="font-bold mt-5">{{ selectedQuarter }}</span>
                </p>
            </div>

            <button class="bg-blue max-w-28 h-8 rounded-md text-white font-semibold text-md mt-2"
                @click="saveGrades">Save</button>

            <!-- Pagination Controls -->
            <div class="relative">
                <div class="flex gap-5 top-[-35px] right-15 absolute">
                    <div class="flex items-center gap-2 cursor-pointer"
                        :class="{ 'pointer-events-none': currentIndex === 0 }" @click="prevStudent">
                        <img class="h-4 w-4 rotate-180"
                            :src="currentIndex === 0 ? '/assets/img/classes/arrow2.png' : '/assets/img/classes/arrow.png'"
                            alt="Previous" />
                        <p :style="{ color: currentIndex === 0 ? '#bababa' : 'inherit' }">Previous</p>
                    </div>
                    <div class="flex items-center gap-2 cursor-pointer"
                        :class="{ 'pointer-events-none': currentIndex === studentsInSubject.length - 1 }"
                        @click="nextStudent">
                        <p :style="{ color: currentIndex === studentsInSubject.length - 1 ? '#bababa' : 'inherit' }">
                            Next</p>
                        <img class="h-4 w-4"
                            :src="currentIndex === studentsInSubject.length - 1 ? '/assets/img/classes/arrow2.png' : '/assets/img/classes/arrow.png'"
                            alt="Next" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import AsyncStorage from '@react-native-async-storage/async-storage';
import subjects from '../../data/subjects.json';
import students from '../../data/students.json';
import Dropdown from '../../components/dropdown.vue';

const props = defineProps({
    trackStand: String,
    subject_id: String
});

const today = new Date();
const formattedDate = ref(`${today.getMonth() + 1}/${today.getDate()}/${String(today.getFullYear()).slice(-2)}`);
const selectAll = ref(false);
const studentsInSubject = ref([]);
const selectedStudent = ref(null);
const currentIndex = ref(0);
const Grade = ref("");
const selectedQuarter = ref("1st");

const quarterMapping = {
    "1st": "first",
    "2nd": "second",
    "3rd": "third",
    "4th": "fourth"
};

const loadGrade = () => {
    if (selectedStudent.value) {
        const studentGrades = selectedStudent.value.grades;
        const gradeKey = quarterMapping[selectedQuarter.value];
        if (gradeKey) {
            Grade.value = studentGrades[gradeKey] || "";
        }
    }
};

watch(selectedQuarter, loadGrade);
watch(currentIndex, () => {
    if (studentsInSubject.value.length > 0) {
        selectedStudent.value = studentsInSubject.value[currentIndex.value];
        loadGrade();
    }
});

async function loadSubjectData() {
    try {
        const storedData = await AsyncStorage.getItem(`subject_${props.subject_id}`);

        // Log the stored data to the console
        console.log("Stored Data:", storedData);

        if (storedData) {
            studentsInSubject.value = JSON.parse(storedData);
        } else {
            const subject = subjects.find(sub => sub.subject_id === props.subject_id);
            if (subject) {
                studentsInSubject.value = students.filter(student => subject.student_id.includes(student.student_id))
                    .map(student => ({
                        ...student,
                        selected: false,
                        grades: student.grades || { "1st": null, "2nd": null, "3rd": null, "4th": null }
                    }));
                await AsyncStorage.setItem(`subject_${props.subject_id}`, JSON.stringify(studentsInSubject.value));
            }
        }

        // Log the studentsInSubject after loading
        console.log("Students In Subject:", studentsInSubject.value);

        if (studentsInSubject.value.length > 0) {
            currentIndex.value = 0;
            selectedStudent.value = studentsInSubject.value[0];
        }
    } catch (error) {
        console.error("Error loading subject data:", error);
    }
}


function setStudentInfo(index) {
    currentIndex.value = index;
    selectedStudent.value = studentsInSubject.value[index];
    loadGrade();
}

function saveGrades() {
    if (selectedStudent.value) {
        const grade = {
            first: selectedQuarter.value === "1st" ? Grade.value : selectedStudent.value.grades.first,
            second: selectedQuarter.value === "2nd" ? Grade.value : selectedStudent.value.grades.second,
            third: selectedQuarter.value === "3rd" ? Grade.value : selectedStudent.value.grades.third,
            fourth: selectedQuarter.value === "4th" ? Grade.value : selectedStudent.value.grades.fourth
        };

        selectedStudent.value.grades = grade;
        AsyncStorage.setItem(`subject_${props.subject_id}`, JSON.stringify(studentsInSubject.value));
        AsyncStorage.setItem(`grade_${props.subject_id}_${selectedQuarter.value}`, Grade.value);
    }
}

function toggleSelectAll() {
    studentsInSubject.value.forEach(student => {
        student.selected = selectAll.value;
    });
}

function nextStudent() {
    if (currentIndex.value < studentsInSubject.value.length - 1) {
        currentIndex.value++;
        selectedStudent.value = studentsInSubject.value[currentIndex.value];
        loadGrade();
    }
}

function prevStudent() {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        selectedStudent.value = studentsInSubject.value[currentIndex.value];
        loadGrade();
    }
}

onMounted(loadSubjectData);
</script>
