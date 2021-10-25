import axios from "axios";

const BASE_URL = 'http://localhost:4000/mywallet'

function createConfig (token){
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

function sendSignUpRequest (body) {

    return axios.post(`${BASE_URL}/sign-up`, body);
}

function sendSignInRequest (body) {

    return axios.post(`${BASE_URL}/sign-in`, body);
}

function getTransictionsRequest (token) {

    return axios.get(`${BASE_URL}/transactions`, createConfig(token));
}

function sendTransictionsEntryRequest (token, body) {

    return axios.post(`${BASE_URL}/entry`, body, createConfig(token));
}

function sendTransictionsExitRequest (token, body) {

    return axios.post(`${BASE_URL}/exit`, body, createConfig(token));
}

function sendLogoutRequest (token) {

    return axios.get(`${BASE_URL}/log-out`, createConfig(token));
}
export {
    sendSignUpRequest,
    sendSignInRequest,
    getTransictionsRequest,
    sendTransictionsEntryRequest,
    sendTransictionsExitRequest,
    sendLogoutRequest,
}