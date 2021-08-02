<template>
  <div class="container mx-4">
    <Board />
    <Guide />
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
