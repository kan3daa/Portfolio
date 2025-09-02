<script setup lang="ts">
import { ref, computed } from 'vue'
import HeaderTime from "./header-time.vue"

const step = ref(0)
const sizes = [
  { width: 435, height: 100, marginTop: -3, class: 'small' }
]
const currentClass = computed(() => sizes[step.value].class)
</script>

<template>
  <div class="svg-wrapper">
    <HeaderTime class="comp-time" :positionClass="currentClass"/>
    <svg
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
  top: -3.1em;
}
</style>
