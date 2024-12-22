<template>
  <section class="container py-12 sm:py-16 h-full">
    <div class="flex flex-col xs:flex-row justify-between gap-6 lg:gap-8">
      <form @submit.prevent
        class="bg-secondary flex items-center py-4 w-full max-w-[500px] rounded-md custom-shadow overflow-hidden"
        autocomplete="off">
        <button class="h-full px-4">
          <SearchIcon />
        </button>
        <input v-model="search" type="text" class="w-full h-full pr-4 bg-secondary text-primary outline-none"
          placeholder="Search for a country..." />
      </form>
      <div @click="toggleDropdown()" class="relative w-full bg-secondary flex flex-row items-center py-4 justify-between px-5 xs:w-[250px] gap-4 
        rounded-md custom-shadow cursor-pointer">
        <span class="w-full h-full bg-secondary text-primary font-medium flex items-center one-line">{{ capitalizeText(regionState ?? 'Filter by type') }}</span>
        <button class="h-full">
          <ArrowIcon />
        </button>
        <div :class="['region-dropdown-content bg-secondary', { active: isDropdownActive }]">
          <li @click="changeRegion('africa')" class="dropdown-link text-primary">Africa</li>
          <li @click="changeRegion('america')" class="dropdown-link text-primary">America</li>
          <li @click="changeRegion('asia')" class="dropdown-link text-primary">Asia</li>
          <li @click="changeRegion('europe')" class="dropdown-link text-primary">Europe</li>
          <li @click="changeRegion('oceania')" class="dropdown-link text-primary">Ocenia</li>
        </div>
      </div>
    </div>
    <CountriesGrid :countries="countries" :has-error="hasError" />
  </section>
</template>

<script setup lang="ts">
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
import SearchIcon from '@/assets/icons/SearchIcon.vue';
import CountriesGrid from '../components/CountriesGrid.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useCountriesStore } from '@/store/countries';
import { useDebounce } from '../composables/useDebounce';
import { Country } from '../models/country';
import { getCountriesByRegion, getCountryByName } from '../service/country.service';
import { capitalizeText } from '../utils/helpers/format-text';

const countriesStore = useCountriesStore();  
const search = ref<string>('');
const countries = ref<Country[]>([]);
const hasError = ref<boolean>(false);

const isDropdownActive = ref<boolean>(false);
const regionState = ref<string | null>(null);

const toggleDropdown = () => {
  event?.stopPropagation();
  isDropdownActive.value = !isDropdownActive.value;
};

const changeRegion = async(region: string) => {
  countries.value = await getCountriesByRegion(region);
  regionState.value = region;
};

const fetchCountriesInfo = useDebounce(async () => {
  if (!search.value.trim()) {
    countries.value = countriesStore.countries;
    hasError.value = false;
    return;
  }

  try {
    const result = await getCountryByName(search.value.trim());
    countries.value = result;
    hasError.value = result.length === 0;
  } catch (error) {
    console.error(error);
    hasError.value = true;
  }
}, 300);

// watch search value applying debounce
watch(search, fetchCountriesInfo);

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.region-dropdown-content');
  if (isDropdownActive.value && dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownActive.value = false;
  }
};

onMounted(async () => {
  await countriesStore.fetchCountries();
  countries.value = countriesStore.countries;
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 0px 12px rgba(0, 0, 0, 0.05);
}

.region-dropdown-content {
  overflow: hidden;
  position: absolute;
  top: 4rem;
  left: 0;
  width: 100%;
  visibility: visible;
  opacity: 1;
  transform: scaleY(0);
  transform-origin: top;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 10;
}

.region-dropdown-content.active {
  opacity: 1;
  transform: scaleY(1);
  visibility: visible;
  transition: all 0.3s ease;
}

.dropdown-link {
  text-align: start;
  display: block;
  padding: 0.8rem 1rem;
  font-size: 0.95rem;
  line-height: 1.25rem;
}

.dropdown-link:hover {
  color: #111827;
  background: #f1f1f1;
}

.dropdown.active .region-dropdown-content {
  opacity: 1;
  transform: scaleY(1);
  visibility: visible;
}
</style>