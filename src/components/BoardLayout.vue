<template>
  <div>
    <p>Create a New Sticky Button</p>
    <p>Show all the stickies anywhere on the screen</p>
    <sticky-card />
  </div>
</template>


<script>
import StickyCard from './StickyCard.vue'

export default {
  components: {
    StickyCard,
  },
  data() {
    return {
      sticky: null,
    }
  },
}
</script>


<style></style>
