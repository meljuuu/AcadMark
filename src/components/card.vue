<template>
    <div class="rounded-xl" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
        <div class="relative w-sm border-[1px] rounded-xl overflow-hidden border-[#c0c0c0]">
            <div class="p-5 relative z-10">
                <p class="text-base font-medium" :class="cardColor.text">{{ trackStand }}</p>
                <p class="text-5xl font-medium" :class="cardColor.text">{{ className }}</p>
                <p class="italic text-lg font-regular" :class="cardColor.text">{{ subjectName }}</p>
                <p class="text-base font-light" :class="cardColor.text">{{ formattedGradeLevel }}</p>
            </div>

            <!-- Image wrapper with opacity -->
            <div class="absolute top-0 right-0 w-full h-full overflow-hidden">
                <img class="opacity-50 h-50 absolute top-5 right-[-55px]" src="/assets/img/logo.png" alt="" />
            </div>

            <div class="rounded-b-xl flex justify-between items-center p-5 relative z-10" :class="cardColor.bg">
                <p class="text-base font-semibold text-white">{{ cardTitle }}</p>
                <p @click="goToClass"
                    class="enter-button text-light text-base text-white border-white border-[1px] py-2 px-7 rounded-xl cursor-pointer">
                    Enter
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        type: {
            type: String,
            required: true,
        },
        trackStand: {
            type: String,
            required: true,
        },
        className: {
            type: String,
            required: true,
        },
        subjectName: {
            type: String,
            required: true,
        },
        gradeLevel: {
            type: [String, Number],
            required: true,
        },
        subject_id: {  // Add subject_id as a prop
            type: String,
            required: true,
        },
    },
    computed: {
        cardColor() {
            return this.type === "Advisory"
                ? { text: "text-blue", bg: "bg-blue" }
                : { text: "text-green", bg: "bg-green" };
        },
        cardTitle() {
            return this.type === "Advisory" ? "Advisory Class" : "Subject Class";
        },
        formattedGradeLevel() {
            const grade = Number(this.gradeLevel);
            if (grade >= 7 && grade <= 10) {
                return `High School Grade ${grade}`;
            } else if (grade === 11 || grade === 12) {
                return `Senior High Grade ${grade}`;
            }
            return `Grade ${grade}`;
        },
    },
    methods: {
        goToClass() {
            // Navigating to the Class.vue component with the current card data
            this.$router.push({
                name: 'class',
                params: {
                    trackStand: this.trackStand,
                    className: this.className,
                    subjectName: this.subjectName,
                    subject_id: this.subject_id,
                    gradeLevel: this.gradeLevel,
                }
            });
        }
    }
};
</script>

<style scoped>
.enter-button {
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s, color 0.3s;
}

.enter-button:hover {
    background-color: white;
    color: black;
}

.enter-button::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300%;
    height: 300%;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transform: translateX(-50%) translateY(50%) rotate(45deg);
    animation: wave 1s ease-out forwards;
}

.enter-button:hover::after {
    animation: wave 1s ease-out forwards;
}

@keyframes wave {
    0% {
        width: 0;
        height: 0;
        opacity: 1;
    }

    100% {
        width: 300%;
        height: 300%;
        opacity: 0;
    }
}
</style>