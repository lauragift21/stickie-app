<template>
   <v-stage
      ref="stage"
      :config="configKonva"
      @click="detectClick"
      @dragstart="handleDragStart"
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
</template>

<script>
import { randomColorGenerator } from '../utils'
const width = window.innerWidth
const height = window.innerHeight - 300
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
    this.stickies = JSON.parse(localStorage.getItem('stickies'))
    stage = this.$refs.stage.getNode()
    layer = this.$refs.layer.getNode()
  },
  methods: {
    detectClick(e) {
      const index = e.target.parent.children[1].attrs.id
      if (index) {
        this.deleteSticky(index)
      }
    },
    addSticky() {
      // don't let the x and y axis extend over the set width and height of the screen
      const x = Math.min(
        Math.max(Math.random() * (width - 300), 0),
        width - 300
      )
      const y = Math.min(
        Math.max(Math.random() * (height - 300), 0),
        height - 300
      )

      this.stickies.push({
        id: Math.floor(Math.random().toFixed(2) * 100).toString(),
        text: '',
        x: x,
        y: y,
        fill: randomColorGenerator(),
      })
      localStorage.setItem('stickies', JSON.stringify(this.stickies))
    },
    deleteSticky(index) {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Delete') {
          console.log('event trigged')
          this.stickies.map((item) => {
            if (item.id === index) {
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
    handleDragStart(evt) {
      // this.stickies.map((item) => {
      //   if (item.id === evt.target.children[1].attrs.id) {
      //     this.dragItemId = item.id
      //    console.log(this.dragItemId)
      //   }
      // })
      this.dragItemId = evt.target.children[1].attrs.id
      // const item = this.stickies.find((item) => item.id === this.dragItemId)
      // console.log(item)
      // const index = this.stickies.indexOf(item)
      // console.log(index)
    },
    // eslint-disable-next-line
    handleDragEnd(evt) {
      // this.dragItemId = null
    },
  },
}
</script>

<style>

</style>