<template>
  <div>
    <h1 class="title">Classes</h1>
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
    <div v-else-if="error" class="text-red-500 text-center p-4">
      {{ error }}
    </div>
    <div v-else class="grid ssm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      <Card
        v-for="classItem in classes"
        :key="classItem.class_id"
        :class_id="classItem.class_id"
        :trackStand="classItem.trackStand"
        :classType="classItem.classType"
        :className="classItem.className"
        :subjectName="classItem.subjectName"
        :subject_id="classItem.subject_id"
        :gradeLevel="classItem.gradeLevel"
        :type="classItem.classType"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '@/components/card.vue';
import { classService } from '@/service/classService';

const classes = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchClasses = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await classService.getClasses();
    if (response.status === 'success') {
      classes.value = response.data;
    } else {
      error.value = response.message || 'Failed to fetch classes';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred while fetching classes';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchClasses();
});
</script>
