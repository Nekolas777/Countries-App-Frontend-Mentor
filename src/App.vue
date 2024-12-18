<template>
  <div class="min-h-screen grid grid-cols-1 grid-rows-[auto,1fr] 
    divide-y-[3.8px] divide-custom_bg_accent">
    <AppBar />
    <main class="bg-custom_bg h-full">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" @after-leave="$root!.$emit('triggerScroll')">
          <component :is="Component" />
        </transition>
      </router-view>  
    </main>
  </div>
</template>

<script setup lang="ts">
import AppBar from './shared/components/AppBar.component.vue';

</script>


<style scoped>



</style>