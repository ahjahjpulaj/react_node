import {
    HANDLE_INPUT_CHANGE
} from '../actions/helpers';

export default function(state = {}, action) {
    let newState = state;
    switch(action.type) {
      case HANDLE_INPUT_CHANGE:
        newState = { ...state };
        newState[action.key] = action.value; 
        break;
        default:
    };
  
    return newState;
  }