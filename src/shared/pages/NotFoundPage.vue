<template>
  <section class="flex items-center justify-center size-full">
    <div class="error-message">
      <h1 class="text-[150px] -mb-4 select-none text-center font-extrabold text-accent">
        404
      </h1>
      <p class="text-center text-primary font-extrabold text-2xl">
        Page Not Found
      </p>
      <p class="text-center mt-5 text-lg text-accent">Sorry, an error has occurred, requested page not found</p>
      <div @click="router.push('/')" class="cursor-pointer mt-8 flex items-center justify-center w-full">
        <span class="rounded flex w-full md:w-fit group items-center gap-4 justify-center border-2 
            border-custom_bg_accent font-semibold bg-secondary py-3 px-5 capitalize shadow-md 
            text-primary transition-all duration-200 ease-linear hover:-translate-y-0.5">
          Go back to home
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import router from '@/router/router';


</script>

<style scoped></style>