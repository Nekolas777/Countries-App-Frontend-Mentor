<template>
  <section class="bg-custom_bg h-full py-16">
    <div class="container">
      <button class="bg-secondary custom-shadow rounded-md px-8 py-1.5" @click="router.push('/')" type="button">
        <div class="flex flex-row gap-2.5 items-center">
          <SharpArrrowIcon />
          <span class="text-primary text-base">Back</span>
        </div>
      </button>
      <div class="mt-16 w-full grid grid-rows-[1f,auto] lg:grid-rows-1 grid-cols-1 lg:grid-cols-[auto,auto] 
        gap-14 lg:gap-8 xl:gap-16 h-full">
        <figure class="h-[375px] min-w-full lg:w-[425px] min-h-full">
          <img class="object-fill size-full " :src="currentCountry?.flags.png" />
        </figure>
        <div class="p-0 lg:p-8 flex flex-col gap-8 justify-center">
          <h2 class="text-primary text-3xl font-extrabold">{{ currentCountry?.name.common }}</h2>
          <div class="flex flex-col sm:flex-row gap-10">
            <ul class="flex flex-col flex-1 gap-3">
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Native Name:</span>
                Belgié
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Population:</span>
                11.319.511
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Region:</span>
                Europe
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Sub Region:</span>
                Western Europe
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Capital:</span>
                Brussels
              </p>
            </ul>
            <ul class="flex flex-col flex-1 gap-3">
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Top Level Domain:</span>
                .be
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Currencies:</span>
                Euro
              </p>
              <p class="text-accent font-medium">
                <span class="font-custom_weight text-primary">Languages:</span>
                Dutch, French, German
              </p>
            </ul>
          </div>
          <div class="flex flex-row flex-wrap items-center gap-4">
            <span class="text-primary text-base font-custom_weight">Border Countries:</span>
            <div class="flex flex-row flex-wrap gap-2.5">
              <button class="bg-secondary border-[1.5px] rounded-md px-6 py-1.5" type="button">
                <div class="flex flex-row gap-2.5 items-center">
                  <span class="text-primary text-sm font-medium">France</span>
                </div>
              </button>
              <button class="bg-secondary border-[1.5px] rounded-md px-6 py-1.5" type="button">
                <div class="flex flex-row gap-2.5 items-center">
                  <span class="text-primary text-sm font-medium">Germany</span>
                </div>
              </button>
              <button class="bg-secondary border-[1.5px] rounded-md px-6 py-1.5" type="button">
                <div class="flex flex-row gap-2.5 items-center">
                  <span class="text-primary text-sm font-medium">Netherlands</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCountriesStore } from '@/store/countries';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCountryByName } from '../service/country.service';
import { Country } from '../models/country';
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

</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 0px 12px rgba(0, 0, 0, 0.15);
}
</style>