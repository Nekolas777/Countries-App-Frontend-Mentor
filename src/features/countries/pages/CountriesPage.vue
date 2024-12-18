<template>
  <section class="container py-16">
    <div class="flex flex-row justify-between h-14 gap-8">
      <div class="bg-secondary flex items-center w-full max-w-[500px] rounded-md custom-shadow overflow-hidden">
        <button class="h-full px-4">
          <SearchIcon />
        </button>
        <input type="text" class="w-full h-full pr-4 bg-secondary text-primary outline-none" placeholder="Search for a country..." />
      </div>
      <div class="bg-secondary flex flex-row items-center justify-between px-5 w-[250px] gap-4 
        rounded-md custom-shadow overflow-hidden cursor-pointer">
        <span class="w-full h-full bg-secondary text-primary font-medium flex items-center">Filter by Region</span>
        <button class="h-full">
          <ArrowIcon />
        </button>
      </div>
    </div>
    <CountriesGrid />
  </section>
</template>

<script setup lang="ts">
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
import SearchIcon from '@/assets/icons/SearchIcon.vue';
import CountriesGrid from '../components/CountriesGrid.vue';



</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 0px 12px rgba(0, 0, 0, 0.05);
}
</style>