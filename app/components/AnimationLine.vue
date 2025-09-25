<template>
  <div class="overflow-x-clip absolute left-0 w-full h-auto pointer-events-none -z-10" ref="containerRef">
    <svg class="wave" width="2305" height="1420" viewBox="0 0 2305 1420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path ref="wavePathRef" class="wave-path"
        d="M0.544312 30.5231C354.321 30.5231 809.022 316.137 823.675 718.029C841.99 1220.39 308.022 1371.95 266.666 1088.6C225.31 805.255 621.912 643.75 1116.41 735.647C1422.69 792.566 1541.95 980.944 1575.83 1040.57C1622.88 1123.38 1696.44 1165.25 1845.52 1105.62C2000.88 1043.48 2157.22 1090.72 2164.97 1280.32C2168.02 1354.92 2199.81 1389.47 2304.04 1389.47"
        stroke="url(#paint0_linear_29_1196)" stroke-width="60" />
      <defs>
        <linearGradient id="paint0_linear_29_1196" x1="0.544302" y1="80.6013" x2="2274.84" y2="1356.06"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#00B08B" />
          <stop offset="1" stop-color="#80DEC8" />
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
      start: "top bottom", // Начинаем когда верх контейнера достигает низа экрана
      end: "bottom center", // Заканчиваем когда низ контейнера в центре экрана
      scrub: 1
    }
  })
}
</script>

<style scoped>
.wave {
  width: 100%;
  height: auto;
  width: calc(100% + 14.4px); /* 0.3 * 48px */
  margin-left: calc(-14.4px); /* -0.3 * 48px */
}

.wave-path {
  stroke-linecap: round;
  stroke-linejoin: round;
  /* Начальные значения будут установлены через GSAP */
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .wave {
    width: calc(100% + 480px); /* 10 * 48px */
    margin-left: calc(-14.4px); /* -0.3 * 48px */
  }
}
</style>
