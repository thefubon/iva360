<script lang="ts" setup>
import WhyChooseIva360 from '~/components/blocks/WhyChooseIva360.vue';

definePageMeta({
  layout: 'dashboard',
});

useHead({
  title: 'Панель управления',
  meta: [
    { name: 'description', content: 'Описание главной страницы' }
  ],
});
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <h3 class="text-lg font-semibold">Дашбоард</h3>

    <div class="bg-background rounded-lg p-6 border">
      Dashboard
    </div>
  </div>
</template>