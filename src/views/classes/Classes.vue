<template>

  <div>
    <h1 class="title">Classes</h1>

    <div class="flex flex-col gap-5">
      <div class="flex justify-between">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div class="flex justify-between">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div class="flex justify-between">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div class="flex justify-between">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/card.vue"; // Capitalize 'Card' to match the component
export default {
  components: {
    Card // Register the component
  }
};
</script>
