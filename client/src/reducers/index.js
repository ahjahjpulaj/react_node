import { combineReducers } from 'redux';

import authReducer from './authReducer';
import helpersReducer from './helpersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  helper: helpersReducer,
});

export default rootReducer;