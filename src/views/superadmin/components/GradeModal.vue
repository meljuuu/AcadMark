<template>
    <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0, 0, 0, 0.2);">
        <div class="bg-white rounded-lg w-full max-w-3xl p-6 shadow-lg relative">
        <!-- Close Button -->
        <button @click="$emit('close')" class="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-3xl cursor-pointer">&times;</button>

        <!-- STUDENT INFO -->
        <h2 class="text-blue-800 font-semibold text-xl mb-4" style="color: #295F98;">STUDENT INFO</h2>
        <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
                <div class="font-semibold" style="color: #295F98;">Student Name</div>
                <div class="text-lg">Bueno, Ryan Joshua E.</div>
            </div>
            <div>
                <div class="font-semibold" style="color: #295F98;">SEX</div>
                <div class="text-lg">Male</div>
            </div>
            <div>
                <div class="font-semibold" style="color: #295F98;">Birthdate</div>
                <div class="text-lg">5/10/2003</div>
            </div>
            <div>
                <div class="font-semibold" style="color: #295F98;">LRN</div>
                <div class="text-lg">905190549180451</div>
            </div>
            <div>
                <div class="font-semibold" style="color: #295F98;">CURRICULUM</div>
                <div class="text-lg">SHS</div>
            </div>
            <div>
                <div class="font-semibold" style="color: #295F98;">ACADEMIC TRACK</div>
                <div class="text-lg">TVL</div>
            </div>
        </div>

        <!-- GRADING -->
        <h2 class="text-blue-800 font-semibold text-xl mb-4" style="color: #295F98;">GRADING</h2>
        <div class="flex items-center gap-4 mb-6">
            <div>
                <label class="block text-sm font-semibold mb-1">Quarter Grade</label>
                <input type="number" class="border px-2 py-1 w-24" v-model="grade" readonly/>
            </div>
            <div>
                <label class="block text-sm font-semibold mb-1">Remarks</label>
                <div :class="remarkClass" class="px-3 py-1 rounded border text-center w-24">
                {{ remark }}
            </div>
            </div>
        </div>

        <!-- COMMENT -->
        <h2 class="text-blue-800 font-semibold text-xl mb-4" style="color: #295F98;">COMMENT</h2>
        <textarea
            v-model="comment"
            rows="4"
            class="w-full border rounded px-3 py-2 mb-4"
            placeholder="Enter comment..."
        ></textarea>

        <!-- ACTION BUTTONS -->
        <div class="flex justify-end space-x-4">
            <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" @click="reject">Reject</button>
            <button class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded" @click="accept">Accept</button>
        </div>
        </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      grade: 80,
      comment: '',
    };
  },
  methods: {
    reject() {
      if (!this.comment || this.comment.trim() === '') {
        Swal.fire({
          icon: 'warning',
          title: 'Comment Required',
          text: 'Please provide a comment before rejecting.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D30000'
        });
        return;
      }
      console.log('Rejected with comment:', this.comment);
      this.$emit('close');
    },
    accept() {
      console.log('Accepted with grade:', this.grade, 'Comment:', this.comment);
      this.$emit('close');
    }
  }
};
</script>
