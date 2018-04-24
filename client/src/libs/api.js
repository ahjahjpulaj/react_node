import { API_URL } from '../config'

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
        const data = await response.json();
        console.log({...data, status: response.status, statusText: response.statusText});
        return {...data, status: response.status, statusText: response.statusText} ;
    }catch(error){
        console.log(error);
        // return {error};
        // let error = {status : response.status, statusText: response.statusText};
        // throw error;
        throw error;
    }
}

const api = {};

api.login = async({username, password}) => {

    return callFetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    })
}

api.loginWithGoogle = async() => {

    return callFetch(`${API_URL}/auth/google`, {
        method: 'GET',
    })
}

api.register = async({email, username, password, firstname, lastname}) => {
    
    return callFetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({
            email, 
            username, 
            password, 
            firstname, 
            lastname
        })
    })
}

api.orari = async({username, week}) => {
    console.log(week);
    return callFetch(`${API_URL}/orari`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            week,
        })
    })
}

api.timesheet = async({username, week}) => {
    
    return callFetch(`${API_URL}/timesheet`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            week,
        })
    })
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