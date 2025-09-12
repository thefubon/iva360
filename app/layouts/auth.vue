<template>
  <div 
    class="relative flex min-h-svh flex-col items-center justify-center bg-slate-100 p-6 md:p-10"
    style="
      background-image: url('/img/BgLine.svg');
      background-size: cover;
      background-position: center top -120px;
      background-repeat: no-repeat;
    "
  >
    <div class="relative z-10 w-full max-w-sm md:max-w-3xl">
      <slot />
    </div>
  </div>
</template>
