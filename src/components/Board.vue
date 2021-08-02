<template>
  <section>
    <v-stage
      ref="stage"
      :config="configKonva"
      @click="detectClick"
      @dragend="handleDragEnd"
    >
      <v-layer ref="layer">
        <v-group
          :config="{ draggable: true }"
          v-for="(item, index) in stickies"
          :key="index"
        >
          <v-rect
            :config="{
              x: item.x,
              y: item.y,
              width: 300,
              height: 300,
              fill: item.fill,
              shadowBlur: 2,
              opacity: 0.6,
              outerRadius: 50,
            }"
          />
          <v-text
            ref="text"
            @dblclick="editSticky"
            :config="{
              x: item.x,
              y: item.y,
              id: item.id,
              width: 300,
              height: 300,
              text: item.text,
              padding: 30,
              fontSize: 40,
            }"
          />
        </v-group>
      </v-layer>
    </v-stage>
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
        hover:bg-blue-800
      "
      @click="addSticky"
    >
      +
    </button>
  </section>
</template>

<script>
import { randomColorGenerator } from '../utils'
const width = window.innerWidth
const height = window.innerHeight
let layer
let stage

export default {
  data() {
    return {
      stickies: [],
      dragItemId: null,
      configKonva: {
        width: width,
        height: height,
      },
    }
  },
  mounted() {
    stage = this.$refs.stage.getNode()
    layer = this.$refs.layer.getNode()
    this.stickies = JSON.parse(localStorage.getItem('stickies')) || []
  },
  methods: {
    detectClick(evt) {
      const stickyId = evt.target.parent.children[1].attrs.id
      if (stickyId) {
        this.deleteSticky(stickyId)
      }
    },
    addSticky() {
      // stack stickies with a margin of 10
      const x = 800 + this.stickies.length * 10
      const y = 200 + this.stickies.length * 10

      this.stickies.push({
        id: Math.floor(Math.random().toFixed(2) * 100).toString(),
        text: '',
        x: x,
        y: y,
        fill: randomColorGenerator(),
      })
      localStorage.setItem('stickies', JSON.stringify(this.stickies))
    },
    deleteSticky(stickyId) {
      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Delete') {
          console.log('event trigged')
          this.stickies.map((item) => {
            if (item.id === stickyId) {
              this.stickies.splice(this.stickies.indexOf(item), 1)
              localStorage.setItem('stickies', JSON.stringify(this.stickies))
            }
          })
        }
      })
    },
    editSticky(evt) {
      const textNode = evt.target
      textNode.hide()
      layer.draw()

      const textPosition = textNode.getAbsolutePosition()
      // then lets find position of stage container on the page:
      const stageBox = stage.container().getBoundingClientRect()
      // now we can calculate position of textarea:
      const textAreaPosition = {
        x: textPosition.x + stageBox.y,
        y: textPosition.y + stageBox.x,
      }
      // now we can create textarea:
      // TODO: Move this out to a utils file
      const textArea = document.createElement('textarea')
      textArea.style.position = 'absolute'
      textArea.style.top = textAreaPosition.y + 'px'
      textArea.style.left = textAreaPosition.x + 'px'
      textArea.style.width = '300px'
      textArea.style.height = '300px'
      textArea.style.fontSize = '40px'
      textArea.style.border = '1px solid black'
      textArea.style.padding = '30px'
      textArea.style.marginLeft = '-8px'
      textArea.style.marginTop = '7px'
      textArea.style.zIndex = '9999'
      textArea.style.opacity = '.4'
      textArea.value = textNode.text()
      // append textarea to the stage:
      stage.container().appendChild(textArea)
      // now we can focus it:
      textArea.focus()
      // and set cursor to the end:
      textArea.setSelectionRange(textArea.value.length, textArea.value.length)
      // now we can listen for changes:
      textArea.addEventListener('keypress', (evt) => {
        // hide on enter and escape
        if (evt.key === 'Enter') {
          textNode.text(evt.target.value)
          textNode.show()
          layer.draw()
          textArea.remove()
          const newText = textNode.attrs.text
          this.stickies.map((item) => {
            if (item.id === textNode.attrs.id) {
              item.text = newText
            }
          })
          localStorage.setItem('stickies', JSON.stringify(this.stickies))
        }
      })
    },
    handleDragEnd(evt) {
      this.dragItemId = evt.target.children[1].attrs.id
      const item = this.stickies.find((i) => i.id === this.dragItemId)
      const newX = evt.target.x()
      const newY = evt.target.y()
      // dont let axis exceed screen size and dont let it go below 0
      if (item.x < width) {
        item.x = item.x + newX
      }

      if (item.y < height) {
        item.y = item.y + newY
      }
      localStorage.setItem('stickies', JSON.stringify(this.stickies))
    },
  },
}
</script>