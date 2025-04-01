<template>
    <div class="search-container border-[#E0E0E0] border flex items-center w-[500px] rounded-[8px] mr-5" style="box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
               box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;">
        <img src="/assets/img/classes/search.png" alt="search" class="mx-2 w-7 h-7" />
        <input type="text" class="border-none outline-none p-2 placeholder-[#6C6C6C] w-full text-sm font-semibold h-10"
            placeholder="Search..." v-model="searchQuery" />
    </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';

// Create a modelValue prop for v-model binding
const emit = defineEmits();
const searchQuery = ref('');

// Watch for changes in searchQuery and emit the update to the parent
watch(searchQuery, (newQuery) => {
    emit('update:modelValue', newQuery);
});
</script>

<style scoped>
.search-container {
    width: 500px;
    max-width: 100%;
}

@media (max-width: 768px) {
    .search-container {
        width: 80%;
    }
}

@media (max-width: 480px) {
    .search-container {
        width: 70%;
    }
}
</style>