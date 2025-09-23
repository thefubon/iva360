<template>
  <div class="min-h-screen relative">
    <div class="max-w-6xl mx-auto px-8 py-8 md:px-16 md:py-16">
      <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-4 text-gray-900">
        Анимация линии
      </h1>
      <p class="text-lg text-center text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
        Демонстрация анимированной SVG-линии, которая появляется только при прокрутке страницы
      </p>

      <!-- Анимированная линия -->
      <AnimationLine class="mt-[100vh]" />

      <!-- Контент для демонстрации скролла -->
      <div class="mt-32">
        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 1
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Прокрутите страницу вниз, чтобы увидеть, как анимированная линия постепенно появляется.
            Анимация привязана к прогрессу прокрутки страницы.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 2
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Линия использует SVG path с градиентной заливкой и анимируется с помощью GSAP ScrollTrigger.
            Эффект создается изменением stroke-dashoffset при прокрутке.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 3
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Компонент полностью адаптивен и работает на всех устройствах.
            Градиент создает красивый переход от синего к голубому цвета.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 4
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Завершающая секция демонстрирует полную анимацию линии.
            Теперь линия должна быть полностью нарисована.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 1
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Прокрутите страницу вниз, чтобы увидеть, как анимированная линия постепенно появляется.
            Анимация привязана к прогрессу прокрутки страницы.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 2
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Линия использует SVG path с градиентной заливкой и анимируется с помощью GSAP ScrollTrigger.
            Эффект создается изменением stroke-dashoffset при прокрутке.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 3
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Компонент полностью адаптивен и работает на всех устройствах.
            Градиент создает красивый переход от синего к голубому цвета.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 4
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Завершающая секция демонстрирует полную анимацию линии.
            Теперь линия должна быть полностью нарисована.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 1
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Прокрутите страницу вниз, чтобы увидеть, как анимированная линия постепенно появляется.
            Анимация привязана к прогрессу прокрутки страницы.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 2
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Линия использует SVG path с градиентной заливкой и анимируется с помощью GSAP ScrollTrigger.
            Эффект создается изменением stroke-dashoffset при прокрутке.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 3
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Компонент полностью адаптивен и работает на всех устройствах.
            Градиент создает красивый переход от синего к голубому цвета.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 4
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Завершающая секция демонстрирует полную анимацию линии.
            Теперь линия должна быть полностью нарисована.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 1
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Прокрутите страницу вниз, чтобы увидеть, как анимированная линия постепенно появляется.
            Анимация привязана к прогрессу прокрутки страницы.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 2
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Линия использует SVG path с градиентной заливкой и анимируется с помощью GSAP ScrollTrigger.
            Эффект создается изменением stroke-dashoffset при прокрутке.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 3
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Компонент полностью адаптивен и работает на всех устройствах.
            Градиент создает красивый переход от синего к голубому цвета.
          </p>
        </section>

        <section class="py-16 md:py-24 mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
            Секция 4
          </h2>
          <p class="text-lg leading-relaxed text-gray-700 max-w-3xl">
            Завершающая секция демонстрирует полную анимацию линии.
            Теперь линия должна быть полностью нарисована.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
// Мета-данные страницы
useSeoMeta({
  title: 'Анимация линии - Демонстрация',
  description: 'Демонстрация анимированной SVG-линии с GSAP и ScrollTrigger'
})

// Используем layout по умолчанию
definePageMeta({
  layout: 'default'
})
</script>

