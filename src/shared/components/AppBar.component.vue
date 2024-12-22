<template>
  <header class="h-20 bg-secondary sticky w-full top-0 z-50 border-b-[3px] border-custom_bg_accent">
    <div class="container h-full flex items-center justify-between">
      <button type="button" class="logo-container" @click="router.push('/')">
        <h1 class="text-xl xs:text-2xl text-primary font-extrabold">Where in the world?</h1>
      </button>
      <button type="button" @click="toggleDropdown" class="relative border-[1px] border-transparent hover:border-slate-400/80 transition-all duration-200 ease-linear rounded-xl 
        flex items-center gap-3 py-1.5 px-2.5" style="pointer-events: fill;">
        <template v-if="themeState === 'system'">
          <SystemIcon />
        </template>
        <template v-else-if="themeState === 'light'">
          <LightIcon />
        </template>
        <template v-else-if="themeState === 'dark'">
          <DarkIcon />
        </template>
        <span class="font-bold text-primary hidden xs:block">{{ capitalizeText(themeState) }}</span>
        <div :class="['theme-dropdown-content bg-secondary', { active: isDropdownActive }]">
          <li @click="changeThemeState('light')" href="#" class="dropdown-link flex justify-center sm:justify-start px-0 sm:px-4 py-2">
            <span class="text-primary hidden xs:inline">Light</span>
            <LightIcon class="xs:hidden" />
          </li>
          <li @click="changeThemeState('dark')" href="#" class="dropdown-link flex justify-center sm:justify-start px-0 sm:px-4 py-2">
            <span class="text-primary hidden xs:inline">Dark</span>
            <DarkIcon class="xs:hidden" />
          </li>
          <li @click="changeThemeState('system')" href="#" class="dropdown-link flex justify-center sm:justify-start px-0 sm:px-4 py-2">
            <span class="text-primary hidden xs:inline">System</span>
            <SystemIcon class="xs:hidden" />
          </li>
        </div>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import DarkIcon from '@/assets/icons/DarkIcon.vue';
import LightIcon from '@/assets/icons/LightIcon.vue';
import SystemIcon from '@/assets/icons/SystemIcon.vue';
import { capitalizeText } from '@/features/countries/utils/helpers/format-text';
import router from '@/router/router';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { getSystemTheme, getTheme, saveTheme } from '../helpers/theme';

const isDropdownActive = ref<boolean>(false);
const themeState = ref<string>('system');

const applyTheme = (theme: string) => {
  const themeToApply = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', themeToApply);
};

const changeThemeState = (theme: string) => {
  themeState.value = theme;
  saveTheme(theme);
};

const toggleDropdown = (event: MouseEvent) => {
  event?.stopPropagation();
  isDropdownActive.value = !isDropdownActive.value;
};

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.theme-dropdown-content');
  if (isDropdownActive.value && dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownActive.value = false;
  }
};

watch(themeState, applyTheme);

onMounted(() => {
  themeState.value = getTheme() || 'system';
  applyTheme(themeState.value);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>

.theme-dropdown-content {
  overflow: hidden;
  position: absolute;
  top: 3rem;
  left: 0;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.theme-dropdown-content.active {
  opacity: 1;
  transform: scaleY(1);
  visibility: visible;
  transition: all 0.3s ease;
}

.dropdown-link {
  text-align: start;
  font-size: 0.95rem;
  line-height: 1.25rem;
}

.dropdown-link:hover {
  color: #111827;
  background: #f1f1f1;
}

.dropdown-link:hover * {
  color: #111827;
  fill: #111827;
}

.dropdown.active .theme-dropdown-content {
  opacity: 1;
  transform: scaleY(1);
  visibility: visible;
}
</style>