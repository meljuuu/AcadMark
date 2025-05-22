<template>
<<<<<<< HEAD
  <div class="flex justify-between m-5">
    <div class="flex justify-between w-90">
      <Dropdown :showSort="true" v-model="selectedSort" />
    </div>

    <div class="flex w-1/2 justify-between">
      <Searchbar v-model="searchQuery" />
      <button
        @click="generateCSV"
        class="bg-[#30612E] text-white px-5 py-1 rounded-md hover:bg-[#cecece] transition-colors cursor-pointer duration-200"
      >
        Generate Report
      </button>
=======
    <div class="flex justify-between m-5">
        <div class="flex justify-between w-90">
            <Dropdown :showSort="true" v-model="selectedSort" />
        </div>

        <div class="flex justify-between gap-5">
            <div>
                <Searchbar v-model="searchQuery" />
            </div>
            <button @click="generateCSV"
                class="bg-[#30612E] text-white px-5 py-1 rounded-md hover:bg-[#cecece] transition-colors cursor-pointer duration-200">
                <p class="w-full">Generate Report</p>
            </button>
        </div>
    </div>

    <div class="p-5 rounded-[5px]">
        <div class="relative">
            <table class="w-full border-collapse border-none rounded-[5px]">
                <thead class="bg-gray-100">
                    <tr>
                        <th v-for="header in headers" :key="header"
                            class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
            </table>
            <div class="max-h-[600px] overflow-y-auto">
                <table class="w-full border-collapse border-none rounded-[5px]">
                    <tbody class="text-center font-medium">
                        <tr v-if="filteredStudents.length === 0">
                            <td colspan="9" class="px-4 py-2">No students available.</td>
                        </tr>
                        <tr v-for="student in filteredStudents" :key="student.lrn">
                            <td class="px-4 py-2">{{ student.lrn }}</td>
                            <td class="px-4 py-2">{{ student.lastName + ", " + student.firstName + " " +
                                student.middleName }}
                            </td>
                            <td class="px-4 py-2">{{ student.sex }}</td>
                            <td class="px-4 py-2">{{ getGradeForQuarter(student, "first") }}</td>
                            <td class="px-4 py-2">{{ getGradeForQuarter(student, "second") }}</td>
                            <td class="px-4 py-2">{{ getGradeForQuarter(student, "third") }}</td>
                            <td class="px-4 py-2">{{ getGradeForQuarter(student, "fourth") }}</td>
                            <td class="px-4 py-2">{{ getFinalGrade(student) }}</td>
                            <td :class="getRemarks(student) === 'Passed' ? 'text-[#23AD00]' : 'text-[#FF0000]'"
                                class="px-4 py-2 font-bold">
                                {{ getRemarks(student) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)
    </div>
  </div>

  <div class="overflow-x-auto p-5 rounded-[5px]">
    <table class="w-full border-collapse border-none rounded-[5px]">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="text-center font-medium">
        <tr v-if="paginatedStudents.length === 0">
          <td colspan="8" class="px-4 py-2">No students available.</td>
        </tr>
        <tr v-for="student in paginatedStudents" :key="student.lrn">
          <td class="px-4 py-2">{{ student.lrn }}</td>
          <td class="px-4 py-2">
            {{
              student.lastName +
              ', ' +
              student.firstName +
              ' ' +
              student.middleName
            }}
          </td>
          <td class="px-4 py-2">{{ student.sex }}</td>
          <td class="px-4 py-2">{{ getGradeForQuarter(student, 'first') }}</td>
          <td class="px-4 py-2">{{ getGradeForQuarter(student, 'second') }}</td>
          <td class="px-4 py-2">{{ getGradeForQuarter(student, 'third') }}</td>
          <td class="px-4 py-2">{{ getGradeForQuarter(student, 'fourth') }}</td>
          <td class="px-4 py-2">{{ getFinalGrade(student) }}</td>
          <td
            :class="
              getRemarks(student) === 'Passed'
                ? 'text-[#23AD00]'
                : 'text-[#FF0000]'
            "
            class="px-4 py-2 font-bold"
          >
            {{ getRemarks(student) }}
            <span class="block text-xs font-normal text-gray-600">{{
              getDescriptor(student)
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
<<<<<<< HEAD
  import { ref, onMounted, computed, watch } from 'vue';
  import Dropdown from '@/components/dropdown.vue';
  import Searchbar from '@/components/searchbar.vue';
=======
import { ref, onMounted, computed } from 'vue';
import Dropdown from '@/components/dropdown.vue';
import Searchbar from '@/components/searchbar.vue';
import Swal from 'sweetalert2';
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)

  const props = defineProps({
    subject_id: {
      type: String,
      required: true,
    },
    subjectName: {
<<<<<<< HEAD
      type: String,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  });

  const emit = defineEmits(['update:currentPage', 'update:totalItems']);

  const headers = ref([
    'LRN',
    'Name',
    'Gender',
    '1st Quarter',
    '2nd Quarter',
    '3rd Quarter',
    '4th Quarter',
    'Final Grade',
    'Remarks',
  ]);
=======
        type: String,
        required: true,
    }
});

