<template>
  <section class="container mx-auto grid grid-cols-5">
    <div v-for="(sticky, index) in stickies" :key="index">
     <div class="w-60 h-60 mx-4 rounded shadow-xl" :class="[sticky.backgroundColor, sticky.color]">
      <p class="text-center text-3xl px-6 py-16">{{ sticky.text }}</p>
      <!-- add delete icon to card -->
     </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    stickies: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style scoped>
</style>