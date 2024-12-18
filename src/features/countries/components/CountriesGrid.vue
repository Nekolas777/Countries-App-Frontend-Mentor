<template>
  <div class="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16">
    <div v-for="(country, index) in countriesStore.countries" id="country" :key="index">
      <article @click="goToCountryDetail(country)"
        class="country-card block relative bg-secondary shadow-md rounded-md overflow-hidden">
        <img v-lazy="{
          src: country.flags.png,
          loading: 'https://cdn.dribbble.com/users/8424/screenshots/1036999/dots_2.gif',
          error: 'https://eastweb.ir/wp-content/uploads/6M513.png',
        }" class="h-[200px] object-fill w-full" width="100%" alt="Country Flag" />

        <div class="px-5 pt-6 pb-8 flex flex-col gap-1.5">
          <h2 class="title-card mb-2.5 text-xl font-extrabold text-primary">{{ country.name.common }}</h2>
          <p class="text-accent font-medium">
            <span class="font-custom_weight text-primary">Population:</span>
            {{ country.population }}
          </p>
          <p class="text-accent font-medium">
            <span class="font-custom_weight text-primary">Region:</span> {{ country.region }}
          </p>
          <p class="text-accent font-medium">
            <span class="font-custom_weight text-primary">Capital:</span> {{ joinText(country.capital) }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Country } from '../models/country';
import { joinText } from '../helpers/format-text';
import { useCountriesStore } from '@/store/countries';
import router from '@/router/router';

const countriesStore = useCountriesStore();

// initial fetch countries
onMounted(async () => {
  await countriesStore.fetchCountries();
});

const goToCountryDetail = (country: Country) => {
  countriesStore.setSelectedCountry(country);
  router.push({
    path: `/countries/${country.name.common}/information`,
  });
};

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

.title-card {
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>