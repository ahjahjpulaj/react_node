import api from '../libs/api';

import moment from "moment";
//actions types

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const REGISTERED_USER = 'REGISTERED_USER';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SET_WEEK = 'SET_WEEK';

//actions Creators

// export const handleInputChange = 
// (key, value) =>  (
//     { type: HANDLE_INPUT_CHANGE,
//     key,
//     value, }
// );
/**
 * Error helper
 */
export function authError(CONST, error) {
    return {
      type: CONST,
      payload: error,
    };
}


  export function login({username, password}, history){
    return async function (dispatch) {
        try {
            const response = await api.login({
                username,
                password
            });
            if (response.status === 200){
                dispatch({ type: AUTH_USER, data: response.user});
                localStorage.setItem('user', response.token);
                const week = moment().isoWeek();
                console.log(week);
                const orari = await api.orari({
                    username,
                    week,
                })
                // const currentWeek = await orari.json();
                console.log(orari);
                dispatch({ type: SET_WEEK, value: orari.ingressi});
                history.push('/');
            } else{
                dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right"));
            }
        }catch(err){
            dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right"));
        }
    }
}

export function googleAuth() {
    return async function (dispatch) {
        try {
            const response = await api.loginWithGoogle();
            console.log(response);
        }catch(err){
            dispatch(authError(SIGNIN_FAILURE, "Error"));
        }
    }
}

/**
 * Sign out
 */
    export function logout() {
        localStorage.clear();
    
        return {
        type: UNAUTH_USER,
        }
    }
/**
 *  Register
 */
    export function register({email, username, password, firstname, lastname}, history){
        // async
        return async function (dispatch) {
            try {
                const response = await api.register({
                    email,
                    username,
                    password,
                    firstname, 
                    lastname
                });
                console.log(response);
                if (response.status === 200){
                    history.push('/login');
                    dispatch({ type: REGISTERED_USER });
                } else{
                    dispatch(authError(SIGNUP_FAILURE, response.err));
                }
            }catch(err){
                console.log(err);
                dispatch(authError(SIGNUP_FAILURE, "Register Error"));
            }
        }
    }

