import api from '../libs/api';

//actions types

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const REGISTERED_USER = 'REGISTERED_USER';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

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
                dispatch({ type: AUTH_USER, data: response.user, history : '/'});
                localStorage.setItem('user', response.token);
                history.push('/');
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

