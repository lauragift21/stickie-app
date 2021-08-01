<template>
  <div class="container h-screen mt-6 mx-4">
    <board />
    <button
      title="Add StickyCard"
      class="
        absolute
        top-0
        right-0
        m-6
        w-20
        h-20
        rounded-full
        shadow-xl
        text-center text-4xl text-white
        bg-blue-500
        hover:bg-blue-700
      "
      @click="addSticky"
    >
      +
    </button>
    <guide />
  </div>
</template>

<script>
import Board from './Board'
import Guide from './Guide'

export default {
  components: {
    Board,
    Guide,
  },
}
</script>
