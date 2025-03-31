<template>
  <div class="form-container">
    <h1 class="title">Forms</h1>
    <h1 class="advisory">ADVISORY</h1>

    <div class="search-container">
      <div class="search-bar">
        <img src="../../public/assets/img/search-icon.svg" class="search-icon" alt="Search" />
        <input type="text" placeholder="Search..." />
      </div>
    </div>

    <div class="content">
      <div class="namebar">
        <h2 class="forms-name"> Name </h2>
        <div class="student-name" v-for="(name, index) in students" :key="index">
          {{ name }}
        </div>
      </div>

      <div class="main">
        <h2 class="student-title">STUDENT INFO</h2>

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
              <tr v-for="(grade, index) in grades" :key="index">
                <td>ENGLISH</td>
                <td v-for="score in grade.scores" :key="score">{{ score }}</td>
                <td>75</td>
                <td>PASSED</td>
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
      students: Array(16).fill("Bueno, Ryan Joshua E."),
      grades: Array(11).fill({ scores: [75, 75, 75, 75] }),
    };
  },
};
</script>

<style scoped>
.form-container {
  padding-inline: 54px;
}

.advisory {
  position: absolute;
  top: 100px;
  right: 50px;
  font-size: 128px;
  font-weight: bold;
  opacity: 0.15;
  color: #292929;
}

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

.content {
  margin-top: -10px;
  display: flex;
}

.namebar {
  width: 30%;
  max-height: 800px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  border-bottom-left-radius: 10px;
}

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

.forms-name {
  padding: 15px;
  font-size: 15px;
  font-weight: 600;
}

.student-name {
  padding: 20px;
  color: #292929;
  background: #F5F5F5;
  margin-bottom: 5px;
  cursor: pointer;
}

.main {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-bottom-right-radius: 10px;
  margin-bottom: 20px;
}

.student-title {
  color: #295F98;
  font-size: 24px;
  font-weight: 600;
  padding: 20px;
}

.grades-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: 100px;
}

.grades-title {
  color: #295F98;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
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

.table-wrapper {
  width: 101%;
  overflow-x: auto;
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
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
</style>