const headers = ref([
    'LRN', 'Name', 'Gender', '1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter', 'Final Grade', 'Remarks'
]);
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)

  const students = ref([]);
  const selectedSort = ref('default');
  const searchQuery = ref('');

  const fetchStudents = () => {
    try {
<<<<<<< HEAD
      const key = `submittedGrade_${props.subject_id}`;
      const storedData = JSON.parse(localStorage.getItem(key)) || [];
      students.value = storedData;
      emit('update:currentPage', 1);
      emit('update:totalItems', students.value.length);
    } catch (error) {
      students.value = [];
      emit('update:currentPage', 1);
      emit('update:totalItems', 0);
=======
        const key = `submittedGrade_${props.subject_id}`;
        const storedData = JSON.parse(localStorage.getItem(key)) || [];
        students.value = storedData;
    } catch (error) {
        students.value = [];
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)
    }
  };

  const getGradeForQuarter = (student, quarter) => {
    const grade = student.grades?.[quarter];
<<<<<<< HEAD
    if (
      !grade ||
      grade === null ||
      grade === undefined ||
      grade === '' ||
      grade === '-' ||
      grade === 'No grade'
    ) {
      return 'No grade';
=======
    if (!grade || grade === null || grade === undefined || grade === '' || grade === '-' || grade === 'No grade') {
        return '-';
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)
    }
    return grade;
  };

  const getFinalGrade = (student) => {
    const grades = ['first', 'second', 'third', 'fourth'];
    let total = 0;
    let gradeCount = 0;
    let hasAnyValidGrade = false;

    for (let quarter of grades) {
<<<<<<< HEAD
      const grade = getGradeForQuarter(student, quarter);
      if (grade !== 'No grade') {
        hasAnyValidGrade = true;
        total += parseFloat(grade);
        gradeCount++;
      }
=======
        const grade = getGradeForQuarter(student, quarter);
        if (grade !== '-') {
            hasAnyValidGrade = true;
            total += parseFloat(grade);
            gradeCount++;
        }
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)
    }

    if (!hasAnyValidGrade) return '-';
    if (gradeCount < 4) return '-';

    return (total / gradeCount).toFixed(2);
  };

  const getDescriptor = (student) => {
    const finalGrade = getFinalGrade(student);
<<<<<<< HEAD

    if (finalGrade === 'No grade' || finalGrade === 'INC') {
      return 'Incomplete';
    }

    const numericGrade = parseFloat(finalGrade);

    if (numericGrade >= 90 && numericGrade <= 100) {
      return 'Outstanding';
    } else if (numericGrade >= 85 && numericGrade <= 89) {
      return 'Very Satisfactory';
    } else if (numericGrade >= 80 && numericGrade <= 84) {
      return 'Satisfactory';
    } else if (numericGrade >= 75 && numericGrade <= 79) {
      return 'Fairly Satisfactory';
    } else {
      return 'Did Not Meet Expectation';
    }
  };

  const getRemarks = (student) => {
    const finalGrade = getFinalGrade(student);

    // Handle special cases
    if (finalGrade === 'No grade' || finalGrade === 'INC') {
      return 'Failed';
    }

    // Convert to number for comparison
    const numericGrade = parseFloat(finalGrade);

    // Apply grading scale as shown in Learner Progress and Achievement table
    if (numericGrade < 75) {
      return 'Failed'; // Did Not Meet Expectation
    } else {
      return 'Passed'; // All other grades are passing
    }
  };

  const gradeToNumeric = (grade) => {
    if (grade === 'No grade') return -1;
=======
    if (finalGrade === '-' || finalGrade === 'INC' || parseFloat(finalGrade) <= 75) {
        return 'Failed';
    }
    return 'Passed';
};

