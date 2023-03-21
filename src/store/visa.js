import { defineStore } from "pinia";
import Axios from "axios";

export const useVisaStore = defineStore("visa", {
  state: () => {
    return {
      allCountries: [],
      allEmbassies: [],
      countryEmbassies: [],
    };
  },
  actions: {
    fetchAllCountries(loading) {
      console.log(loading);
      Axios.get("http://185.208.172.123/visa/country", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.allCountries = res.data;
          loading.value = false;
          return res.data;
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    },
    fetchAllEmbassies(loading) {
      Axios.get("http://185.208.172.123/visa/embassy", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          this.allEmbassies = res.data;
          loading.value = false;
          console.log(res);
          return res.data;
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    },
    fetchCountryEmbassies(loading, country_id) {
      Axios.get(`http://185.208.172.123/visa/embassy/${country_id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          this.countryEmbassies = res.data;
          loading.value = false;
          console.log(res);
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    },
  },
});
