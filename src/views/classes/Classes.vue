<template>
  <div>
    <h1 class="title">Classes</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <Card v-for="classItem in classes" :key="classItem.class_id" :trackStand="classItem.trackStand"
        :className="classItem.className" :subjectName="getSubjectName(classItem.subject_id)"
        :subject_id="classItem.subject_id" :gradeLevel="classItem.gradeLevel"
        :type="classItem.classType || 'Subject'" />
    </div>
  </div>
</template>

<script>
import Card from "../../components/card.vue";
import classesData from "../../data/class.json";
import subjectsData from "../../data/subjects.json";

export default {
  components: {
    Card,
  },
  data() {
    return {
      classes: [],
      subjects: {},
    };
  },
  methods: {
    getSubjectName(subjectId) {
      return this.subjects[subjectId] || "Unknown Subject";
    },
  },
  created() {
    this.classes = classesData;
    this.subjects = subjectsData.reduce((acc, subject) => {
      acc[subject.subject_id] = subject.subjectName;
      return acc;
    }, {});
  },
};
</script>
