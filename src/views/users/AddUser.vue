<template>

  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4 ">
    <p class="text-h4 w-100 ms-5 mt-3">Add User</p>
    <router-link to="/users" class="me-5 v-btn--elevated v-btn text-black bg-white pa-3">back</router-link>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <div class="w-100">
      <v-form @submit.prevent="submitUser">

        <!-----username field-------->
        <v-text-field
            class="mt-8"
            label="Fullname"
            v-model="user.fullname"
            :rules="[
        v => !!v || 'Field is required'
      ]"
        />
        <v-text-field
            class="mt-8"
            label="Phone number"
            v-model="user.phone_number"
            :rules="[
        v => !!v || 'Field is required'
      ]"
        />
        <!--------password field---------->
        <v-text-field
            class="mt-8"
            v-model="user.password"
            :rules="[
        v => !!v || 'Field is required'
      ]"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 4 characters"
            counter
            @click:append="show1 = !show1"
        ></v-text-field>
        <!----------submit btn--------->
        <v-btn type="submit"
               class="w-100 mt-2"
               color="black"
        >
          <p class="w-100 text-center" v-if="!loading">Create User</p>
          <p class="w-100 text-center" v-else>Creating User...</p>
        </v-btn>

      </v-form>
    </div>
    <!-------------End table of users-------------->

    <!------------ success user message start ---------->
    <div class="w-100" v-if="success">
      <div class="w-100 bg-green text-white text-center pa-8 mt-4">
        User Created Successfully!
      </div>
    </div>
    <!------------ success user message End ---------->
    <!-------error message start ------------->
    <div class="w-100" v-if="errorResponse">
      <div class="w-100 bg-red text-white text-center pa-8 mt-4">
        We Have Some Error
      </div>
    </div>
    <!-------error message End ------------->

  </div>

</template>

<script setup>

import {reactive, ref} from "vue";
import {useUsersStore} from "../../store/users";
import Axios from "axios";

//// calling pinia store
const userStore = useUsersStore();

// for showing password in field
const show1 = ref(false);
///// for loading in user submit
const loading = ref(false);
///// disable button to prevent sending another request\
const disable = ref(false);


//create user object
const user = reactive({
  fullname: null,
  password: null,
  phone_number: null,
})

///// success for 200 status code message
const success = ref(false);
///// errorResponse for 400, 500, 300 status code
const errorResponse = ref(false);


//// submit form
const submitUser = () => {
  ///// disable form
  disable.value = true;
  ///// loading true
  loading.value = true;

  ///// post request
  Axios.post("http://185.208.172.123/user", {
    fullname: user.fullname,
    password: user.password,
    phone_number: user.phone_number,
  }, {
    headers: {
      Authorization: sessionStorage.getItem("token")
    }
  }).then(res => {
    //// enable form & loading
    disable.value = false;
    loading.value = false;
    /// ------- success message div show
    success.value = true;
  }).catch(err => {
    /// error message and loading
    errorResponse.value = true;
    disable.value = false;
    loading.value = false;
    console.log(err)
  })

}

</script>

<style scoped>

</style>