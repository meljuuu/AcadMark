<template>
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0, 0, 0, 0.8);">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
      <h3 class="text-2xl font-semibold mb-4 text-[#295f98]">Lesson Plan</h3>
      <form @submit.prevent="accept">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="floating-label mb-4">
            <input
                type="text"
                class="input"
                v-model="lessonPlan.lessonPlanNo"
                placeholder=" "
                readonly
            />
            <label>Lesson Plan No.</label>
          </div>
          <div class="floating-label mb-4">
            <input
                type="text"
                class="input"
                v-model="lessonPlan.category"
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
                v-model="lessonPlan.gradeLevel"
                placeholder=" "
                readonly
            />
            <label>Grade Level</label>
          </div>
          <div class="floating-label mb-4">
            <input
                type="text"
                class="input"
                v-model="lessonPlan.section"
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
                v-model="lessonPlan.lessonPlanLink"
                placeholder=" "
                @click="openLink(lessonPlan.lessonPlanLink)"
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
            @click="accept"
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
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      lessonPlan: {
        lessonPlanNo: '12345',
        category: 'Mathematics',
        gradeLevel: 'Grade 7',
        section: 'Section A',
        lessonPlanLink: 'https://example.com/lessonplan12345'
      },
      comment: '',
    };
  },
  methods: {
  reject() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to reject this lesson plan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Rejected with comment:', this.comment);
        Swal.fire('Rejected!', 'The lesson plan has been rejected.', 'error');
        this.$emit('close');
      }
    });
  },
  accept() {
    Swal.fire({
      title: 'Accept this lesson plan?',
      text: 'You are about to accept this lesson plan.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, accept it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Accepted with comment:', this.comment);
        Swal.fire('Accepted!', 'The lesson plan has been accepted.', 'success');
        this.$emit('close');
      }
    });
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