const gradeToNumeric = (grade) => {
    if (grade === '-') return -1;
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)
    if (grade === 'INC') return 0;
    return parseFloat(grade);
  };

  const filteredStudents = computed(() => {
    let sortedStudents = students.value.filter((student) => {
      const fullName = (
        student.firstName +
        ' ' +
        student.middleName +
        ' ' +
        student.lastName
      ).toLowerCase();
      return fullName.includes(searchQuery.value.toLowerCase());
    });

    switch (selectedSort.value) {
      case 'Sort by A-Z':
        sortedStudents.sort((a, b) => a.lastName.localeCompare(b.lastName));
        break;
      case 'Sort by Z-A':
        sortedStudents.sort((a, b) => b.lastName.localeCompare(a.lastName));
        break;
      case 'Sort by Grade (Highest)':
        sortedStudents.sort((a, b) => {
          const gradeA = getFinalGrade(a);
          const gradeB = getFinalGrade(b);
          return gradeToNumeric(gradeB) - gradeToNumeric(gradeA);
        });
        break;
      case 'Sort by Grade (Lowest)':
        sortedStudents.sort((a, b) => {
          const gradeA = getFinalGrade(a);
          const gradeB = getFinalGrade(b);
          return gradeToNumeric(gradeA) - gradeToNumeric(gradeB);
        });
        break;
      default:
        break;
    }

    return sortedStudents;
  });

<<<<<<< HEAD
  const totalPages = computed(() => {
    if (filteredStudents.value.length === 0) {
      return 0;
    }
    return Math.ceil(filteredStudents.value.length / props.itemsPerPage);
  });

  const paginatedStudents = computed(() => {
    if (filteredStudents.value.length === 0) {
      return [];
    }

    const startIndex = (props.currentPage - 1) * props.itemsPerPage;
    const endIndex = startIndex + props.itemsPerPage;
    return filteredStudents.value.slice(startIndex, endIndex);
  });

  watch(
    filteredStudents,
    (newFilteredStudents) => {
      const newTotalPages = Math.ceil(
        newFilteredStudents.length / props.itemsPerPage
      );
      if (props.currentPage > newTotalPages && newTotalPages > 0) {
        emit('update:currentPage', newTotalPages);
      } else if (newTotalPages === 0) {
        emit('update:currentPage', 1);
      }
    },
    { deep: true }
  );

  const generateCSV = () => {
=======
const generateCSV = () => {
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)
    const date = new Date().toLocaleDateString().replace(/\//g, '-');

    const csvContent = [
      headers.value.join(','),
      ...filteredStudents.value.map((student) =>
        [
          student.lrn,
          `${student.lastName}, ${student.firstName} ${student.middleName}`.trim(),
          student.sex,
          getGradeForQuarter(student, 'first'),
          getGradeForQuarter(student, 'second'),
          getGradeForQuarter(student, 'third'),
          getGradeForQuarter(student, 'fourth'),
          getFinalGrade(student),
          getRemarks(student),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Grades Summary - ${props.subjectName} - ${date}.csv`
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

<<<<<<< HEAD
  onMounted(() => {
    fetchStudents();
    if (students.value.length === 0) {
      emit('update:currentPage', 1);
      emit('update:totalItems', 0);
    } else {
      emit('update:totalItems', students.value.length);
    }
  });
</script>
=======
const showAlertModal = (message, type = 'error', title = 'Error') => {
    Swal.fire({
        title: title,
        text: message,
        icon: type,
        confirmButtonColor: type === 'error' ? '#dc2626' : '#16a34a',
        confirmButtonText: 'OK'
    });
};

onMounted(() => {
    fetchStudents();
});
</script>
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)
