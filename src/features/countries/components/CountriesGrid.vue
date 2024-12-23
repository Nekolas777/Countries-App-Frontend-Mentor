<template>
  <div class="mt-12">
    <div v-if="isLoading" class="flex items-center justify-center size-full pt-5">
      <div class="loader-container">
        <div class="spinner border-[6px] border-solid border-custom_bg_accent border-b-accent"></div>
      </div>
    </div>
    <div v-else-if="hasError" class="error-message">
      <h1 class="text-[150px] -mb-4 select-none text-center font-extrabold text-accent">
        404
      </h1>
      <p class="text-center text-primary font-extrabold text-2xl">
        No countries found
      </p>
      <p class="text-center mt-5 text-lg text-accent">Do you can't search for a specific <strong>country</strong>?</p>
      <div class="mt-8 flex items-center justify-center w-full">
        <a href="https://restcountries.com/" rel="noopener noreferrer" target="_blank" class="rounded flex w-full md:w-fit group items-center gap-4 justify-center border-2 
            border-custom_bg_accent font-semibold bg-secondary py-3 px-5 capitalize shadow-md 
            text-primary transition-all duration-200 ease-linear hover:-translate-y-0.5">
          Read the API docs
        </a>
      </div>
    </div>
    <div v-else class="country-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-16">
      <div v-for="(country, index) in countries" :key="index" id="country">
        <article @click="goToCountryDetail(country)" :class="['country-card block relative bg-secondary shadow-md rounded-md overflow-hidden fade-in', {
          'reveal': shouldReveal(index),
        }]">
          <img v-lazy="{
            src: country.flags.png,
            loading: 'https://cdn.dribbble.com/users/8424/screenshots/1036999/dots_2.gif',
            error: 'https://eastweb.ir/wp-content/uploads/6M513.png',
          }" class="h-[200px] object-fill w-full" width="100%" alt="Country Flag" />

          <div class="px-5 pt-6 pb-8 flex flex-col gap-1.5">
            <h2 class="one-line mb-2.5 text-xl font-extrabold text-primary">{{ country.name.common }}</h2>
            <p class="text-accent font-medium one-line">
              <span class="font-custom_weight text-primary">Population:</span>
              {{ country.population }}
            </p>
            <p class="text-accent font-medium one-line">
              <span class="font-custom_weight text-primary">Region:</span> {{ country.region }}
            </p>
            <p class="text-accent font-medium one-line">
              <span class="font-custom_weight text-primary">Capital:</span> {{ joinText(country.capital) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Country } from '../models/country';
import { joinText } from '../utils/helpers/format-text';
import { useCountriesStore } from '@/store/countries';
import router from '@/router/router';
import { onMounted, onUnmounted, ref } from 'vue';

const { countries, hasError } = defineProps<{
  countries: Country[];
  hasError: boolean;
  isLoading: boolean;
}>();

const countriesStore = useCountriesStore();
const itemsPerRow = ref<number>(1);

const goToCountryDetail = (country: Country) => {
  countriesStore.setSelectedCountry(country);
  router.push({
    path: `/countries/${country.name.common}/information`,
  });
};

const updateItemsPerRow = () => {
  if (window.innerWidth >= 1280) {
    itemsPerRow.value = 4;
  } else if (window.innerWidth >= 768) {
    itemsPerRow.value = 2;
  } else {
    itemsPerRow.value = 1;
  }
};

const shouldReveal = (index: number) => {
  return Math.floor(index / itemsPerRow.value) >= 2;
};

onMounted(() => {
  updateItemsPerRow();
  window.addEventListener('resize', updateItemsPerRow);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerRow);
});
</script>

<style scoped>
.country-card {
  transition: transform 0.2s ease-out;
  cursor: pointer;
}


.country-card:hover {
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  transform: translateY(-4px);
}

.country-card:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: #00838d;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(2);
  transform-origin: 50% 50%;
  transition: transform 0.15s ease-out;
}

.country-card:hover:before {
  transform: scale(2.15);
}

.country-card.reveal {
  animation: scrollReveal ease-in-out;
  animation-duration: 2s;
  animation-timeline: view();
  animation-fill-mode: backwards;
  animation-range: entry 0% cover 30%;
}

.fade-in {
  animation: fadeIn 0.25s linear;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scrollReveal {
  from {
    opacity: 0;
    scale: 0.5;
  }

  to {
    opacity: 1;
    scale: 1;
  }
}
</style>