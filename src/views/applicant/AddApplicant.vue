<template>
  <div class="w-75 mx-auto">
    <div class="w-100 pt-14">
      <div
        class="w-100 text-center text-h4 pa-10 border rounded-xl position-relative custom-back"
        v-if="!credentialTrue"
      >
        <p class="w-100">
          There is No Credential For this User Please Make Onces
        </p>
        <div>
          <v-btn class="mt-8" color="black" @click="credentialUser"
            >Make Credential For this User
          </v-btn>
        </div>
      </div>
      <div v-else>
        <v-form @submit.prevent="createAppointment">
          <v-select
            class="mt-8"
            v-model="embassy_id"
            label="Chose Embassy"
            :items="embassyStore.allEmbassies"
            item-title="name"
            item-value="_id"
          >
          </v-select>

          <v-select
            class="mt-8"
            v-model="credential_id"
            label="Credential Username"
            :items="userIdArray"
            item-title="credentials.username"
            item-value="_id"
          >
          </v-select>

          <v-btn type="submit" color="black" :disabled="disable">SUBMIT</v-btn>
        </v-form>

        <div
          class="mt-4 w-100 pa-4 bg-green text-white rounded-xl"
          v-if="sucRes"
        >
          <p class="w-100">You Create applicant successfully !</p>
        </div>

        <div class="mt-4 w-100 pa-4 bg-red text-white rounded-xl" v-if="errRes">
          <p class="w-100">We Have Some Error Here !!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useVisaStore } from "../../store/visa";
import { reactive, ref, watch } from "vue";
import Axios from "axios";
import { useCredentialStore } from "../../store/credential";
import router from "@/router";

//// route for finding param and save user id into user_id
const route = useRoute();
const user_id = route.params.user_id;

///// loading for rest api
const loading = ref(false);

///// credential id for v-model credential id
const credential_id = ref(null);

///// if credentialTrue is true show the form ----------- else show me the box to tell user make credential
///// this variable tell users that the chosen uesr doesn't have credential or not
let credentialTrue = ref(false);

///// for push multi credential users to this variable
const userIdArray = reactive([]);

///// fetch all users to see embassies with pinia store
const embassyStore = useVisaStore();
embassyStore.fetchAllEmbassies(loading);

///// fetch all credentials for checking id
const credentialStore = useCredentialStore();
credentialStore.fetchAllCredentials(loading);

//// errRes and sucRes for req message & disable for disable button
const errRes = ref(false);
const sucRes = ref(false);
const disable = ref(false);

///// embassy id v-model
const embassy_id = ref(null);

//// find users credentials
watch(() => {
  credentialStore.allCredential.forEach((item) => {
    if (item.user_id === user_id) {
      userIdArray.push(item);
      credentialTrue.value = true;
    } else {
      console.log("nope");
    }
  });
}, credentialStore.fetchAllCredentials);

//// push to credential for this user
const credentialUser = () => {
  router.push(`/user/${user_id}`)
}

//// create appointment
const createAppointment = () => {
  disable.value = true;

  Axios.post(
    "http://185.208.172.123/applicant",
    {
      user_id: user_id,
      credentials_id: credential_id.value,
      embassy_id: embassy_id.value,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  )
    .then((res) => {
      disable.value = false;
      console.log(res);
      sucRes.value = true;
    })
    .catch((err) => {
      disable.value = false;
      errRes.value = true;
      console.log(err);
    });
};
</script>

<style scoped>
.custom-back {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='100%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23F0F0F0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='100%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23F8F8F8'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
</style>
