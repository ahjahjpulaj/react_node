export const GET_DATE = 'GET_DATE';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const GO_TO_CURRENT = 'GO_TO_CURRENT';
export const GET_CURRENT_DATE = 'GET_CURRENT_DATE';
export const CURRENT_DAY = 'CURRENT_DAY';

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