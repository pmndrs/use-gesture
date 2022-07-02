<script lang="js">
  import { spring } from 'svelte/motion'
  import { drag } from '@use-gesture/svelte'

  let coords = spring({ x: 0, y: 0, scale: 1 })
  function handler({ detail }) {
    const {
      active,
      movement: [mx, my]
    } = detail
    coords.set({
      x: active ? mx : 0,
      y: active ? my : 0,
      scale: active ? 1.2 : 1
    })
  }
</script>

<div class="flex fill center">
  <div
    class="drag"
    use:drag
    on:drag={handler}
    tabindex="-1"
    style:transform="translate3d({$coords.x}px, {$coords.y}px, 0) scale({$coords.scale})"
  />
</div>

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
