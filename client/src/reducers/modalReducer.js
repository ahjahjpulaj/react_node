import {
  SHOW_MODAL,
} from '../actions/modal';

import InitialState from '../libs/InitialState';

export default function(state = {}, action) {
    let newState = state;
    switch(action.type) {
      case SHOW_MODAL:
        if(action.value) {
          newState = { ...state, show: action.value};
        } else {
          newState = { ...state, show: false};
        }
      break;
      default:
      return state;
    };
  
    return newState;
  }