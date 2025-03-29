<template>
    <div>
        <p class="text-black text-2xl font-semibold mb-15">
            &lt; <span class="underline">Back</span>
        </p>

        <div class="flex items-center justify-between bg-blue px-7 py-5 rounded-xl">
            <div class="flex flex-col justify-between h-full">
                <p class="text-white text-xl font-normal leading-none">{{ trackStand }}</p>

                <div class="flex items-center gap-2">
                    <p class="text-white font-medium text-5xl leading-none">{{ className }}</p>
                    <p class="text-white text-xl leading-none">(35 students)</p>
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
                <p class="font-bold text-[150px] text-[#3E6FA2]">{{ className }}</p>
            </div>
        </div>
    </div>
</template>


<script>
import subjects from '../../data/subjects.json';
import students from '../../data/students.json';

export default {
    props: {
        trackStand: String,
        className: String,
        subjectName: String,
        gradeLevel: [String, Number],
        subject_id: String,
    },
    data() {
        return {
            subjectInfo: null, 
            maleCount: 0,      
            femaleCount: 0,   
        };
    },
    created() {

        const subject = subjects.find(sub => sub.subject_id === this.subject_id);
        if (subject) {
            this.subjectInfo = subject;


            const studentsInSubject = students.filter(student =>
                subject.student_id.includes(student.student_id)
            );

            this.maleCount = studentsInSubject.filter(student => student.sex === 'Male').length;
            this.femaleCount = studentsInSubject.filter(student => student.sex === 'Female').length;
        }
    }
};
</script>
