import {
    AUTH_USER,
    UNAUTH_USER,
    SIGNIN_FAILURE,
} from '../actions/auth';

export default function(state = {}, action) {
    let newState = state;
    switch(action.type) {
      case SIGNIN_FAILURE:
        newState = { ...state, error: { signin: action.payload } };
        break;
        case AUTH_USER:
        newState = { ...state, authenticated: true, error: {} };
        break
        case UNAUTH_USER:
        newState = { ...state, authenticated: false, error: {} };
        break
      default:
    };
  
    return newState;
  }