<template>
  <div class="container h-screen mt-6 mx-4">
    <board />
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
