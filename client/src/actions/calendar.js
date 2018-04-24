import api from '../libs/api';

export const GET_DATE = 'GET_DATE';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const GO_TO_CURRENT = 'GO_TO_CURRENT';
export const GET_CURRENT_DATE = 'GET_CURRENT_DATE';
export const CURRENT_DAY = 'CURRENT_DAY';
export const SET_WEEK = 'SET_WEEK';


//actions Creators
export const getDate = 
(value) =>  (
    { 
        type: GET_DATE,
        value
    }
);

export const changeView = 
(value) =>  (
    { 
        type: CHANGE_VIEW,
        value, 
    }
);

export const getCurrentDate = 
(value) =>  (
    { 
        type: GET_CURRENT_DATE,
        value,
    }
);

export const getCurrentDay = 
(value) =>  (
    { 
        type: CURRENT_DAY,
        value, 
    }
);

// export const setWeek = 
// (value) =>  (
//     { 
//         type: SET_WEEK,
//         value, 
//     }
// );

export function setWeek(username, week){
    return async function (dispatch) {
        try {
            const response = await api.orari({
                username,
                week,
            });
            console.log(response);
            if (response.status === 200){
                dispatch({ type: SET_WEEK, value: response.ingressi });
            } 
        }catch(err){
            console.log(err);
        }
    }
};