
// actions
export const SAMPLE_ACTION = 'SAMPLE_ACTION';

export const HANDLE_CHANGE = 'HANDLE_CHANGE';

export const SET_PROFILE = 'SET_PROFILE';

export const sampleAction = 
    (value = 1) =>  ({ type: SAMPLE_ACTION, value });

export const handleChange = 
    (key, value) =>  ({ type: HANDLE_CHANGE, key, value });

export const setProfile = 
    ( value ) =>  ({ type: SET_PROFILE, value });

    