//actions types

export const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';

//actions Creators

/**
 * handle input change
 */
export const handleInputChange = 
(key, value) =>  (
    { type: HANDLE_INPUT_CHANGE,
    key,
    value, }
);
