import {
  GET_DATE,
  CHANGE_VIEW,
  GET_CURRENT_DATE,
  CURRENT_DAY,
} from '../actions/calendar';

import InitialState from '../libs/InitialState';

// var moment = require('moment');
export default function(state = InitialState, action) {
    let newState = state;
    switch(action.type) {
      case GET_DATE:
        if(action.value) {
          newState = { ...state, date: action.value};
        } else {
          newState = { ...state };
        }
      break;
      case CHANGE_VIEW:
        newState = { ...state, view: action.value};
      break;
      case GET_CURRENT_DATE:
        if(action.value) {
          newState = { ...state, currentDate: action.value};
        } else {
          newState = { ...state, currentDate: InitialState.day };
        }
      break;
      case CURRENT_DAY:
        if(action.value) {
          newState = { ...state, currentDay: action.value};
        } else {
          newState = { ...state, currentDay: InitialState.day};
        }
        
      break;
      default:
      return state;
    };
  
    return newState;
  }


  // let days = [];
  // let startOfWeek = moment().startOf('isoWeek');
  // let endOfWeek = moment().endOf('isoWeek');
  
  // let day = startOfWeek;
  
  // while (day <= endOfWeek) {
  //   days.push(day.toDate());
  //   day = day.clone().add(1, 'd');
  // }
  

