import {
    AUTH_USER,
    UNAUTH_USER,
    SIGNIN_FAILURE,
    REGISTERED_USER,
    SIGNUP_FAILURE,
    SET_WEEK,
} from '../actions/auth';

export default function(state = {}, action) {
    let newState = state;
    switch(action.type) {
      case SIGNIN_FAILURE:
        newState = { ...state, error: { signin: action.payload } };
        break;
        case AUTH_USER:
        newState = { ...state, authenticated: true, user: action.data, error: {} };
        break;
        case UNAUTH_USER:
        newState = { ...state, authenticated: false, error: {} };
        break;
        case SIGNUP_FAILURE:
        newState = { ...state, error: { signup: action.payload } };
        break;
        case REGISTERED_USER:
        newState = { ...state};
        break;
        case SET_WEEK:
        newState = { ...state, currentWeek: action.value};
        break;
        default:
        return state;
    };
  
    return newState;
  }