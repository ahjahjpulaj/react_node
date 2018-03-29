import { combineReducers } from 'redux';

import authReducer from './authReducer';
import calendarReducer from './calendarReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
  modal: modalReducer,
});

export default rootReducer;