<template>
  <header :class="['h-20 bg-secondary sticky w-full top-0 z-50', hasScrolled ? 'scrolled' : 'no-scrolled']">
    <div class="container h-full flex items-center justify-between">
      <button type="button" class="logo-container" @click="router.push('/')">
        <h1 class="text-2xl text-primary font-extrabold">Where in the world?</h1>
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
        <span class="font-bold text-primary">{{ capitalizeText(themeState) }}</span>
        <div :class="['theme-dropdown-content', { active: isDropdownActive }]">
          <li @click="changeThemeState('light')" href="#" class="dropdown-link">Light</li>
          <li @click="changeThemeState('dark')" href="#" class="dropdown-link">Dark</li>
          <li @click="changeThemeState('system')" href="#" class="dropdown-link">System</li>
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

const hasScrolled = ref<boolean>(false);
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

const handleScroll = () => {
  hasScrolled.value = window.scrollY > 0;
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
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.scrolled {
  transition: box-shadow .5s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
}

.no-scrolled {
  transition: box-shadow .5s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0);
}

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
  background: #fff;
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
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  line-height: 1.25rem;
  color: #4a5568;
}

.dropdown-link:hover {
  color: #111827;
  background: #f1f1f1;
}

.dropdown.active .theme-dropdown-content {
  opacity: 1;
  transform: scaleY(1);
  visibility: visible;
}
</style>