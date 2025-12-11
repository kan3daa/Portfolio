<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { defineProps } from 'vue'

  defineProps<{
    positionClass: string
  }>()

  const time = ref('')

  function updateTime() {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }
    time.value = new Intl.DateTimeFormat('fr-FR', options).format(now)
  }

  let intervalId: number | undefined

  onMounted(() => {
    updateTime()
    intervalId = setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId)
    }
  })
  </script>

  <template>
    <div class="top-header-time">
      <p :class="positionClass">Paris. {{ time }}</p>
    </div>
  </template>

  <style scoped>
  .top-header-time {
    position: absolute;
    color: #f1f1f1;
  }

  .small {
    margin-top: -2em;
    font-size: 1.3em;
    font-weight: 300;
    position: relative;
  }
  </style>