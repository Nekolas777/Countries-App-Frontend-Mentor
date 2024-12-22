<template>
  <div class="grid grid-cols-1 grid-rows-[auto,1fr] min-h-screen">
    <AppBar />
    <main class="bg-custom_bg">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" :duration="150" @after-leave="$root!.$emit('triggerScroll')">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppBar from './shared/components/AppBar.component.vue';

</script>


<style scoped></style>