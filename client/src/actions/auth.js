// import { API_URL } from '../config';

import api from '../libs/api';

//actions types

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

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
    // async
    return async function (dispatch) {
        try {
            const response = await api.login({
                username,
                password
            });
            console.log(response);
            if (response){
                localStorage.setItem('user', response.token);
                history.push('/');
                dispatch({ type: AUTH_USER });
            } else{
                dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right"));
            }
        }catch(err){
            dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right"));
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

