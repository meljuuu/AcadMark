<template>
  <div class="form-container">
    <h1 class="title">Forms</h1>
    <h1 class="advisory">ADVISORY</h1>

    <div class="search-container">
      <div class="search-bar">
        <img src="../../public/assets/img/search-icon.svg" class="search-icon" alt="Search" />
        <input type="text" v-model="searchQuery" placeholder="Search..." />
      </div>
    </div>

    <div class="content">
      <div class="namebar">
        <h2 class="forms-name"> Name </h2>
        <div class="student-name" v-for="(name, index) in filteredStudents" :key="index" @click="selectStudent(index)">
          {{ name }}
        </div>
      </div>

      <div class="main">
        <h2 class="student-titles">STUDENT INFO</h2>

        <div class="grades-header">
          <h2 class="grades-title">GRADES</h2>
          <div class="modal-buttons">
            <button class="bordered-button">SF10</button>
            <button class="bordered-button">SF9</button>
          </div>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>SUBJECT</th>
                <th>1ST QUARTER</th>
                <th>2ND QUARTER</th>
                <th>3RD QUARTER</th>
                <th>4TH QUARTER</th>
                <th>GWA</th>
                <th>REMARKS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(subject, index) in grades[selectedStudent]" :key="index">
                <td>{{ subject.name }}</td>
                <td v-for="score in subject.scores" :key="score">{{ score }}</td>
                <td>{{ calculateGWA(subject.scores) }}</td>
                <td>{{ getRemarks(subject.scores) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      students: [
        "Raven Andre D Legarde",
        "Polaris Jumel Dasmarinas",
        "Harvey S. Samson",
        "Angel Mae Gaña",
        "Arjay R Dabalos",
        "Ryan Bueno",
        "Eunice Protasio",
        "Ehdsell John Apan",
        "Zyvrex John Perez",
        "Mark Gil Bacus"
      ],
      selectedStudent: 0,
      grades: Array.from({ length: 10 }, (_, i) => [
        { name: "English", scores: [72 + i, 73 + i, 76 + i, 77 + i] },
        { name: "Mathematics", scores: [80 + i, 82 + i, 85 + i, 83 + i] },
        { name: "Science", scores: [85 + i, 87 + i, 88 + i, 86 + i] },
        { name: "Filipino", scores: [72 + i, 73 + i, 74 + i, 75 + i] },
        { name: "A.P", scores: [82 + i, 83 + i, 84 + i, 75 + i] },
        { name: "EsP", scores: [88 + i, 89 + i, 87 + i, 85 + i] },
        { name: "TLE", scores: [87 + i, 88 + i, 89 + i, 90 + i] },
        { name: "MAPEH", scores: [70 + i, 72 + i, 74 + i, 73 + i] }
      ])
    };
  },
  // Search bar
  computed: {
    filteredStudents() {
      return this.students.filter(student => 
        student.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  // Remarks - PASSED or FAILED
  methods: {
    selectStudent(index) {
      this.selectedStudent = this.students.indexOf(this.filteredStudents[index]);
    },
    calculateGWA(scores) {
      return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
    },
    getRemarks(scores) {
      return this.calculateGWA(scores) >= 75 ? "PASSED" : "FAILED";
    }
  }
};
</script>


<style scoped>
/* General Layout */
.form-container {
  padding-inline: 54px;
}

/* Typography */
.advisory {
  position: absolute;
  top: 100px;
  right: 50px;
  font-size: 128px;
  font-weight: bold;
  opacity: 0.15;
  color: #292929;
}

.forms-name {
  padding: 15px;
  font-size: 15px;
  font-weight: 600;
}

.student-titles,
.grades-title {
  color: #295F98;
  font-size: 24px;
  font-weight: 600;
  padding: 20px;
}

/* Search Bar */
.search-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
}

.search-bar {
  position: relative;
  width: 100%;
  border: 1px solid #ccc;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.search-icon {
  position: absolute;
  width: 18px;
  height: 18px;
  margin-top: -10px;
  margin-left: 20px;
  filter: brightness(0) saturate(100%) invert(40%) sepia(1%) saturate(2000%) hue-rotate(180deg);
}

.search-bar input {
  font-size: 14px;
  font-weight: 600;
  color: #6C6C6C;
  width: 100%;
  max-width: 350px;
  padding: 10px 10px 10px 50px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Content Section */
.content {
  margin-top: -10px;
  display: flex;
}

/* Namebar */
.namebar {
  width: 30%;
  max-height: 700px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  border-bottom-left-radius: 10px;
}

.student-name {
  padding: 20px;
  color: #292929;
  background: #F5F5F5;
  margin-bottom: 5px;
  cursor: pointer;
}

/* Main Content */
.main {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-bottom-right-radius: 10px;
  margin-bottom: 20px;
}

/* Grades Header & Buttons */
.grades-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: 90px;
}

.modal-buttons {
  display: flex;
  gap: 10px;
}

.bordered-button {
  width: 78px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  background-color: #295F98;
  color: #FFFFFF;
  cursor: pointer;
}

/* Table Styling */
.table-wrapper {
  width: 101%;
  padding: 11px;
  margin-top: -30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid #E3E9EC;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  padding: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

th {
  color: #464F60;
  background-color: #F6F6F6;
  padding: 8px;
  text-align: center;
}

td {
  color: #292929;
  padding: 8px;
  text-align: center;
  font-weight: 600;
}

td:first-child {
  background-color: #F6F6F6;
}

/* Scrollbar Styling */
.namebar::-webkit-scrollbar {
  width: 9px;
}

.namebar::-webkit-scrollbar-track {
  background: #D0D0D0;
  border-radius: 22px;
  margin: 20px;
}

.namebar::-webkit-scrollbar-thumb {
  background: #484848;
  border-radius: 22px;
}

</style>