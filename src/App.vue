<template>
  <div class="app-container">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue';

export default {
  components: {
    Sidebar
  }
};
</script>

<style>
.app-container {
  display: flex;
  height: 100%;
  /* Take full height of the parent */
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>