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
  <div class="py-6 md:py-16 space-y-16 md:space-y-24">
    <BlocksHero />
    <BlocksCardsProducts />
  </div>
</template>