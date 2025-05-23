<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    style="background-color: rgba(0, 0, 0, 0.8);"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-semibold text-[#295f98]">Lesson Plan</h3>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-red-600 text-2xl font-bold focus:outline-none cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <form @submit.prevent="accept">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="floating-label mb-4">
            <input
              type="text"
              class="input"
              v-model="localLesson.lesson_plan_no"
              placeholder=" "
              readonly
            />
            <label>Lesson Plan No.</label>
          </div>
          <div class="floating-label mb-4">
            <input
              type="text"
              class="input"
              v-model="localLesson.category"
              placeholder=" "
              readonly
            />
            <label>Category</label>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="floating-label mb-4">
            <input
              type="text"
              class="input"
              v-model="localLesson.grade_level"
              placeholder=" "
              readonly
            />
            <label>Grade Level</label>
          </div>
          <div class="floating-label mb-4">
            <input
              type="text"
              class="input"
              v-model="localLesson.section"
              placeholder=" "
              readonly
            />
            <label>Section</label>
          </div>
        </div>

        <div class="floating-label mb-12">
          <input
            type="text"
            class="input text-blue-600 underline cursor-pointer"
            :value="localLesson.link"
            placeholder=" "
            @click="openLink(localLesson.link)"
            readonly
          />
          <label>Lesson Plan Link</label>
        </div>

        <div class="relative mb-2">
          <h3 class="text-xl font-semibold mb-4 text-[#295f98]">Comment</h3>
          <textarea
            id="comment"
            v-model="comment"
            rows="10"
            placeholder="Add comments here..."
            class="shadow appearance-none border border-[#295f98] rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="reject"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          >
            Reject
          </button>
          <button
            type="submit"
            class="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors duration-200 cursor-pointer"
          >
            Accept
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { approveLessonPlan, rejectLessonPlan } from '@/service/superadminService';

export default {
  props: {
    lessonPlanData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localLesson: {
        lesson_plan_no: "",
        category: "",
        grade_level: "",
        section: "",
        link: "",
        LessonPlan_ID: null,  // store id for API calls
      },
      comment: "",
      isLoading: false,
    };
  },
  watch: {
    lessonPlanData: {
      immediate: true,
      handler(newVal) {
        this.localLesson = {
          lesson_plan_no: newVal.lesson_plan_no || "",
          category: newVal.category || "",
          grade_level: newVal.grade_level || "",
          section: newVal.section || "",
          link: newVal.link || "",
          LessonPlan_ID: newVal.LessonPlan_ID || null,
        };
        this.comment = newVal.comments || "";
      },
    },
  },
  methods: {
    openLink(url) {
      if (url) window.open(url, "_blank");
    },
    async reject() {
      if (!this.localLesson.LessonPlan_ID) return;

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to reject this lesson plan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, reject it!",
      });

      if (result.isConfirmed) {
        this.isLoading = true;
        try {
          await rejectLessonPlan(this.localLesson.LessonPlan_ID);
          await Swal.fire("Rejected!", "The lesson plan has been rejected.", "error");
          window.location.reload();
          this.$emit("close");
        } catch (error) {
          Swal.fire("Error", error.message || "Failed to reject lesson plan", "error");
        } finally {
          this.isLoading = false;
        }
      }
    },

    async accept() {
      if (!this.localLesson.LessonPlan_ID) return;

      const result = await Swal.fire({
        title: "Accept this lesson plan?",
        text: "You are about to accept this lesson plan.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, accept it!",
      });

      if (result.isConfirmed) {
        this.isLoading = true;
        try {
          await approveLessonPlan(this.localLesson.LessonPlan_ID);
          await Swal.fire("Accepted!", "The lesson plan has been accepted.", "success");
          window.location.reload();
          this.$emit("close");
        } catch (error) {
          Swal.fire("Error", error.message || "Failed to accept lesson plan", "error");
        } finally {
          this.isLoading = false;
        }
      }
    },

  },
};
</script>


<style scoped>
.floating-label {
  position: relative;
  display: flex;
  flex-direction: column;
  
}

.floating-label .input {
  padding: 0.75rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  background: white;
}

.floating-label label {
  position: absolute;
  left: 0.5rem;
  top: 0.75rem;
  background: white;
  color: #888;
  padding: 0 0.25rem;
  transition: all 0.2s ease;
  pointer-events: none;
}

.floating-label input {
  transform: translateY(1.5rem);
  font-size: 1rem;
}

</style>
