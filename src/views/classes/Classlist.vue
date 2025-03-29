<template>
    <div>

        <button class="bg-blue px-8 py-2 mx-12 mt-5 rounded-md">
            <p class="text-white font-semibold  text-xs">LIS</p>
        </button>
        <!-- Check if subject_id is available -->
        <p v-if="!subject_id">Subject ID is not available</p>

        <!-- Render the list of students if subject_id is available -->
        <div v-else>
            <p v-if="studentsInSubject.length === 0">No students available for this subject.</p>

            <div v-else>

                <!-- Table container with a fixed height and scrollable if needed -->
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>LRN</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Birthdate</th>
                                <th>Age</th>
                                <th>Contact Number</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in studentsInSubject" :key="student.student_id">
                                <td>{{ student.lrn }}</td>
                                <td>{{ student.firstName }} {{ student.lastName }}</td>
                                <td>{{ student.sex }}</td>
                                <td>{{ student.birthDate }}</td>
                                <td>{{ calculateAge(student.birthDate) }}</td>
                                <td>{{ student.contactNumber }}</td>
                                <td>{{ student.address }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import subjects from '../../data/subjects.json';
import students from '../../data/students.json';

export default {
    props: {
        subject_id: String, // Make sure this prop is passed correctly
    },
    setup(props) {
        const studentsInSubject = ref([]); // Store filtered students here

        // Function to calculate age from birthdate
        const calculateAge = (birthdate) => {
            const today = new Date();
            const birthDate = new Date(birthdate);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth();
            if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };

        onMounted(() => {
            // Find the subject using the subject_id prop
            const subject = subjects.find(sub => sub.subject_id === props.subject_id);

            if (subject) {
                // Get the students enrolled in this subject
                studentsInSubject.value = students.filter(student =>
                    subject.student_id.includes(student.student_id)
                );
            }
        });

        return {
            studentsInSubject,
            calculateAge,
        };
    }
};
</script>

<style scoped>
.table-container {
    max-height: 300px;
    /* Adjust height as needed */
    overflow-y: auto;
    /* Enable vertical scrolling when content overflows */
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: center;
    /* Center content */
    padding: 8px;
    border: none;
    /* Remove table lines */
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
    position: sticky;
    color: #464F60;
    /* Make the header sticky */
    top: 0px;
    padding:10px;
    /* Set the sticky position at the top */
    z-index: 1;
    /* Ensure the header is above the table body */
}
</style>
