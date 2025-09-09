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
  <div class="py-10">
   <BlocksHero />
  </div>
</template>