<template>
  <div>
    <h1 class="title">Classes</h1>
    <div class="flex flex-col gap-5 flex-wrap">
      <div class="flex justify-between" v-for="(group, index) in chunkedClasses" :key="index">
        <Card v-for="classItem in group" :key="classItem.class_id" :trackStand="classItem.trackStand"
          :className="classItem.className" :subjectName="getSubjectName(classItem.subject_id)"
          :subject_id="classItem.subject_id"
          :gradeLevel="classItem.gradeLevel"
          :type="classItem.classType || 'Subject'" />
      </div>
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
  computed: {
    chunkedClasses() {
      const chunkSize = 4;
      return this.classes.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      }, []);
    },
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
