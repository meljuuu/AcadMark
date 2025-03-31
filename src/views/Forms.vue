<template>
  <div class="form-container">
    <h1 class="title">Forms</h1>
    <h1 class="advisory">ADVISORY</h1>

    <div class="search-container">
      <div class="search-bar">
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
        <h2 class="section-title">STUDENT INFO</h2>

        <h2 class="section-title">GRADES</h2>

        <div class="buttons">
          <button class="bordered-button">SF10</button>
          <button class="bordered-button">SF9</button>
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
      students: Array(11).fill("Bueno, Ryan Joshua E."),
      grades: Array(11).fill({ scores: [75, 75, 75, 75] }),
    };
  },
};
</script>

<style scoped>
.form-container {
  padding-inline: 54px;
}

/* .title {
  font-weight: bold;
  color: #242424;
  font-size: 47px;
} */

.advisory {
  position: absolute;
  top: 100px;
  right: 20px;
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
  max-width: 400px;
  border: 1px solid #ccc;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.search-bar input {
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.content {
  margin-top: -10px;
  display: flex;
  gap: 20px;
}

.namebar {
  width: 30%;
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

.forms-name {
  padding: 15px;
  font-size: 15px;
  font-weight: 600;
}

.student-name {
  padding: 20px;
  color: #292929;
  background: #0044cc;
  margin-bottom: 10px;
}

.main {
  flex-grow: 1;
}

.section-title {
  color: #0044cc;
  font-weight: bold;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.bordered-button {
  margin-top: 10px;
  padding: 8px 12px;
  border: 2px solid #292929;
  background: none;
  cursor: pointer;
}

.bordered-button:hover {
  background: #292929;
  color: white;
}
</style>