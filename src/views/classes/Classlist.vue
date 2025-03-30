<template>
    <div>

        <button class="bg-blue px-8 py-2 mx-12 mt-5 rounded-md">
            <p class="text-white font-semibold  text-xs">LIS</p>
        </button>
        <p v-if="!subject_id">Subject ID is not available</p>

        <div v-else>
            <p v-if="studentsInSubject.length === 0">No students available for this subject.</p>

            <div v-else>

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
        subject_id: String, 
    },
    setup(props) {
        const studentsInSubject = ref([]); 

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
            const subject = subjects.find(sub => sub.subject_id === props.subject_id);

            if (subject) {
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
    overflow-y: auto;
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: center;
    padding: 8px;
    border: none;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
    position: sticky;
    color: #464F60;
    top: 0px;
    padding:10px;
    z-index: 1;
}
</style>
