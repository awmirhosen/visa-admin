import Axios from "axios";

let token = null

if (sessionStorage.getItem("token") != null) {
    token = sessionStorage.getItem("token");
}

export const axios = Axios.create({
    baseURL: 'http://185.208.172.123',
});

export const getAxios = Axios.create({
    baseURL: 'http://185.208.172.123',
    headers : {
      Authorization: `Bearer ${token}`
    }
})

export const postAxios = Axios.create({
    baseURL: 'http://185.208.172.123',
    headers : {
        Authorization: `Bearer ${token}`
    }
})