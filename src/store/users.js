import {defineStore} from "pinia";
import {axios, getAxios, postAxios} from "./index";
import {reactive} from "vue";


export const useUsersStore = defineStore("users", {
    state: () => {
        return {
            allUsers : []
        }
    },
    actions: {
        fetchAllUsers() {
            getAxios.get("/user",).then(res => {
                console.log(res)
                this.allUsers = res.data;
            }).catch(err => {
                console.log(err)
            })
        },
        createUser(data) {
            postAxios.post("/user", data).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
})