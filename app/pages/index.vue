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
  <div class="relative">
    <!-- <div class="absolute inset-x-0 top-10 lg:top-40 overflow-x-clip">
      <BgLine class="w-full h-full scale-130 lg:scale-160 xl:scale-130" />
    </div> -->

    <div class="py-6 md:py-16 space-y-16 md:space-y-24 relative">
      <BlocksHero />

      <AnimationLine />

      <div class="space-y-8 lg:space-y-16">
        <div class="container">
          <h2>Все продукты<br>в одном приложении</h2>
        </div>
        <BlocksProductsInOneApp />
      </div>

      <div class="space-y-8 lg:space-y-16">
        <div class="container">
          <h2>Почему выбирают IVA 360</h2>
        </div>
        <BlocksAdditionalFeatures />
      </div>

      <div class="space-y-8 lg:space-y-16">

        <BlocksWhyChooseIva360 />

        <div class="container">
          <h2>Подходит именно вам</h2>
        </div>
        <BlocksSuitableForYou />

      </div>

      <div class="container space-y-8 lg:space-y-16">
        <SettingOrder />
      </div>
    </div>
  </div>
</template>