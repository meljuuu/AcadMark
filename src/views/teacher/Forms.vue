<template>
  <div>
    <div class="flex justify-between">
      <p class="title">Forms</p>
      <p
        class="text-8xl font-extrabold text-[#d6d6d6] relative top-[-30px] z-0"
      >
        ADVISORY
      </p>
    </div>

    <div
      class="rounded-sm"
      style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px 1px"
    >
      <div class="p-5 w-[50%]">
        <searchbar v-model="searchQuery" />
      </div>
      <div class="flex border-t-[1px] border-gray-300">
        <div class="w-[30%] max-h-[580px] overflow-y-auto mb-5 rounded-bl-lg">
          <p class="p-4 text-lg font-semibold">Name</p>
          <div v-if="loading" class="py-5 px-4 text-center">
            Loading students...
          </div>
          <div v-else-if="filteredStudents.length > 0">
            <div
              class="py-5 px-4 text-gray-800 bg-gray-100 mb-1 cursor-pointer"
              v-for="(student, index) in filteredStudents"
              :key="index"
              @click="selectStudent(index)"
              :class="{
                'bg-gray-300': selectedStudent === filteredStudents[index],
                'hover:bg-gray-200': true,
              }"
            >
              {{ student.FirstName }} {{ student.MiddleName ? student.MiddleName + ' ' : '' }} {{ student.LastName }}
            </div>
          </div>

          <div v-else class="py-5 px-4 text-gray-500 text-center">
            No advisory students available
          </div>
        </div>

        <div
          class="flex flex-grow flex-col border-l border-gray-300 mb-5 rounded-br-lg p-5 gap-10"
        >
          <div class="flex gap-20">
            <div class="flex flex-col gap-3">
              <p class="text-2xl font-semibold text-blue">STUDENT INFO</p>
              <div class="flex gap-10">
                <div class="flex flex-col gap-3">
                  <p class="text-xs font-bold text-blue">Student Name</p>
                  <p class="text-2xl font-medium">
                    {{ selectedStudentInfo.firstName }} 
                    {{ selectedStudentInfo.middleName ? selectedStudentInfo.middleName + ' ' : '' }}
                    {{ selectedStudentInfo.lastName }}
                  </p>

                  <p class="text-xs font-bold text-blue">LRN</p>
                  <p class="text-2xl font-medium">
                    {{ selectedStudentInfo.lrn }}
                  </p>
                </div>
                <div class="flex flex-col gap-3">
                  <p class="text-xs font-bold text-blue">Sex</p>
                  <p class="text-2xl font-medium">
                    {{ selectedStudentInfo.sex }}
                  </p>

                  <p class="text-xs font-bold text-blue">Curriculum</p>
                  <p class="text-2xl font-medium">
                    {{ selectedStudentInfo.curriculum }}
                  </p>
                </div>
                <div class="flex flex-col gap-3">
                  <p class="text-xs font-bold text-blue">Birthdate</p>
                  <p class="text-2xl font-medium">
                    {{ selectedStudentInfo.birthDate }}
                  </p>

                  <p class="text-xs font-bold text-blue">Address</p>
                  <p class="text-2xl font-medium">
                    {{ selectedStudentInfo.address }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex gap-5 items-center">
              <div>
                <p class="text-blue text-xs font-bold">GWA</p>
                <input
                  type="text"
                  class="border-[1px] w-35 h-9 text-center"
                  v-model="Grade"
                  readonly
                />
              </div>
              <div>
                <p class="text-blue text-xs font-bold">Remarks</p>
                <div
                  class="w-35 h-9 border-[1px] rounded-[5px] items-center justify-center flex"
                >
                  <p class="font-bold" :class="remarksClass">{{ remarks }}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-3">
              <p class="text-2xl font-semibold text-blue">GRADES</p>
              <div class="flex gap-2">
                <button
                  class="bg-blue text-white py-2 px-3 rounded-md text-sm font-semibold cursor-pointer hover:bg-[#cecece]"
                  @click="generateCSV('SF10')"
                >
                  SF10
                </button>
                <button
                  class="bg-blue text-white py-2 px-3 rounded-md text-sm font-semibold cursor-pointer hover:bg-[#cecece]"
                  @click="generateCSV('SF9')"
                >
                  SF9
                </button>
              </div>
            </div>

            <div>
              <table
                v-if="studentSubjects.length > 0"
                class="w-full table-auto"
              >
                <thead>
                  <tr>
                    <th
                      class="bg-gray-100 text-center p-2 text-sm text-gray-700"
                    >
                      SUBJECT
                    </th>
                    <th
                      class="bg-gray-100 text-center p-2 text-sm text-gray-700"
                    >
                      1ST QUARTER
                    </th>
                    <th
                      class="bg-gray-100 text-center p-2 text-sm text-gray-700"
                    >
                      2ND QUARTER
                    </th>
                    <th
                      class="bg-gray-100 text-center p-2 text-sm text-gray-700"
                    >
                      3RD QUARTER
                    </th>
                    <th
                      class="bg-gray-100 text-center p-2 text-sm text-gray-700"
                    >
                      4TH QUARTER
                    </th>
                    <th
                      class="bg-gray-100 text-center p-2 text-sm text-gray-700"
                    >
                      Final Grade
                    </th>
                    <th
                      class="bg-gray-100 text-center p-2 text-sm text-gray-700"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(subject, index) in studentSubjects" :key="index">
                    <td class="p-2 text-center font-semibold text-gray-800">
                      {{ subject.subjectName || '-' }}
                    </td>
                    <td class="p-2 text-center font-semibold text-gray-800">
                      {{ getGrade(subject.subject_id, 'first') || 'No grade' }}
                    </td>
                    <td class="p-2 text-center font-semibold text-gray-800">
                      {{ getGrade(subject.subject_id, 'second') || 'No grade' }}
                    </td>
                    <td class="p-2 text-center font-semibold text-gray-800">
                      {{ getGrade(subject.subject_id, 'third') || 'No grade' }}
                    </td>
                    <td class="p-2 text-center font-semibold text-gray-800">
                      {{ getGrade(subject.subject_id, 'fourth') || 'No grade' }}
                    </td>
                    <td class="p-2 text-center font-semibold text-gray-800">
                      {{ calculateGWA(subject.subject_id) || 'No grade' }}
                    </td>
                    <td class="p-2 text-center font-semibold text-gray-800">
                      {{ getRemarks(subject.subject_id) }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-else class="py-5 text-center text-gray-500">
                No subjects available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add error message display -->
    <div v-if="error" class="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import searchbar from '@/components/searchbar.vue';
  import {
    getAdvisoryStudents,
    getStudentSubjects,
    getStudentGrades
  } from '@/service/formsService';

  const searchQuery = ref('');
  const students = ref([]);
  const subjects = ref([]);
  const selectedStudent = ref(null);
  const selectedStudentInfo = ref({});
  const studentSubjects = ref([]);
  const Grade = ref('No grade');
  const loading = ref(true);
  const studentGrades = ref({});
  const error = ref(null);

  onMounted(async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getAdvisoryStudents();
      console.log('Advisory students response:', data);

      if (data.status === 'success' && Array.isArray(data.students)) {
        students.value = data.students;
        if (students.value.length > 0) {
          await selectStudent(0);
        }
      } else {
        error.value = data.message || 'No advisory students found';
        console.warn('No advisory students found or unexpected data format:', data);
      }
    } catch (error) {
      error.value = 'Failed to fetch advisory students';
      console.error('Error fetching advisory students:', error);
    } finally {
      loading.value = false;
    }
  });

  const fallbackToLocalStorage = () => {
    console.log('Falling back to localStorage for student data');

    const storedStudents = localStorage.getItem('students');
    const storedSubjects = localStorage.getItem('subjects');

    students.value = storedStudents ? JSON.parse(storedStudents) : [];
    subjects.value = storedSubjects ? JSON.parse(storedSubjects) : [];

    if (subjects.value.length > 0) {
      const firstSubject = subjects.value[0];
      if (firstSubject.student_id && Array.isArray(firstSubject.student_id)) {
        students.value = students.value.filter((student) =>
          firstSubject.student_id.includes(student.student_id)
        );
      }

      if (students.value.length > 0) {
        selectStudent(0);
      }
    }
  };

  const filteredStudents = computed(() => {
    if (!searchQuery.value) return students.value;

    const query = searchQuery.value.toLowerCase();
    return students.value.filter((student) => {
      const fullName = `${student.FirstName} ${student.MiddleName || ''} ${student.LastName}`.toLowerCase();
      return (
        fullName.includes(query) ||
        (student.LRN && student.LRN.toLowerCase().includes(query))
      );
    });
  });

  const selectStudent = async (index) => {
    if (index >= 0 && index < filteredStudents.value.length) {
      const student = filteredStudents.value[index];
      selectedStudent.value = student;
      selectedStudentInfo.value = {
        firstName: student.FirstName,
        middleName: student.MiddleName,
        lastName: student.LastName,
        lrn: student.LRN,
        sex: student.Sex,
        curriculum: student.Curriculum,
        birthDate: student.BirthDate,
        address: student.Address || `${student.HouseNo || ''} ${student.Barangay || ''} ${student.Municipality || ''} ${student.Province || ''}`.trim()
      };
      error.value = null;

      try {
        console.log('Selected student:', student);

        const studentId = student.Student_ID;
        
        if (!studentId) {
          console.error('Student ID is missing:', student);
          error.value = 'Invalid student data';
          return;
        }

        const subjectsData = await getStudentSubjects(studentId);
        console.log('Subjects data:', subjectsData);

        if (subjectsData.status === 'success') {
          studentSubjects.value = subjectsData.subjects || [];
        } else {
          error.value = subjectsData.message || 'Failed to fetch student subjects';
          studentSubjects.value = [];
        }
      } catch (err) {
        console.error('Error fetching student subjects:', err);
        error.value = 'Failed to fetch student subjects';
        studentSubjects.value = [];
      }
    }
  };

  const getGrade = (subjectId, quarter) => {
    const grades = studentGrades.value[subjectId];
    if (!grades) return 'No grade';
    
    const quarterMap = {
      'first': 'Q1',
      'second': 'Q2',
      'third': 'Q3',
      'fourth': 'Q4'
    };
    
    return grades[quarterMap[quarter]] || 'No grade';
  };

  const calculateGWA = (subjectId) => {
    const grades = studentGrades.value[subjectId];
    if (!grades) return 'No grade';

    const quarterGrades = [
      grades.Q1,
      grades.Q2,
      grades.Q3,
      grades.Q4
    ];

    // Check if all grades are empty or undefined
    if (quarterGrades.every(grade => !grade || grade === '-' || grade === 'No grade')) {
      return 'No grade';
    }

    // Calculate average of valid grades
    const validGrades = quarterGrades
      .filter(grade => grade && grade !== '-' && grade !== 'No grade')
      .map(grade => parseFloat(grade));

    if (validGrades.length > 0) {
      const average = validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length;
      return isNaN(average) ? 'No grade' : average.toFixed(2);
    }

    return 'No grade';
  };

  const getRemarks = (subjectId) => {
    const gwa = calculateGWA(subjectId);
    if (gwa === 'No grade' || gwa === 'INC') {
      return 'No remarks';
    }
    return parseFloat(gwa) >= 75 ? 'Passed' : 'Failed';
  };

  const remarks = computed(() => {
    if (
      !Grade.value ||
      Grade.value === 'No grade' ||
      isNaN(parseFloat(Grade.value))
    ) {
      return 'No grade';
    }
    return parseFloat(Grade.value) >= 75 ? 'Passed' : 'Failed';
  });

  const remarksClass = computed(() => {
    return remarks.value === 'Passed' ? 'text-green-600' : 'text-red-600';
  });

  const calculateAverageGrade = computed(() => {
    if (!selectedStudent.value || studentSubjects.value.length === 0) {
      return 'No grade';
    }

    const finalGrades = studentSubjects.value
      .map((subject) => {
        const gwa = calculateGWA(subject.subject_id);
        return gwa !== 'No grade' && gwa !== 'INC' ? parseFloat(gwa) : null;
      })
      .filter((grade) => grade !== null);

    if (finalGrades.length === 0) {
      return 'No grade';
    }

    const average =
      finalGrades.reduce((sum, grade) => sum + grade, 0) / finalGrades.length;
    return average.toFixed(2);
  });

  // Watch for changes in selection or subjects
  watch(
    () => selectedStudent.value,
    () => {
      if (selectedStudent.value) {
        Grade.value = calculateAverageGrade.value;
      }
    }
  );

  watch(
    () => studentSubjects.value,
    () => {
      Grade.value = calculateAverageGrade.value;
    },
    { deep: true }
  );

  const generateCSV = (type) => {
    const student = selectedStudent.value;

    if (!student) return;

    if (type === 'SF10') {
      const csvContent = [
        [
          'First Name',
          'Middle Name',
          'Last Name',
          'LRN',
          'Sex',
          'Curriculum',
          'Birthdate',
          'Address',
        ],
        [
          student.firstName,
          student.middleName,
          student.lastName,
          student.lrn,
          student.sex,
          student.curriculum,
          student.birthDate,
          student.address,
        ],
      ];
      downloadCSV(csvContent, 'SF10_Learners_Info.csv');
    } else if (type === 'SF9') {
      const csvContent = [
        [
          'Subject',
          '1st Quarter',
          '2nd Quarter',
          '3rd Quarter',
          '4th Quarter',
          'Final Grade',
          'Remarks',
        ],
      ];

      studentSubjects.value.forEach((subject) => {
        csvContent.push([
          subject.subjectName || '-',
          getGrade(subject.subject_id, 'first'),
          getGrade(subject.subject_id, 'second'),
          getGrade(subject.subject_id, 'third'),
          getGrade(subject.subject_id, 'fourth'),
          calculateGWA(subject.subject_id),
          getRemarks(subject.subject_id),
        ]);
      });

      downloadCSV(csvContent, 'SF9_Report_Card.csv');
    }
  };

  const downloadCSV = (csvContent, fileName) => {
    const blob = new Blob([csvContent.map((row) => row.join(',')).join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.click();
  };
</script>

<style scoped>
.subjects-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.subjects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.subject-card {
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subject-card h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.subject-card p {
  margin: 0.25rem 0;
  color: #666;
}

.no-subjects {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>

