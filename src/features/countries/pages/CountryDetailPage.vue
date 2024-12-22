<template>
  <section class="bg-custom_bg py-12 sm:py-16 h-full">
    <div v-if="isLoading" class="flex items-center justify-center size-full">
      <div class="loader-container">
        <div class="spinner border-[6px] border-solid border-custom_bg_accent border-b-accent"></div>
      </div>
    </div>
    <div v-else-if="hasError" class="flex items-center justify-center size-full">
      <div class="error-message">
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
    </div>
    <div v-else class="container">
      <button class="bg-secondary custom-shadow rounded-md px-8 py-1.5" @click="router.push('/')" type="button">
        <div class="flex flex-row gap-2.5 items-center">
          <SharpArrrowIcon />
          <span class="text-primary text-base">Back</span>
        </div>
      </button>
      <div class="mt-16 w-full grid grid-rows-[1fr,auto] lg:grid-rows-1 grid-cols-1 lg:grid-cols-[1fr,1fr] 
        gap-14 lg:gap-8 xl:gap-16 h-full">
        <img class="object-fill w-full h-[275px] xs:h-[375px] min-h-full" :src="currentCountry?.flags.png" />
        <div class="p-0 lg:p-8 flex flex-col gap-8 justify-center">
          <h2 class="text-primary text-3xl font-extrabold">{{ currentCountry?.name.common }}</h2>
          <div class="flex flex-col sm:flex-row gap-14">
            <ul class="flex flex-col flex-1 gap-3">
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Oficial Name:</span>
                {{ currentCountry?.name.official }}
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Population:</span>
                {{ currentCountry?.population }}
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Region:</span>
                {{ currentCountry?.region }}
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Sub Region:</span>
                {{ currentCountry?.subregion || 'No Sub Region' }}
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Capital:</span>
                {{ joinText(currentCountry?.capital?.length ? currentCountry.capital : ['No Capital']) }}
              </p>
            </ul>
            <ul class="flex flex-col flex-1 gap-3">
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Top Level Domain:</span>
                {{ joinText(currentCountry?.tld || ['No Av.']) }}
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Currencies:</span>
                {{ currencies || 'No Currencies' }}
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Languages:</span>
                {{ languages }}
              </p>
            </ul>
          </div>
          <div class="flex flex-row flex-wrap items-center gap-4">
            <span class="text-primary text-base font-custom_weight">Border Countries:</span>
            <div class="flex flex-row flex-wrap gap-2.5">
              <template v-if="currentCountry?.borders.length">
                <button @click="searchCountryByCode(border)" :tooltip="getCountryByCode(border)" flow="down"
                  v-for="(border, index) in currentCountry?.borders" :key="index"
                  class="country-border bg-secondary custom-shadow rounded-md px-5 py-1.5" type="button">
                  <div class="flex flex-row gap-2.5 items-center">
                    <span class="text-primary text-sm font-medium">{{ border }}</span>
                  </div>
                </button>
              </template>
              <template v-else>
                <span class="text-accent font-bold">No Borders</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCountriesStore } from '@/store/countries';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCountryByAlphaCode, getCountryByName } from '../service/country.service';
import { Country } from '../models/country';
import { joinText } from '../utils/helpers/format-text';
import { getCountryByCode } from '../utils/helpers/country-by-code';
import SharpArrrowIcon from '@/assets/icons/SharpArrrowIcon.vue';
import router from '@/router/router';

const route = useRoute();
const countriesStore = useCountriesStore();
const currentCountry = ref<Country | null>(null);
const hasError = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const languages = computed(() => {
  return currentCountry.value ?
    Object.values(currentCountry.value.languages).join(', ')
    : 'No Languages';
});

const currencies = computed(() => {
  return currentCountry.value
    ? Object.values(currentCountry.value.currencies)
      .map(currency => `${currency.name}`)
      .join(', ')
    : 'No Currencies';
});

const searchCountryByCode = async(code: string) => {
  isLoading.value = true;
  hasError.value = false;
  try {
    const country = await getCountryByAlphaCode(code);
    currentCountry.value = country;
    countriesStore.setSelectedCountry(country);
    router.replace(`/countries/${getCountryByCode(code)}/information`);
  } catch (error) {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (!countriesStore.countries.length || !countriesStore.selectedCountry) {
    hasError.value = false;
    isLoading.value = true;
    try {
      const countries = await getCountryByName(route.params.name.toString());
      isLoading.value = false;
      currentCountry.value = countries[0];
    } catch (error) {
      hasError.value = true;
    } finally {
      isLoading.value = false;
    }
  } else {
    currentCountry.value = countriesStore.selectedCountry;
  }
});

</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 0px 12px rgba(0, 0, 0, 0.15);
}

[tooltip] {
  position: relative;
}

[tooltip]::before,
[tooltip]::after {
  text-transform: none;
  font-size: .9em;
  line-height: 1;
  user-select: none;
  pointer-events: none;
  position: absolute;
  display: none;
  opacity: 0;
}

[tooltip]::before {
  content: '';
  border: 5px solid transparent;
  z-index: 1001;
}

[tooltip]::after {
  content: attr(tooltip);

  font-family: Helvetica, sans-serif;
  text-align: center;
  min-width: 3em;
  max-width: 21em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1ch 1.5ch;
  border-radius: .3ch;
  box-shadow: 0 1em 2em -.5em rgba(0, 0, 0, 0.35);
  background: #333;
  color: #fff;
  z-index: 1000;
}

[tooltip]:hover::before,
[tooltip]:hover::after {
  display: block;
}

/* flow: DOWN */
[tooltip][flow^="down"]::before {
  top: 100%;
  border-top-width: 0;
  border-bottom-color: #333;
}

[tooltip][flow^="down"]::after {
  top: calc(100% + 5px);
}

[tooltip][flow^="down"]::before,
[tooltip][flow^="down"]::after {
  left: 50%;
  transform: translate(-50%, .5em);
}

/* FX All The Things */
[tooltip][flow^="down"]:hover::before,
[tooltip][flow^="down"]:hover::after {
  animation: tooltips-vert 300ms ease-out forwards;
}

/* spinenr styles */
.spinner {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: rotate 1s linear infinite;
}

/* animaciones */
@keyframes tooltips-vert {
  to {
    opacity: .9;
    transform: translate(-50%, 0);
  }
}

@keyframes tooltips-horz {
  to {
    opacity: .9;
    transform: translate(0, -50%);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>