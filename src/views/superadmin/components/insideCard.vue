<template>
  <div class="back-btn" @click="goBack">
    <span class="chevron">&lt;</span>
    <span>Back</span>
  </div>

  <div class="container mt-8">
    <div class="head">
        <div class="filtering-section">
            <select v-model="selectedStatus" class="filter-dropdown">
                <option disabled value="">Status</option>
                <option v-for="status in statuses" :key="status" :value="status">
                {{ status }}
                </option>
            </select>

            <select v-model="selectedGender" class="filter-dropdown">
                <option disabled value="">Gender</option>
                <option v-for="gender in genders" :key="gender" :value="gender">
                {{ gender }}
                </option>
            </select>

            <select v-model="selectedTrack" class="filter-dropdown">
                <option disabled value="">Track</option>
                <option v-for="track in tracks" :key="track" :value="track">
                {{ track }}
                </option>
            </select>
        </div>

        <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Search..." />
        </div>
    </div>

    <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>LRN</th>
              <th>NAME</th>
              <th>GENDER</th>
              <th>AGE</th>
              <th>GRADE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="personnel in paginatedPersonnel"
              :key="personnel.employee"
            >
              <td>{{ personnel.employee }}</td>
              <td>{{ personnel.name }}</td>
              <td>{{ personnel.qualification }}</td>
              <td>{{ personnel.access }}</td>
              <td>{{ personnel.email }}</td>
              <td>Actions here</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from "vue";

const router = useRouter()
const goBack = () => router.back()


const selectedTrack = ref("");
const selectedGender = ref("");
const selectedStatus = ref("");

const tracks = ["STEM", "ABM", "TVL", "HUMSS"];
const genders = ["Male", "Female"];
const statuses = ["Pending", "Approved", "Not Approved"];


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
.filtering-section {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: 15px;
}

.filter-dropdown {
  padding: 15px 20px;
  width: 210px;
  border: 1px solid #295f98;
  border-radius: 5px;
  font-size: 14px;
  background: #fff;
  font-weight: bold;
  color: #295f98;
  cursor: pointer;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
  transition: all 0.3s ease-in-out;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M14 7l-5 5 5 5V7z'/></svg>");
}

.filter-dropdown:focus {
  outline: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M7 10l5 5 5-5H7z'/></svg>");
}

.back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 24px;
    color: #333;
    transition: color 0.2s;
    font-weight: 600;
}

span:hover {
    text-decoration: underline;
}

.chevron {
    font-size: 25px;
}

.container {
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #EEEEEE;
    padding: 30px 20px;
    border-radius: 5px;
}

.head {
    display: flex;
}

.search-bar {
    display: flex;
    gap: 10px;
    justify-content: end;
    width: 100%;
  }

  .search-bar input {
    padding: 8px;
    border: 1px solid #295f98;
    border-radius: 5px;
    width: 520px;
  }
</style>
