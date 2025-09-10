import { gsap } from 'gsap'

export default defineNuxtPlugin(() => {
  // Настройки по умолчанию для GSAP
  gsap.defaults({
    duration: 0.6,
    ease: "power2.out"
  })

  return {
    provide: {
      gsap
    }
  }
})
