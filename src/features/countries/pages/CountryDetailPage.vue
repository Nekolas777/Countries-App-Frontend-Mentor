<template>
  <section class="bg-custom_bg h-full py-16">
    <div class="container">
      <button class="bg-secondary custom-shadow rounded-md px-8 py-1.5" @click="router.push('/')" type="button">
        <div class="flex flex-row gap-2.5 items-center">
          <SharpArrrowIcon />
          <span class="text-primary text-base">Back</span>
        </div>
      </button>
      <div class="mt-16 w-full grid grid-rows-[1fr,auto] lg:grid-rows-1 grid-cols-1 lg:grid-cols-[1fr,1fr] 
        gap-14 lg:gap-8 xl:gap-16 h-full">
        <img class="object-fill w-full h-[400px] min-h-full" :src="currentCountry?.flags.png" />
        <div class="p-0 lg:p-8 flex flex-col gap-8 justify-center">
          <h2 class="text-primary text-3xl font-extrabold">{{ currentCountry?.name.common }}</h2>
          <div class="flex flex-col sm:flex-row gap-10">
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
                <button :tooltip="getCountryByCode(border)" flow="down"
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
import { getCountryByName } from '../service/country.service';
import { Country } from '../models/country';
import { joinText } from '../utils/helpers/format-text';
import { getCountryByCode } from '../utils/helpers/country-by-code';
import SharpArrrowIcon from '@/assets/icons/SharpArrrowIcon.vue';
import router from '@/router/router';

const route = useRoute();
const countriesStore = useCountriesStore();
const currentCountry = ref<Country | null>(null);

onMounted(async () => {
  if (!countriesStore.countries.length) {
    const countries = await getCountryByName(route.params.name.toString());
    currentCountry.value = countries[0];
  } else {
    currentCountry.value = countriesStore.selectedCountry;
  }
});

const languages = computed(() => {
  return currentCountry.value ? Object.values(currentCountry.value.languages).join(', ') : 'No Languages';
});

const currencies = computed(() => {
  return currentCountry.value
    ? Object.values(currentCountry.value.currencies)
      .map(currency => `${currency.name}`)
      .join(', ')
    : 'No Currencies';
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
</style>