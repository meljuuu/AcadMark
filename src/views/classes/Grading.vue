<template>
    <div class="flex max-h-[412px]">
        <!-- Left Section: Student Selection -->
        <div class="px-5 py-3 border-r border-[#d0d0d0]">
            <div class="flex items-center gap-5">
                <Dropdown :showQuarter="true" v-model="selectedQuarter" />
                <Dropdown :showMarkStatus="true" v-model="selectedMarkStatus" />
                <p class="font-semibold text-lg">{{ formattedDate }}</p>
            </div>

            <!-- Select All Checkbox -->
            <div class="mt-4 flex items-center justify-end gap-2">
                <label for="select-all" class="ml-2 text-xs">Select All</label>
                <input type="checkbox" class="checkbox mr-[27px]" id="select-all" v-model="selectAll"
                    @change="toggleSelectAll" />
            </div>

            <!-- Displaying Student Names Dynamically -->
            <div v-if="filteredStudents.length > 0" class="mt-4 overflow-y-auto max-h-[230px]">
                <ul>
                    <li v-for="(student, index) in filteredStudents" :key="index" class="flex justify-between py-2 mr-3"
                        @click="setStudentInfo(index)">
                        <div class="flex items-center gap-5 cursor-pointer">
                            <!-- Conditional background color based on grade presence for the current quarter -->
                            <div :class="{
                                'bg-[#23AD00]': student.grades[quarterMapping[selectedQuarter]] !== null && student.grades[quarterMapping[selectedQuarter]] !== '',
                                'bg-red-500': !student.grades[quarterMapping[selectedQuarter]]
                            }" class="w-5 h-5 rounded-2xl"></div>
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

            <div class="flex justify-end mt-2 mr-5">
                <button
                    class="bg-blue px-3 py-2 text-xs font-semibold text-white rounded-sm hover:bg-[#cecece] cursor-pointer"
                    @click="submitGrades">Submit Grades</button>
            </div>
        </div>

        <!-- Right Section: Student Info and Grading -->
        <div class="gap-3 flex flex-col mx-5 my-3 flex-1">
            <p class="text-blue font-semibold text-2xl">STUDENT INFO</p>
            <div class="flex flex-col gap-3">
                <div class="flex gap-10">
                    <div class="flex flex-col gap-1">
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
                    <div class="flex flex-col gap-1">
                        <div>
                            <p class="text-blue text-xs font-bold">Sex</p>
                            <p class="text-2xl font-medium">{{ selectedStudent ? selectedStudent.sex : 'N/A' }}</p>
                        </div>
                        <div>
                            <p class="text-blue text-xs font-bold">Curriculum</p>
                            <p class="text-2xl font-medium">{{ selectedStudent ? selectedStudent.curriculum : 'N/A' }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div>
                            <p class="text-blue text-xs font-bold">Birthdate</p>
                            <p class="text-2xl font-medium">{{ selectedStudent ? selectedStudent.birthDate : 'N/A' }}
                            </p>
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
                        <input type="text" class="border-[1px] w-35 h-9 text-center" v-model="Grade" />
                    </div>
                    <div>
                        <p class="text-blue text-xs font-bold">Remarks</p>
                        <div class="w-35 h-9 border-[1px] rounded-[5px] items-center justify-center flex">
                            <!-- Dynamically show Passed or Failed -->
                            <p class="font-bold" :class="remarksClass">{{ remarks }}</p>
                        </div>
                    </div>
                </div>
                <p class="italic text-xs">You are grading for <span class="font-bold mt-5">{{ selectedQuarter }}</span>
                </p>
            </div>

            <button
                class="bg-blue max-w-28 h-8 rounded-md text-white font-semibold text-md hover:bg-[#cecece] cursor-pointer"
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
import { computed } from 'vue';

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
const selectedMarkStatus = ref("");

const quarterMapping = {
    "1st": "first",
    "2nd": "second",
    "3rd": "third",
    "4th": "fourth"
};

const loadGrade = () => {
    if (selectedStudent.value) {
        const gradeKey = quarterMapping[selectedQuarter.value];
        Grade.value = selectedStudent.value.grades[gradeKey] || "";  // Set the grade of the currently selected student
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
            // Parse the stored data from AsyncStorage
            studentsInSubject.value = JSON.parse(storedData);
        } else {
            // If no data is found in AsyncStorage, fallback to loading students from JSON
            const subject = subjects.find(sub => sub.subject_id === props.subject_id);
            if (subject) {
                // Filter students based on the subject's student IDs and set them into the state
                studentsInSubject.value = students.filter(student => subject.student_id.includes(student.student_id))
                    .map(student => ({
                        ...student,
                        selected: false,
                        grades: student.grades || { "1st": null, "2nd": null, "3rd": null, "4th": null }  // Default grades per subject
                    }));

                // Save the data into AsyncStorage
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
        const gradeKey = quarterMapping[selectedQuarter.value];

        // Ensure the student's grade is stored correctly
        studentsInSubject.value[currentIndex.value].grades[gradeKey] = Grade.value;

        // Save to AsyncStorage
        AsyncStorage.setItem(`subject_${props.subject_id}`, JSON.stringify(studentsInSubject.value));
        AsyncStorage.setItem(`submittedgrade_${props.subject_id}`, JSON.stringify(studentsInSubject.value));

        console.log(`Updated Grade for ${selectedStudent.value.firstName} ${selectedStudent.value.lastName}: ${Grade.value}`);
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

const filteredStudents = computed(() => {
    return studentsInSubject.value.filter(student => {
        const studentGrade = student.grades[quarterMapping[selectedQuarter.value]];

        if (selectedMarkStatus.value === 'Marked') {
            // Only show students who have a grade for the selected quarter
            return studentGrade !== null && studentGrade !== '';
        } else if (selectedMarkStatus.value === 'Unmarked') {
            // Only show students who don't have a grade for the selected quarter
            return studentGrade === null || studentGrade === '';
        }
        return true; // Default to showing all students if no mark status is selected
    });
});

const remarks = computed(() => {
    // If grade is empty, show nothing, otherwise show "Passed" or "Failed"
    if (!Grade.value) {
        return "";
    }
    return Grade.value <= 75 ? "Failed" : "Passed";
});

const remarksClass = computed(() => {
    // Apply colors only if grade is not empty
    if (!Grade.value) {
        return "";
    }
    return Grade.value <= 75 ? "text-red-500" : "text-green-500"; // red for "Failed", green for "Passed"
});
function submitGrades() {
    console.log("Submit Grades clicked");

    const selectedStudents = studentsInSubject.value.filter(student => student.selected);

    // Log the selected students
    console.log("Selected students:", selectedStudents);

    // If no students are selected, show a warning and return
    if (selectedStudents.length === 0) {
        alert("Please select students to submit grades.");
        return;
    }

    // Remove the previous submitted grades data for this subject
    AsyncStorage.removeItem(`submittedGrade_${props.subject_id}`)
        .then(() => {
            console.log("Previous submitted grades removed");

            // Now, proceed with updating the grades for the selected students
            selectedStudents.forEach(student => {
                // Initialize grades if not already
                if (!student.grades) {
                    console.log("Initializing grades for student:", student.firstName, student.lastName);
                    student.grades = {
                        first: null,
                        second: null,
                        third: null,
                        fourth: null,
                    };
                }

                // Log before assigning the grade
                console.log(`Assigning grade for ${student.firstName} ${student.lastName} - Grade: ${student.grade}`);

                // Assign the grade to the correct quarter based on the selected quarter
                student.grades = student.grades || null;  // Just keep the entire grades object

                // Log the grades after assignment
                console.log(`Updated grades for ${student.firstName} ${student.lastName}:`, student.grades);
            });

            // Log what will be stored in AsyncStorage
            console.log("Updated students with grades:", selectedStudents);

            // Save the updated students data into AsyncStorage for the specific subject
            AsyncStorage.setItem(`subject_${props.subject_id}`, JSON.stringify(studentsInSubject.value))
                .then(() => {
                    console.log("Updated students data saved in AsyncStorage under 'subject_'");
                })
                .catch(error => {
                    console.error("Error saving students data to AsyncStorage:", error);
                });

            // Store the entire data of selected students in `submittedGrade`
            AsyncStorage.setItem(`submittedGrade_${props.subject_id}`, JSON.stringify(selectedStudents))
                .then(() => {
                    console.log("Submitted grades saved to AsyncStorage under 'submittedGrade_'");
                })
                .catch(error => {
                    console.error("Error saving submitted grades to AsyncStorage:", error);
                });

            console.log(`Grades submitted for students: ${selectedStudents.map(student => student.firstName + " " + student.lastName).join(", ")}`);
            const submittedGrades = studentsInSubject.value.filter(student => student.selected);
            const submittedGradeSubjectKey = `submittedGrade_${props.subject_id}`;
            console.log(`Submitted Grades for Subject ${props.subject_id}:`, submittedGrades);
            console.log(`Logged as ${submittedGradeSubjectKey}`);
        })
        .catch(error => {
            console.error("Error removing previous submitted grades:", error);
        });
}

const showAllLocalStorage = () => {
    const length = localStorage.length;
    for (let i = 0; i < length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`Key: ${key}, Value: ${value}`);
    }
};

// Call showAllLocalStorage when the component is mounted
onMounted(() => {
    showAllLocalStorage();
});



</script>
