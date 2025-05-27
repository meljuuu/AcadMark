<template>
  <div class="rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105">
    <div class="relative w-full">
      <!-- Header Section -->
      <div class="py-3 px-4 text-center font-semibold" :class="cardColor.bg">
        <p class="text-white">{{ trackStand }}</p>
      </div>

      <!-- Main Content Section -->
      <div class="bg-white p-3 relative pb-10">
        <div class="relative z-10 mt-[-5px]">
          <p class="text-5xl font-bold mb-2" :class="cardColor.text">
            {{ className }}
          </p>
          <p class="text-lg font-semibold" :class="cardColor.text">
            {{ subjectName }}
          </p>
          <p class="text-base font-light" :class="cardColor.text">
            {{ formattedGradeLevel }}
          </p>
        </div>

        <!-- Background Logo -->
        <div class="absolute top-0 right-0 w-full h-full overflow-hidden">
          <img class="opacity-40 h-40 absolute top-10 right-[-40px]" src="/assets/img/logo.png" alt="School Logo" />
        </div>
      </div>

      <!-- Footer Section -->
      <div class="rounded-b-xl flex justify-between items-center py-2 px-5 relative z-10" :class="cardColor.bg">
        <p class="text-base font-semibold text-white">{{ cardTitle }}</p>
        <p @click="goToClass"
          class="relative overflow-hidden transition-colors duration-300 text-light text-base text-white border border-white py-2 px-7 rounded-xl cursor-pointer hover:bg-white hover:text-black group">
          <span class="relative z-10">Enter</span>
          <span
            class="absolute bottom-0 left-0 w-[300%] h-[300%] bg-black/10 rounded-full -translate-x-1/2 translate-y-1/2 rotate-45 animate-wave"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  type: { type: String, required: true },
  trackStand: { type: String, required: true },
  className: { type: String, required: true },
  subjectName: { type: String, required: true },
  gradeLevel: { type: [String, Number], required: true },
  isAdviser: { type: [Boolean], required: true},
  classType: { type: String, required: true },
  class_id: { type: String, required: true },
  subject_id: { type: [String, Number, null], required: true },
});

console.log("DATA31231231", props);

const router = useRouter();

const cardColor = computed(() => ({
  text: props.isAdviser  ? 'text-blue' : 'text-green',
  bg: props.isAdviser ? 'bg-blue' : 'bg-green',
}));

const cardTitle = computed(() =>
  props.isAdviser ? 'Advisory Class' : 'Subject Class'
);

const formattedGradeLevel = computed(() => {
  const grade = Number(props.gradeLevel);
  if (grade >= 7 && grade <= 10) return `High School Grade ${grade}`;
  if (grade === 11 || grade === 12) return `Senior High Grade ${grade}`;
  return `Grade ${grade}`;
});

const goToClass = () => {
  router.push({
    name: 'class',
    params: {
      class_id: props.class_id,
      trackStand: props.trackStand,
      className: props.className,
      subjectName: props.subjectName,
      gradeLevel: props.gradeLevel,
      classType: props.type === 'Advisory' ? 'Advisory' : 'Subject',
      subject_id: props.subject_id,
      isAdviser: props.isAdviser,
    },
  });
};
</script>
