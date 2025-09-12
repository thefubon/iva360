<script lang="ts" setup>
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
  <div class="flex flex-col gap-4 py-4">
    <h3>Дашбоард</h3>

    <div class="bg-background rounded-lg p-4 border">
      Block
    </div>
  </div>
</template>