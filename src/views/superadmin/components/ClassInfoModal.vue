<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-[100] flex items-center justify-center"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }"
    @click.self="$emit('update:modelValue', false)"
  >
    <div class="bg-white p-6 rounded-md w-[1000px] shadow-lg max-w-full">
      <form @submit.prevent="handleSubmit" class="space-y-4 p-2">
        <h2 class="text-xl text-[#295f98] font-semibold mb-6">Class Info</h2>

        <div class="grid grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-4">
            <div>
              <h1 class="font-semibold text-[#295f98]">Class Adviser</h1>
              <p class="text-[1.5rem] text-black-700">Mr. John Doe</p>
            </div>
            <div>
              <h1 class="font-semibold text-[#295f98]">Curriculum</h1>
              <p class="text-[1.5rem] text-black-700">STEM, HUMSS</p>
            </div>
            <div>
              <h1 class="font-semibold text-[#295f98]">Class Section</h1>
              <p class="text-[1.5rem] text-black-700">
                Section A, Section B
              </p>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div>
              <h1 class="font-semibold text-[#295f98]">Grade Level</h1>
              <p class="text-[1.5rem] text-black-700">Grade 11</p>
            </div>
            <div>
              <h1 class="font-semibold text-[#295f98]">Track</h1>
              <p class="text-[1.5rem] text-black-700"> Academic Track</p>
            </div>
            <div>
              <h1 class="font-semibold text-[#295f98]">
                Recently Added Student
              </h1>
              <p class="text-[1.5rem] text-black-700">Jane Smith</p>
            </div>
          </div>
        </div>

        <!-- Section Separator -->
        <h2 class="text-xl text-[#295f98] font-semibold mt-4">Comments</h2>
        <textarea
          rows="5"
          placeholder="Enter comments or additional notes here..."
          class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#295f98]"
        ></textarea>

        <!-- Buttons -->
        <div class="button">
          <button type="button" @click="confirmReject" class="red">
            Reject
          </button>
          <button type="button" @click="confirmAccept" class="green">
            Accept
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';

  const props = defineProps({
    modelValue: Boolean,
  });

  const emit = defineEmits(['update:modelValue', 'submit']);

  function confirmReject() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this class?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        emit('update:modelValue', false);
        Swal.fire('Rejected!', 'The class has been rejected.', 'success');
      }
    });
  }

  function confirmAccept() {
    Swal.fire({
      title: 'Confirm Acceptance',
      text: 'Do you want to accept this class?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0c5a48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, accept it!',
    }).then((result) => {
      if (result.isConfirmed) {
        emit('submit');
        Swal.fire('Accepted!', 'The class has been accepted.', 'success');
      }
    });
  }
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
    appearance: none;
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

  .floating-label input:focus + label,
  .floating-label select:focus + label,
  .floating-label.filled label {
    transform: translateY(-1.5rem);
    font-size: 0.75rem;
    color: #2563eb;
  }

  .custom-arrow {
    position: absolute;
    top: 50%;
    right: 0.75rem;
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23888888" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transform: translateY(-50%);
    transition: background-image 0.2s ease;
  }

  .floating-label select:focus + label + .custom-arrow {
    background-image: url('data:image/svg+xml;utf8,<svg fill="%232563eb" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  }

  .button {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 15px;
  }

  .red,
  .green {
    padding: 5px 30px;
    align-items: center;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    display: inline-flex;
    justify-content: center;
    user-select: none;
    transition: background-color 0.3s ease;
  }

  .red {
    background-color: #d30000;
  }
  .red:hover {
    background-color: #d95353;
  }

  .green {
    background-color: #0c5a48;
  }
  .green:hover {
    background-color: #0a4b3b;
  }
</style>
