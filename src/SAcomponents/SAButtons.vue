<template>
  <div>
    <button @click="$emit('open-modal')" class="buttons">Add Faculty</button>
  </div>
</template>

<script>
export default {
  name: "Buttons",
};
</script>

<style scoped>
.buttons {
  background: #295f98;
  color: #fff;
  border: none;
  padding: 15px 20px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.buttons:hover {
  background: #1f4b79;
}
</style>

  