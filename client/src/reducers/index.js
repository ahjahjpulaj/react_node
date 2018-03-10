import { 
    SAMPLE_ACTION,
    HANDLE_CHANGE,
    SET_PROFILE
 } from '../actions';

const initialState = {
    username : '',
    password : ''
};

const rootReducer = (state = initialState, action) => {
    let newState = state;
    // base reducer implementatoin
    switch(action.type) {
        case SAMPLE_ACTION: 
            newState = {
                ...state,
            }
        break;
        case HANDLE_CHANGE: 
            newState = {
                ...state,
            }
            newState[action.key] = action.value;
        break;
        case SET_PROFILE: 
            newState = {
                ...state,
                user: action.value
            }
        break;
        
        default:
    }

    return newState;
};

export default rootReducer;