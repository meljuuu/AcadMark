<template>
  <div class="dropdown-container">
    <!-- Curriculum Dropdown -->
    <div v-if="showCurriculum" class="dropdown">
      <div class="dropdown-item">
        <label for="curriculum">Curriculum</label>
        <select v-model="selectedCurriculum" id="curriculum">
          <option v-for="option in curriculumOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <!-- Year Dropdown -->
    <div v-if="showYear" class="dropdown">
      <div class="dropdown-item">
        <label for="year">Year</label>
        <select v-model="selectedYear" id="year">
          <option v-for="option in yearOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <!-- Academic Track Dropdown -->
    <div v-if="showAcademicTrack" class="dropdown">
      <div class="dropdown-item">
        <label for="academic-track">Academic Track</label>
        <select v-model="selectedAcademicTrack" id="academic-track">
          <option v-for="option in academicTrackOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <!-- Grade Dropdown -->
    <div v-if="showGrade" class="dropdown">
      <div class="dropdown-item">
        <label for="grade">Grade</label>
        <select v-model="selectedGrade" id="grade">
          <option v-for="option in gradeOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <!-- Subject Dropdown -->
    <div v-if="showSubject" class="dropdown">
      <div class="dropdown-item">
        <label for="subject">Subject</label>
        <select v-model="selectedSubject" id="subject">
          <option v-for="option in subjectOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <!-- Quarter Dropdown -->
    <div v-if="showQuarter" class="dropdown">
      <div class="dropdown-item">
        <label for="quarter">Quarter</label>
        <select v-model="selectedQuarter" id="quarter">
          <option v-for="option in quarterOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <!-- Sort Dropdown -->
    <div v-if="showSort" class="dropdown">
      <div class="dropdown-item">
        <label for="sort">Sort</label>
        <select v-model="selectedSort" id="sort">
          <option v-for="option in sortOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

// Props to control which dropdowns to show
const props = defineProps({
  showCurriculum: {
    type: Boolean,
    default: true,
  },
  showYear: {
    type: Boolean,
    default: true,
  },
  showAcademicTrack: {
    type: Boolean,
    default: false,
  },
  showGrade: {
    type: Boolean,
    default: false,
  },
  showSubject: {
    type: Boolean,
    default: false,
  },
  showQuarter: {
    type: Boolean,
    default: false,
  },
  showSort: {
    type: Boolean,
    default: false,
  },
});

// Dropdown options
const curriculumOptions = ['SHS', 'JHS'];
const yearOptions = ['2023', '2024', '2025'];
const academicTrackOptions = ['TVL', 'Arts and Design', 'Sports', 'ABM', 'STEM', 'HUMMS'];
const gradeOptions = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const subjectOptions = [
  'Mathematics', 'English', 'PE and Health', 'Chemistry', 'Physics', 'Physical Education',
  'Business Mathematics', 'Music', 'Computer Science', 'Art History', 'Advanced Chemistry'
];
const quarterOptions = ['1st', '2nd', '3rd', '4th'];
const sortOptions = ['Sort by A-Z', 'Sort by Z-A', 'Sort by Date'];

// Selected values (reactive data)
const selectedCurriculum = ref('');
const selectedYear = ref('');
const selectedAcademicTrack = ref('');
const selectedGrade = ref('');
const selectedSubject = ref('');
const selectedQuarter = ref('');
const selectedSort = ref('');
</script>

<style scoped>
/* Flex container for the dropdowns */
.dropdown-container {
  display: flex;
  gap: 20px; /* Space between dropdowns */
  flex-wrap: wrap; /* Wrap to next row if not enough space */
}

/* Style for each dropdown */
.dropdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #E3E9EC;
  border-radius: 5px;

}

/* Flex container for label and select to align them side by side */
.dropdown-item {
  display: flex;
  justify-content: space-between; /* Spread the label and select across */
  align-items: center;
}

/* Remove the border from the select */
select {
  font-size: 16px;
  border: none; /* Remove the border */
  background-color: transparent; /* Optional: makes the background transparent */
  padding: 5px;
  font-weight: bold;
}

/* Styling for the label */
label {
  margin-right: 10px; 
  padding: 5px;
  color: #858585;
}
</style>
