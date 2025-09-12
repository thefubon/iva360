<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

useHead({
  title: 'Авторизация',
  meta: [
    { name: 'description', content: 'Описание главной страницы' }
  ],
});

import LoginForm from "@/components/auth/SignIn.vue"
</script>

<template>
  <div>
    <LoginForm />
  </div>
</template>
