<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <dropdown class="flex" :showCurriculum="true" :showYear="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from '../components/dropdown.vue'; // Make sure to use the component properly

// You can add reactive properties or other Composition API logic here
const title = ref('Dashboard');
</script>
