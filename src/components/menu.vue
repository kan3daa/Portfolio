<script setup lang="ts">
import { ref, watch, onMounted, computed} from 'vue'
import HeaderTime from "./header-time.vue"
import { gsap } from 'gsap'

const step = ref(0)

const svgRef = ref<SVGSVGElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const currentClass = computed(() => sizes[step.value].class)

const sizes = [
  { width: 435, height: 100, marginTop: -3, class: 'small' },
  { width: 540, height: 165, marginTop: -4.4, class: 'medium' },
  { width: 705, height: 230, marginTop: -5.3, class: 'large' }
]

const handleClick = () => {
  step.value = (step.value + 1) % sizes.length
}

watch(step, (newVal) => {
  const size = sizes[newVal]
  if (svgRef.value && wrapperRef.value) {
    gsap.to(svgRef.value, {
      duration: 0.6,
      width: size.width,
      height: size.height,
      ease: 'power2.out'
    })
    gsap.to(wrapperRef.value, {
      duration: 0.6,
      marginTop: `${size.marginTop}em`,
      ease: 'power2.out'
    })
  }
})
onMounted(() => {
  const size = sizes[step.value]
  if (svgRef.value && wrapperRef.value) {
    gsap.set(svgRef.value, {
      width: size.width,
      height: size.height
    })
    gsap.set(wrapperRef.value, {
      marginTop: `${size.marginTop}em`
    })
  }
})


</script>

<template>
  <div @click="handleClick" class="svg-wrapper" ref="wrapperRef">
    <div class="svgHref" v-show="currentClass === 'medium' || currentClass === 'large'">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/></svg>
    </div>
    <HeaderTime class="comp-time" :positionClass="currentClass"/>
    <svg
        ref="svgRef"
        :width="sizes[step].width"
        :height="sizes[step].height"
        viewBox="0 0 433 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dddd_36_4)">
        <path d="M15.0866 0.00856335H14C14.3664 -0.00293674 14.7288 -0.00277186 15.0866 0.00856335H419C414.668 0.0575746 405.702 1.77297 405.702 10.1539V23.6075V37.061C405.702 43 401.47 49.7059 373.966 50H218.465H62.9627C52.5 50 39.4814 49.4119 33.9478 45.8831C30.2587 43.5305 27.2985 41.5 27.2985 34.5L27.2985 22.1371V9.71279C27.2985 4.67833 22.049 0.229109 15.0866 0.00856335Z"
              fill="#151517"
        />
      </g>
      <defs>
        <filter id="filter0_dddd_36_4"
                x="0"
                y="-3"
                width="433"
                height="101"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha"
                         type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0"
          />
          <feBlend mode="normal"
                   in2="BackgroundImageFix"
                   result="effect1_dropShadow_36_4"
          />
          <feColorMatrix in="SourceAlpha"
                         type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha"
          />
          <feOffset dy="9" />
          <feGaussianBlur stdDeviation="4.5" />
          <feColorMatrix type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.19 0"
          />
          <feBlend mode="normal"
                   in2="effect1_dropShadow_36_4"
                   result="effect2_dropShadow_36_4"
          />
          <feColorMatrix in="SourceAlpha"
                         type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha"
          />
          <feOffset dy="19" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
          />
          <feBlend mode="normal"
                   in2="effect2_dropShadow_36_4"
                   result="effect3_dropShadow_36_4"
          />
          <feColorMatrix in="SourceAlpha"
                         type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha"
          />
          <feOffset dy="34" />
          <feGaussianBlur stdDeviation="7" />
          <feColorMatrix type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
          />
          <feBlend mode="normal"
                   in2="effect3_dropShadow_36_4"
                   result="effect4_dropShadow_36_4"
          />
          <feBlend mode="normal"
                   in="SourceGraphic"
                   in2="effect4_dropShadow_36_4"
                   result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style>
.svg-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.svg-wrapper svg {
  cursor: pointer;
}

.svgHref {
  position: absolute;
  
}

</style>