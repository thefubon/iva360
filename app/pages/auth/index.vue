<script setup lang="ts">
import LoginForm from "@/components/auth/SignIn.vue"

definePageMeta({
  layout: 'auth',
});

useHead({
  title: 'Авторизация',
  meta: [
    { name: 'description', content: 'Описание главной страницы' }
  ],
});
</script>

<template>
  <div>
    <LoginForm />
  </div>
</template>
