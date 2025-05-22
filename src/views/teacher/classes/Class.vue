<template>
  <div class="mb-5">
    <p
      class="text-black text-2xl font-semibold mb-8 cursor-pointer hover:text-blue-500"
      @click="goBack"
    >
      &lt; <span class="underline hover:underline">Back</span>
    </p>

    <div class="flex flex-col gap-10">
      <div
        :class="{
          'bg-blue': classType?.toLowerCase() === 'advisory',
          'bg-green': classType?.toLowerCase() === 'subject'
        }"
        class="flex items-center justify-between px-7 py-5 rounded-xl"
      >
        <div class="flex flex-col justify-between h-full">
          <p class="text-white text-xl font-normal leading-none">
            {{ trackStand }}
          </p>

          <div class="flex items-center gap-2">
            <p class="text-white font-medium text-5xl leading-none">
              {{ className }}
            </p>
            <p class="text-white text-xl leading-none">
              ({{ totalStudents }} students)
            </p>
          </div>

          <p class="text-white text-xl font-normal leading-none">
            {{ subjectInfo?.subjectName }}
          </p>

          <div class="mt-7">
            <p class="text-white text-xl">
              <span class="font-bold">Male:</span> {{ maleCount }}
            </p>
            <p class="text-white text-xl">
              <span class="font-bold">Female:</span> {{ femaleCount }}
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div
          :class="{
            'text-[#3E6FA2]': classType?.toLowerCase() === 'advisory',
            'text-[#357e58]': classType?.toLowerCase() === 'subject'
          }"
          class="flex items-center justify-center pr-15 h-[150px]"
        >
          <p class="font-bold text-[150px]">
            {{ parseInt(gradeLevel) <= 10 ? (subjectName + ' ' + gradeLevel) : (trackStand + ' ' + gradeLevel) }}
          </p>
=======
        <div v-if="(activeComponent === 'Submitted') && totalPages > 0"
            class="flex justify-center items-center gap-5 py-5">
            <img src="/assets/img/classes/arrow.png" alt="arrow" class="w-4 h-4 rotate-180 cursor-pointer"
                @click="prevPage" :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
            <div class="flex gap-5 items-center justify-center">
                <div v-for="page in totalPages" :key="page" class="text-lg cursor-pointer"
                    :class="{ 'bg-[#2C2C2C] w-8 h-8 rounded-md text-white flex items-center justify-center': currentPage === page }"
                    @click="currentPage = page">
                    <p>{{ page }}</p>
                </div>
            </div>
            <img src="/assets/img/classes/arrow.png" alt="arrow" class="w-4 h-4 cursor-pointer" @click="nextPage"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
