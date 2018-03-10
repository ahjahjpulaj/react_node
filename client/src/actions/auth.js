import { API_URL } from '../config';

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

/**
 * Login
 */

export function login(username, password) {
    console.log(JSON.stringify({
        username,
        password
    }));
    return function (dispatch) {
        return fetch( API_URL +'/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            if(res.status===200){
                console.log(res)
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch({ type: AUTH_USER });
              //   browserHistory.push('/');
            }else{
                dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right"));
            }
        })
        .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
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

  /*
  login(username, password) {
    console.log("login");
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => {
        this.setToken(res.token) // Setting the token in localStorage
        return Promise.resolve(res);
    })
}
*/