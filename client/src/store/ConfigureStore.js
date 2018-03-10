import { createStore, applyMiddleware , compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {

    const middlewares = [thunk, logger];
  
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    return store;
};

export default configureStore;
