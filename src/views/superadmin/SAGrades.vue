<template>
  <div class="title">
    <h1 class="text-5xl font-bold">Grades</h1>
  </div>

  <div class="content mt-3">
    <div class="filtering-section">
      <select v-model="selectedGrade" class="filter-dropdown">
        <option value="">Grade Level (All)</option>
        <option v-for="grade in grades" :key="grade" :value="grade">
          Grade {{ grade }}
        </option>
      </select>

      <select v-model="selectedCurriculum" class="filter-dropdown">
        <option value="">Curriculum (All)</option>
        <option v-for="curriculum in curriculums" :key="curriculum" :value="curriculum">
          {{ curriculum }}
        </option>
      </select>

      <select v-model="selectedTrack" class="filter-dropdown">
        <option value="">Track (All)</option>
        <option v-for="track in tracks" :key="track" :value="track">
          {{ track }}
        </option>
      </select>
    </div>

    <div class="card-grid mt-9">
        <div
            class="card cursor-pointer hover:shadow-lg transition"
            v-for="(card, index) in filteredCards"
            :key="index"
            @click="goToInsideCard(card)"
        >
            <div class="header">
            <p>Junior High School</p>
            </div>
            <div class="grade">Grade {{ card.grade }}</div>
            <div class="section" v-if="card.section && card.curriculum">
            {{ card.section }} - {{ card.curriculum }}
            </div>
            <div class="seal">
            <img src="/assets/img/logo.png" alt="">
            </div>
        </div>
    </div>

  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()

function goToInsideCard(card) {
  router.push({
    name: 'insideCard',
    params: {
      grade: card.grade,
      section: card.section
    }
  })
}

const selectedGrade = ref("");
const selectedCurriculum = ref("");
const selectedTrack = ref("");

const grades = [7, 8, 9, 10, 11, 12];
const curriculums = ["BEC", "K-12", "SPED"];
const tracks = ["STEM", "ABM", "TVL", "HUMSS"];

const cards = ref([
  // Grade 7
  { grade: 7, section: "Einstein", curriculum: "BEC", track: "STEM" },
  { grade: 7, section: "Einstein", curriculum: "K-12", track: "ABM" },
  { grade: 7, section: "Newton", curriculum: "SPED", track: "TVL" },
  { grade: 7, section: "Einstein", curriculum: "K-12", track: "STEM" },
  { grade: 7, section: "Einstein", curriculum: "BEC", track: "HUMSS" },
  { grade: 7, section: "Einstein", curriculum: "SPED", track: "TVL" },

  // Grade 8
  { grade: 8, section: "Einstein", curriculum: "K-12", track: "STEM" },
  { grade: 8, section: "Einstein", curriculum: "BEC", track: "ABM" },
  { grade: 8, section: "Einstein", curriculum: "SPED", track: "TVL" },
  { grade: 8, section: "Einstein", curriculum: "K-12", track: "HUMSS" },
  { grade: 8, section: "Einstein", curriculum: "BEC", track: "STEM" },
  { grade: 8, section: "Einstein", curriculum: "SPED", track: "TVL" },

  // Grade 9
  { grade: 9, section: "Einstein", curriculum: "K-12", track: "ABM" },
  { grade: 9, section: "Einstein", curriculum: "BEC", track: "TVL" },
  { grade: 9, section: "Einstein", curriculum: "SPED", track: "HUMSS" },
  { grade: 9, section: "Einstein", curriculum: "K-12", track: "STEM" },
  { grade: 9, section: "Einstein", curriculum: "BEC", track: "HUMSS" },
  { grade: 9, section: "Einstein", curriculum: "SPED", track: "ABM" },
]);

const filteredCards = computed(() => {
  return cards.value.filter(card => {
    const matchGrade = !selectedGrade.value || card.grade === Number(selectedGrade.value);
    const matchCurriculum = !selectedCurriculum.value || card.curriculum === selectedCurriculum.value;
    const matchTrack = !selectedTrack.value || card.track === selectedTrack.value;
    return matchGrade && matchCurriculum && matchTrack;
  });
});
</script>

<style scoped>
.title {
    color: #295f98;
    font-weight: bold;
    font-size: 48px;
    padding: 0;
    margin: 20px 0;
}

.content {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #EEEEEE;
  padding: 30px 20px;
  border-radius: 5px;
}

.filtering-section {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: 15px;
}

.filter-dropdown {
  padding: 15px 20px;
  width: 200px;
  border: 1px solid #295f98;
  border-radius: 5px;
  font-size: 14px;
  background: #fff;
  font-weight: bold;
  color: #295f98;
  cursor: pointer;
  appearance: none;
  position: relative;
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
  transition: all 0.3s ease-in-out;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M14 7l-5 5 5 5V7z'/></svg>");
}

.filter-dropdown:focus {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M7 10l5 5 5-5H7z'/></svg>");
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center; 
}


.card {
  width: 208px;
  height: 180px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.header {
  font-weight: bold;
  color: #FFFFFF;
  background-color: #295f98;
  padding: 13px 25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  p {
    opacity: 0.7;
  }
}

.grade,
.section {
    text-align: start;
    padding-left: 10px;
    color: #295F98;
}

.grade {
  font-size: 40px;
  margin-top: 5px;
  font-weight: 500;
}

.section {
  font-size: 16px;
  padding-left: 16px;
}

.seal {
  position: absolute;
  bottom: -20px;
  right: -25px;
  width: 95px;
  height: auto;
  opacity: 0.5;
}
</style>
