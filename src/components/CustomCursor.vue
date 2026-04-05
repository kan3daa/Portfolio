<template>
    <div class="cursor-ring" :class="{ hovered }" :style="{ left: x + 'px', top: y + 'px' }" />
    <div class="cursor-dot" :style="{ left: dotX + 'px', top: dotY + 'px' }" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)
const dotX = ref(0)
const dotY = ref(0)
const hovered = ref(false)

const CLICKABLE = 'a, button, [role="button"], input, label, select, textarea, [onclick], [tabindex]'

let animFrame

function lerp(a, b, t) {
  return a + (b - a) * t
}

function animate() {
    dotX.value = lerp(dotX.value, x.value, 0.10)
    dotY.value = lerp(dotY.value, y.value, 0.10)
    animFrame = requestAnimationFrame(animate)
}

function onMouseMove(e) {
    x.value = e.clientX
    y.value = e.clientY

    const el = document.elementFromPoint(e.clientX, e.clientY)
    hovered.value = !!el?.closest(CLICKABLE)
}

onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    animate()
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
.cursor-ring {
    position: fixed;
    width: 39px;
    height: 39px;
    border: 2px solid white;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
    z-index: 9999;
    transition: width 0.2s ease, height 0.2s ease;
}

.cursor-ring.hovered {
    width: 60px;
    height: 60px;
}

.cursor-dot {
    position: fixed;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
    z-index: 9999;
}
</style>
