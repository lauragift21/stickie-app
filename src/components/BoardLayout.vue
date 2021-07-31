<template>
  <div class="container my-6 mx-4">
    <v-stage
      ref="stage"
      :config="configKonva"
      @dragstart="handleDragStart"
      @dragmove="handleDragMove"
      @dragend="handleDragEnd"
    >
      <v-layer ref="layer">
        <v-group
          :config="{ draggable: true }"
          v-for="(item, index) in stickies"
          :key="index"
          @click="deleteSticky"
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
        text-center text-5xl text-white
        bg-blue-500
        hover:bg-blue-700
      "
      @click="addSticky"
    >
      +
    </button>
  </div>
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
      lastPointerPosition: {
        x: 0,
        y: 0,
      },
    }
  },
  async mounted() {
    this.stickies = JSON.parse(localStorage.getItem('stickies'))
    stage = this.$refs.stage.getNode()
    layer = this.$refs.layer.getNode()
  },
  methods: {
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
        id: Math.floor(Math.random().toFixed(2) * 100),
        text: '',
        x: x,
        y: y,
        fill: randomColorGenerator(),
      })
      localStorage.setItem('stickies', JSON.stringify(this.stickies))
    },
    deleteSticky(evt) {
      console.log(evt)
      // this.stickies.splice(index, 1)
      // localStorage.setItem('stickies', JSON.stringify(this.stickies))
    },
    editSticky(e) {
      const textNode = e.target
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
      textArea.addEventListener('keypress', (e) => {
        // hide on enter and escape
        if (e.keyCode === 13) {
          textNode.text(e.target.value)
          // TODO: Update the text in the sticky
          textNode.show()
          layer.draw()
          textArea.remove()
        }
      })
      // function handleOutsideClick(e) {
      //   if (e.target !== textArea) {
      //     textNode.text(e.target.value)
      //     textNode.show()
      //     layer.draw()
      //     textArea.remove()
      //   }
      // }
      // setTimeout(() => {
      //   window.addEventListener('click', handleOutsideClick)
      // })
    },
    handleDragStart(e) {
      console.log('START:', e)
      // make stickie stackable
      // this.dragItemId = e.target._dragItemId;
      // console.log(e, this.dragItemId)
      // move current element to the top:
      // const item = this.list.find(i => i.id === this.dragItemId);
      // const index = this.list.indexOf(item);
      // this.list.splice(index, 1);
      // this.list.push(item);
    },
    handleDragMove(e) {
      // this.dragItemId = e.target._id
      console.log(e)
      // const getCurrentXPosition = e.target.attrs.x
      // const getCurrentYPosition = e.target.attrs.y
      // console.log(getCurrentXPosition)
      // console.log(getCurrentYPosition)

      // use eventlistener to get the current selected item x and y position of the draggable
      // and save it to the local storage
      // const dragFunction = e;
    },
    handleDragEnd(e) {
      const { clientX: x, clientY: y } = e.evt
      const index = e.target.index
      console.log(e)
      console.log(x, y)
      ;(this.stickies[index].x = x), (this.stickies[index].y = y)
      console.log(this.stickies)
      localStorage.setItem('stickies', JSON.stringify(this.stickies))
    },
  },
}
</script>


<style></style>
