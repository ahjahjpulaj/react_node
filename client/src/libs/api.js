import { API_URL } from '../config'
// const API_URL = 'http://localhost:8080';

const callFetch = async (url, options = {}) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx

    /*
    if (this.loggedIn()) {
        headers['Authorization'] = 'Bearer ' + this.getToken()
    }*/
    
    try{
        const response = await fetch(url, {
            ...options,
            headers: new Headers(headers)
        });
        const res = _checkStatus(response);
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error){
        // return {error};
        throw error;
    }
}

const api = {};

api.login = async({username, password}) => {
    // Get a token from api server using the fetch api
    return callFetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    })
}


const _checkStatus = (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
        return response
    } else {
        let error = {status : response.status, statusText: response.statusText};
        throw error;
    }
}

const loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken() // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token) // handwaiving here
}

const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
}

export default api;





/*
isTokenExpired(token) {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}

setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
}

logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
}

getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
}

*/