<script setup lang="ts">
import { useSpring } from 'vue-use-spring'
import { normalizeProps, useDrag } from '@use-gesture/vue'

const position = useSpring({ x: 0, y: 0 })

const bind = useDrag(({ down, movement: [mx, my] }) => {
  position.x = down ? mx : 0
  position.y = down ? my : 0
})
</script>

<template>
  <div
    className="drag"
    v-bind="normalizeProps(bind())"
    :style="{
      touchAction: 'none',
      transform: `translate(${position.x}px, ${position.y}px)`
    }"
  />
</template>

<style>
.drag {
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 8px;
  background-color: hotpink;
  cursor: grab;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  font-size: 10px;
}
.drag:focus {
  border: 2px solid red;
  cursor: grabbing;
}
</style>