>>>>>>> c596329 (Teacher Side Revisions - sweet alert modals / synced sidebar / total students in dashboard / grading validationand working status (marked, unmarked, show all) / Using "-" instead of "no grade" / Scrollable table instead of pagination)
        </div>
      </div>

      <div
        class="border-[1px] border-[#E0E0E0] rounded-t-xl mb-5"
        style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px 1px"
      >
        <nav class="flex justify-around border-b border-[#E0E0E0] p-5">
          <ul
            v-for="(item, index) in navItems"
            :key="index"
            @click="activeComponent = item.component"
            class="text-lg font-semibold cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue"
            :class="{
              'text-blue border-b-2 border-blue':
                activeComponent === item.component,
            }"
          >
            {{
              item.label
            }}
          </ul>
        </nav>

        <transition name="fade" mode="out-in">
          <div>
            <component
              :is="activeComponent"
              :subject_id="subject_id"
              :trackStand="trackStand"
              :className="className"
              :subjectName="subjectName"
              :classType="classType"
              :currentPage="currentPage"
              :itemsPerPage="itemsPerPage"
              @update:currentPage="currentPage = $event"
              @update:totalItems="updateTotalItems"
              :key="activeComponent"
            ></component>
          </div>
        </transition>
      </div>
    </div>

    <div
      v-if="
        (activeComponent === 'SummaryOfGrades' ||
          activeComponent === 'Submitted') &&
        totalPages > 0
      "
      class="flex justify-center items-center gap-5 py-5"
    >
      <img
        src="/assets/img/classes/arrow.png"
        alt="arrow"
        class="w-4 h-4 rotate-180 cursor-pointer"
        @click="prevPage"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      />
      <div class="flex gap-5 items-center justify-center">
        <div
          v-for="page in totalPages"
          :key="page"
          class="text-lg cursor-pointer"
          :class="{
            'bg-[#2C2C2C] w-8 h-8 rounded-md text-white flex items-center justify-center':
              currentPage === page,
          }"
          @click="currentPage = page"
        >
          <p>{{ page }}</p>
        </div>
      </div>
      <img
        src="/assets/img/classes/arrow.png"
        alt="arrow"
        class="w-4 h-4 cursor-pointer"
        @click="nextPage"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      />
    </div>

    <div
      v-if="
        (activeComponent === 'SummaryOfGrades' ||
          activeComponent === 'Submitted') &&
        totalPages === 0
      "
      class="flex justify-center items-center py-5"
    >
      <p class="text-lg">No data available</p>
    </div>

    <div
      v-if="activeComponent === 'SummaryOfGrades'"
      class="overflow-x-auto w-1/2 mt-5 mb-15"
    >
      <p class="text-lg font-semibold">Learner Progress and Achievement</p>
      <table
        class="w-full border-collapse rounded-b-[5px] border border-[#d9d9d9]"
        style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px 1px"
      >
        <thead class="bg-[#d9d9d9]">
          <tr>
            <th
              class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center"
            >
              Descriptors
            </th>
            <th
              class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center"
            >
              Grading Scale
            </th>
            <th
              class="px-4 py-2 text-[#464F60] text-[16px] font-semibold text-center"
            >
              Remarks
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <td class="px-4 py-2">Outstanding</td>
            <td class="px-4 py-2">90-100</td>
            <td class="px-4 py-2 font-bold text-[#23AD00]">Passed</td>
          </tr>
          <tr>
            <td class="px-4 py-2">Very Satisfactory</td>
            <td class="px-4 py-2">80-89</td>
            <td class="px-4 py-2 font-bold text-[#23AD00]">Passed</td>
          </tr>
          <tr>
            <td class="px-4 py-2">Satisfactory</td>
            <td class="px-4 py-2">80-84</td>
            <td class="px-4 py-2 font-bold text-[#23AD00]">Passed</td>
          </tr>
          <tr>
            <td class="px-4 py-2">Fairly Satisfactory</td>
            <td class="px-4 py-2">75-79</td>
            <td class="px-4 py-2 font-bold text-[#23AD00]">Passed</td>
          </tr>
          <tr>
            <td class="px-4 py-2">Did Not Meet Expectation</td>
            <td class="px-4 py-2">Below 75</td>
            <td class="px-4 py-2 font-bold text-[#FF2428]">Failed</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Debug info -->
    <div
      v-if="
        activeComponent === 'SummaryOfGrades' || activeComponent === 'Submitted'
      "
      class="text-xs text-gray-500 mt-2 text-center"
    >
      <p>
        Debug: Component: {{ activeComponent }}, Total Items: {{ totalItems }},
        Total Pages: {{ totalPages }}, Current Page: {{ currentPage }}
      </p>
    </div>

    <div class="text-xs text-gray-500 mt-2">
      Debug: classType = "{{ classType }}"
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import Classlist from './Classlist.vue';
  import Grading from '../Grading.vue';
  import Submitted from '../Submitted.vue';
  import SummaryOfGrades from '../Summary.vue';
  import { classService } from '@/service/classService';

  export default {
    props: {
      trackStand: String,
      className: String,
      subjectName: String,
      gradeLevel: [String, Number],
      subject_id: String,
      classType: String,
    },
    components: {
      Classlist,
      Grading,
      Submitted,
      SummaryOfGrades,
    },
    setup(props) {
      const route = useRoute();
      const class_id = route.params.class_id;
      const subjectInfo = ref(null);
      const maleCount = ref(0);
      const femaleCount = ref(0);
      const activeComponent = ref('Classlist');
      const currentPage = ref(1);
      const itemsPerPage = ref(10);
      const totalItems = ref(0);
      const loading = ref(true);
      const error = ref(null);

      const router = useRouter();

      const navItems = [
        { label: 'CLASS LIST', component: 'Classlist' },
        { label: 'GRADING', component: 'Grading' },
        { label: 'SUBMITTED', component: 'Submitted' },
        { label: 'SUMMARY OF GRADES', component: 'SummaryOfGrades' },
      ];

      const goBack = () => {
        router.push('/Classes');
      };

      const switchTab = (tabName) => {
        activeTab.value = tabName;

        // If switching to SUBMITTED tab, refresh the data
        if (tabName === 'SUBMITTED' && submitTabRef.value) {
          submitTabRef.value.refreshSubmittedData();
        }
      };

      const fetchClassDetails = async () => {
        try {
          loading.value = true;
          error.value = null;
          const response = await classService.getClassDetails(class_id);
          if (response.status === 'success') {
            const data = response.data;
            maleCount.value = data.maleCount;
            femaleCount.value = data.femaleCount;
            subjectInfo.value = {
              subjectName: data.subjectName,
            };
          } else {
            error.value = response.message || 'Failed to fetch class details';
          }
        } catch (err) {
          error.value =
            err.message || 'An error occurred while fetching class details';
        } finally {
          loading.value = false;
        }
      };

      const totalStudents = computed(() => {
        return maleCount.value + femaleCount.value;
      });

      const totalPages = computed(() => {
        if (totalItems.value === 0) {
          return 0;
        }
        return Math.ceil(totalItems.value / itemsPerPage.value);
      });

      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };

      const nextPage = () => {
        if (currentPage.value < totalPages.value && totalPages.value > 0) {
          currentPage.value++;
        }
      };

      const updateTotalItems = (count) => {
        totalItems.value = count;
        setTimeout(() => {
          if (totalItems.value === 0) {
            currentPage.value = 1;
          }
        }, 0);
      };

      watch(activeComponent, (newComponent) => {
        if (
          newComponent === 'SummaryOfGrades' ||
          newComponent === 'Submitted'
        ) {
          currentPage.value = 1;
        }
      });

      onMounted(() => {
        fetchClassDetails();
      });

      return {
        subjectInfo,
        maleCount,
        femaleCount,
        activeComponent,
        navItems,
        goBack,
        totalStudents,
        currentPage,
        itemsPerPage,
        totalPages,
        prevPage,
        nextPage,
        totalItems,
        updateTotalItems,
        loading,
        error,
      };
    },
  };
</script>
