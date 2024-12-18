import { createWebHistory, createRouter } from "vue-router";

import CountriesPage from "@/features/countries/pages/CountriesPage.vue";
import CountryDetailPage from "@/features/countries/pages/CountryDetailPage.vue";
import NotFoundPage from "@/shared/pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: CountriesPage,
    meta: { scrollToTop: false }
  },
  {
    path: "/countries",
    name: "CountriesPage",
    component: CountriesPage,
    meta: { scrollToTop: true }
  },
  {
    path: "/countries/:name/information",
    name: "CountryDetailPage",
    component: CountryDetailPage,
    meta: { scrollToTop: true }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
