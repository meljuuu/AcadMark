<template>
    <div>
        <p class="text-black text-2xl font-semibold mb-8 cursor-pointer hover:text-blue-500" @click="goBack">
            &lt; <span class="underline hover:underline">Back</span>
        </p>

        <div class="flex flex-col gap-10">
            <div class="flex items-center justify-between bg-blue px-7 py-5 rounded-xl">
                <div class="flex flex-col justify-between h-full">
                    <p class="text-white text-xl font-normal leading-none">{{ trackStand }}</p>

                    <div class="flex items-center gap-2">
                        <p class="text-white font-medium text-5xl leading-none">{{ className }}</p>
                        <p class="text-white text-xl leading-none">({{ totalStudents }} students)</p>
                    </div>

                    <p class="text-white text-xl font-normal leading-none">{{ subjectInfo?.subjectName }}</p>

                    <div class="mt-7">
                        <p class="text-white text-xl">
                            <span class="font-bold">Male:</span> {{ maleCount }}
                        </p>
                        <p class="text-white text-xl">
                            <span class="font-bold">Female:</span> {{ femaleCount }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center justify-center pr-15 h-[150px]">
                    <p class="font-bold text-[150px] text-[#3E6FA2]">{{ trackStand + " " + gradeLevel }}</p>
                </div>
            </div>

            <div class="border-[1px] border-[#E0E0E0] rounded-t-xl"
                style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px 1px;">
                <nav class="flex justify-around border-b border-[#E0E0E0] p-5">
                    <ul v-for="(item, index) in navItems" :key="index" @click="activeComponent = item.component"
                        class="text-lg font-semibold cursor-pointer"
                        :class="{ 'text-blue border-b-2 border-blue': activeComponent === item.component }">
                        {{ item.label }}
                    </ul>
                </nav>
                <component :is="activeComponent" :subject_id="subject_id" :trackStand="trackStand"></component>
            </div>
        </div>
        <!-- Display table only if the active component is 'Grading' -->
        <div v-if="activeComponent === 'SummaryOfGrades'" class="overflow-x-auto w-1/2 mt-5 mb-15">
            <p class="text-lg font-semibold">Learner Progress and Achievement</p>
            <table class="w-full border-collapse rounded-b-[5px] border border-[#d9d9d9]"
                style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px 1px;">
                <thead class="bg-[#d9d9d9]">
                    <tr>
                        <th class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center">Descriptors</th>
                        <th class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center">Grading Scale</th>
                        <th class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center">Remarks</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr>
                        <td class="px-4 py-2">Outstanding</td>
                        <td class="px-4 py-2">90-100</td>
                        <td class="px-4 py-2 font-bold text-[#23AD00]">Passed</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2">Very Satisfactory</td>
                        <td class="px-4 py-2">80-89</td>
                        <td class="px-4 py-2 font-bold text-[#23AD00]">Passed</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2">Satisfactory</td>
                        <td class="px-4 py-2">80-84</td>
                        <td class="px-4 py-2 font-bold text-[#23AD00]">Passed</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2">Fairly Satisfactory</td>
                        <td class="px-4 py-2">75-79</td>
                        <td class="px-4 py-2 font-bold text-[#23AD00]">Passed</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2">Did Not Meet Expectation</td>
                        <td class="px-4 py-2">Below 75</td>
                        <td class="px-4 py-2 font-bold text-[#FF2428]">Failed</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import subjects from '../../data/subjects.json';
import students from '../../data/students.json';
import Classlist from './Classlist.vue';
import Grading from './Grading.vue';
import Submitted from './Submitted.vue';
import SummaryOfGrades from './Summary.vue';

export default {
    props: {
        trackStand: String,
        className: String,
        subjectName: String,
        gradeLevel: [String, Number],
        subject_id: String,
    },
    components: {
        Classlist,
        Grading,
        Submitted,
        SummaryOfGrades
    },
    setup(props) {
        const subjectInfo = ref(null);
        const maleCount = ref(0);
        const femaleCount = ref(0);
        const activeComponent = ref('Classlist');

        const router = useRouter(); // Initialize the router

        const navItems = [
            { label: "CLASS LIST", component: "Classlist" },
            { label: "GRADING", component: "Grading" },
            { label: "SUBMITTED", component: "Submitted" },
            { label: "SUMMARY OF GRADES", component: "SummaryOfGrades" }
        ];

        const goBack = () => {
            router.push('/Classes');
        };

        const totalStudents = computed(() => {
            const subject = subjects.find(sub => sub.subject_id === props.subject_id);
            if (subject) {
                const studentsInSubject = students.filter(student =>
                    subject.student_id.includes(student.student_id)
                );
                return studentsInSubject.length; // Dynamic total student count
            }
            return 0;
        });

        onMounted(() => {
            const subject = subjects.find(sub => sub.subject_id === props.subject_id);
            if (subject) {
                subjectInfo.value = subject;

                const studentsInSubject = students.filter(student =>
                    subject.student_id.includes(student.student_id)
                );

                maleCount.value = studentsInSubject.filter(student => student.sex === 'Male').length;
                femaleCount.value = studentsInSubject.filter(student => student.sex === 'Female').length;
            }
        });

        return {
            subjectInfo,
            maleCount,
            femaleCount,
            activeComponent,
            navItems,
            goBack,
            totalStudents
        };
    }
};
</script>
