<template>
    <div class="w-full">
        <div class="flex items-center space-x-6 mb-7">
            <h1 class="text-5xl font-bold">Lesson Plan Review</h1>
        </div>
        <div class="flex justify-between gap-4 w-full mb-6">
            <div v-for="(card, index) in cards" :key="index" class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-1/4 flex items-center space-x-4">
                <i :class="card.icon" class="text-gray-500 text-4xl"></i>
                <div class="text-right ml-auto">
                    <h2 class="text-xl font-semibold text-gray-700 mb-2">
                    {{ card.label }}
                    </h2>
                    <p class="text-3xl font-semibold">{{ card.value }}</p>
                </div>
            </div>
        </div>
        <div>
            
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          label: "Total Lesson Plans",
          value: 120,
          icon: "fas fa-book"
        },
        {
          label: "Checked Plans",
          value: 85,
          icon: "fas fa-check-circle"
        },
        {
          label: "Pending Review",
          value: 25,
          icon: "fas fa-hourglass-half"
        },
        {
          label: "Need Revision",
          value: 10,
          icon: "fas fa-exclamation-triangle"
        }
      ]
    };
  }
};
</script>
