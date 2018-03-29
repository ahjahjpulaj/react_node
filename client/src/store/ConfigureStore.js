import { createStore, applyMiddleware , compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = composeEnhancers(applyMiddleware(thunk, logger));
// const middlewares = [thunk, logger];

// const configureStore = () => {
//     const store = createStore(persistedReducer, middlewares);
//     let persistor = persistStore(store)

//     return { store, persistor };
// };
export const store = createStore(persistedReducer, middlewares);
export const persistor = persistStore(store);

// export default configureStore;
