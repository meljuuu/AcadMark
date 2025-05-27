<template>
  <div v-if="isModalDropOpen" class="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-[5%]">
    <div class="bg-white p-10 gap-5 max-h-[90vh] w-[700px] overflow-y-auto rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <p class="font-semibold text-2xl text-blue">REQUEST FOR DROP-OUT</p>
      </div>

      <form class="flex flex-col gap-5" @submit.prevent="dropOutStudent">
        <!-- Info Fields -->
        <div class="grid grid-cols-2 gap-4">
          <div class="floating-label">
            <input type="text" class="input" placeholder=" " :value="dropOutFormData.Grade_Level" readonly />
            <label>Grade Level</label>
          </div>
          <div class="floating-label">
            <input type="text" class="input" placeholder=" " :value="dropOutFormData.Curriculum" readonly />
            <label>Curriculum</label>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="floating-label">
            <input type="text" class="input" placeholder=" " :value="dropOutFormData.Track" readonly />
            <label>Track</label>
          </div>
          <div class="floating-label">
            <input type="text" class="input" placeholder=" " :value="dropOutFormData.LRN" readonly />
            <label>LRN</label>
          </div>
        </div>

        <div class="floating-label">
          <input type="text" class="input" placeholder=" " :value="dropOutFormData.FullName" readonly />
          <label>Full Name</label>
        </div>

        <!-- Reason -->
        <div class="flex flex-col gap-2">
          <label class="text-blue font-semibold text-2xl" for="comment">REASON FOR DROP-OUT</label>
          <textarea
            rows="5"
            class="border border-gray-300 rounded-lg p-2"
            placeholder="Comment the reason here"
            v-model="dropOutFormData.drop_out_comments"
            required
          ></textarea>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 mt-5">
          <button
            type="button"
            @click="closeDropModal"
            class="bg-[#656464] text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-green text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isModalDropOpen: Boolean,
  dropOutFormData: Object
})

const emit = defineEmits(['close', 'submit'])

const closeDropModal = () => {
  emit('close')
}

const dropOutStudent = () => {
  emit('submit', props.dropOutFormData)
}
</script>

<style scoped>
.input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.375rem;
  background: white;
}
.floating-label {
  position: relative;
  display: flex;
  flex-direction: column;
}
.floating-label label {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #666;
}
</style>
