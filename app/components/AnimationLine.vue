<template>
  <div class="overflow-x-clip absolute top-280 left-0 w-full h-auto pointer-events-none -z-10 scale-150" ref="containerRef">
    <svg class="wave" width="4392" height="10759" viewBox="0 0 4392 10759" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path ref="wavePathRef" class="wave-path"
        d="M3463.5 656.501C3195.33 609.334 1996.5 326.5 2180 71.9999C2357.37 -174 3713 855 3264 1178C3031.02 1345.6 2508.01 962.806 1576 886C854 826.5 -0.768311 928.471 291.5 1546C668.001 2341.5 1700.42 2475.16 3089 2552.5C4660 2640 4031 3775 3264 4006.5C2697.62 4177.44 1479.81 3838.59 1670 3492.5C1878 3114 2948.99 4019.23 2999 4733.51C3034.5 5240.51 3461.7 5372.28 3828.5 5395.01C4692 5448.51 4281.5 6274.51 4093.5 6524.01C3685.63 7065.31 1167 9226.99 321.502 8704.99C-221.838 8369.53 267.001 7353.01 1167 7827.01C2067 8301.01 2160.5 9205.49 1680.5 9765.49C1206.09 10319 519 10580.5 34 10724.5"
        stroke="url(#paint0_linear_4359_47401)" stroke-width="68" stroke-linecap="round" stroke-linejoin="round" />
      <defs>
        <linearGradient id="paint0_linear_4359_47401" x1="700.999" y1="34.3873" x2="7837.21" y2="3446.8"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#0AAE6A" />
          <stop offset="1" stop-color="#15D2CB" />
        </linearGradient>
      </defs>
    </svg>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

// Refs для DOM элементов
const containerRef = ref(null)
const wavePathRef = ref(null)

// Переменная для хранения ScrollTrigger
let scrollTriggerInstance = null

onMounted(async () => {
  // Динамически импортируем ScrollTrigger только на клиенте
  if (import.meta.client) {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)
    
    initAnimation()
  }
})

onUnmounted(() => {
  // Очищаем ScrollTrigger при уничтожении компонента
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})

const initAnimation = () => {
  const wavePath = wavePathRef.value
  const container = containerRef.value
  
  if (!wavePath || !container) {
    console.warn('AnimationLine: DOM элементы не найдены')
    return
  }
  
  // Получаем длину SVG пути
  const pathLength = wavePath.getTotalLength()
  
  // Полностью скрываем линию изначально
  gsap.set(wavePath, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
  })
  
  // Создаем анимацию только при скролле
  scrollTriggerInstance = gsap.to(wavePath, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top right", // Начинаем когда верх контейнера достигает низа экрана
      end: "bottom left", // Заканчиваем когда низ контейнера в центре экрана
      scrub: 0
    }
  })
}
</script>

<style scoped>
.wave {
  width: 120%;
  height: auto;
  width: calc(100% + 110px);
  /* 0.3 * 48px */
  margin-left: calc(110px);
  /* -0.3 * 48px */
}

.wave-path {
  stroke-linecap: round;
  stroke-linejoin: round;
  /* Начальные значения будут установлены через GSAP */
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .wave {
    width: calc(100% + 110px);
    /* 10 * 48px */
    margin-left: calc(110px);
    /* -0.3 * 48px */
  }
}
</style>