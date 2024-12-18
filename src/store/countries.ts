import { Country } from "@/features/countries/models/country";
import { getAllCountries } from "@/features/countries/service/country.service";
import { defineStore } from "pinia";

export const useCountriesStore = defineStore("countries", {
  state: () => ({
    countries: [] as Country[],
    selectedCountry: null as Country | null,
  }),
  getters: {
    getSelectedCountry(): Country {
      return this.selectedCountry!;
    },
    getCountries(): Country[] {
      return this.countries;
    },
  },
  actions: {
    async fetchCountries() {
      this.countries = await getAllCountries();
    },
    setSelectedCountry(country: Country) {
      this.selectedCountry = country;
    },
    findCountryByName(name: string) {
      this.selectedCountry =
        this.countries.find((country) => country.name.common === name) || null;
    },
  },
});
