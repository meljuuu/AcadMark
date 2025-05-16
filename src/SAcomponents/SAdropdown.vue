<!-- SAdropdown.vue -->
<template>
    <div class="dropdown-container">
      <select
        v-if="showAccess"
        v-model="selectedAccess"
        class="filter-dropdown"
        @change="$emit('update:selectedAccess', selectedAccess)"
      >
        <option disabled value="">Access</option>
        <option v-for="access in accesss" :key="access" :value="access">
          {{ access }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from "vue";
  
  defineProps({
    showAccess: { type: Boolean, default: false },
  });
  
  const selectedAccess = ref("");
  const accesss = ["Teacher", "Admin", "Record"];
  </script>
  
  
  <style scoped>
  .dropdown-container {
    display: flex;
    gap: 10px;
  }
  
  .filter-dropdown {
    padding: 15px 20px;
    width: 210px;
    border: 1px solid #295f98;
    border-radius: 5px;
    font-size: 14px;
    background: #fff;
    font-weight: bold;
    color: #295f98;
    cursor: pointer;
    appearance: none;
    position: relative;
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 30px;
    transition: all 0.3s ease-in-out;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M14 7l-5 5 5 5V7z'/></svg>");
  }
  
  .filter-dropdown:focus {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' fill='%23295f98'><path d='M7 10l5 5 5-5H7z'/></svg>");
  }
  </style>
  