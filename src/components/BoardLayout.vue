<template>
  <div class="container my-6 mx-4">
    <v-stage
      :config="configKonva"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      <v-layer>
        <v-rect
          v-for="(item, index) in stickies"
          :key="index"
          :config="{
            x: item.x,
            y: item.y,
            width: 300,
            height: 300,
            fill: item.fill,
            draggable: true,
            shadowBlur: 2,
            opacity: 0.6,
            outerRadius: 50,
          }"
        ></v-rect>
      </v-layer>
    </v-stage>
    <!-- <sticky-card :stickies="stickies" /> -->
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
        text-center text-5xl text-white
        bg-blue-500
        hover:bg-blue-700
      "
      @click="addSticky()"
    >
      +
    </button>
  </div>
</template>


<script>
const width = window.innerWidth
const height = window.innerHeight
export default {
  data() {
    return {
      stickies: null,
      dragItemId: null,
      configKonva: {
        width: width,
        height: height,
      },
    }
  },
  computed: {
    randomColorGenerator() {
      return () => {
        const letters = '0123456789ABCDEF'.split('')
        let colors = '#'
        for (let i = 0; i < 6; i++) {
          colors += letters[Math.floor(Math.random() * 16)]
        }
        return colors
      }
    },
  },
  async mounted() {
    await this.stickyData()
  },
  methods: {
    stickyData() {
      this.stickies = [
        {
          text: 'This is Text 1',
          fill: 'red',
          x: 80,
          y: 200,
        },
        {
          text: 'This is Text 2',
          fill: 'green',
          x: 220,
          y: 590,
        },
      ]
    },
    addSticky() {
      // Don't let the user add more than 20 stickies
      // if (this.stickies.length >= 10) {
      //   return
      // }
      // don't let the x and y axis extend over the width and height of the screen
      const x = Math.min(
        Math.max(Math.random() * (width - 300), 0),
        width - 300
      )
      const y = Math.min(
        Math.max(Math.random() * (height - 300), 0),
        height - 300
      )
      const newSticky = this.stickies.push({
        text: '',
        x: x,
        y: y,
        fill: this.randomColorGenerator(),
      })
      // save sticky to local storage for later use
      // localStorage.setItem('stickies', JSON.stringify(this.stickies))
      return newSticky
    },
    removeSticky(sticky) {
      // remove sticky from array and remove from local storage
      this.stickies.splice(sticky, 1) && localStorage.removeItem('stickies')
    },
    handleDragStart(e) {
      this.dragItemId = e.target._id
      console.log(this.dragItemId)
      // make stickie stackable
    },
    handleDragEnd() {
      this.dragItemId = null
    },
  },
}
</script>


<style></style>
