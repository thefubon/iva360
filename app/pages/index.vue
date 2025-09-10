<script lang="ts" setup>
definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Онлайн-платформа для ВКС и Вебинаров с мессенджером',
  meta: [
    { name: 'description', content: 'Описание главной страницы' }
  ],
});
</script>

<template>
  <div>
    <div class="absolute inset-x-0 top-32 md:top-40 lg:top-80 3xl:top-40">
      <BgLine class="w-full h-full scale-130 lg:scale-160 xl:scale-140 3xl:scale-100" />
    </div>

    <div class="py-6 md:py-16 space-y-16 md:space-y-24 relative">
      <BlocksHero />

      <div class="space-y-8 lg:space-y-16">
        <div class="container">
          <h2>Все продукты<br />в одном приложении</h2>
        </div>
        <BlocksCardsOne />
      </div>

      <div class="space-y-8 lg:space-y-16">
        <div class="container">
          <h2>Подходит именно вам</h2>
        </div>
        <BlocksCardsTwo />
      </div>
    </div>
  </div>
</template>