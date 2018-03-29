export const SHOW_MODAL = 'SHOW_MODAL';

//actions Creators
export const showModal = 
(value) =>  (
    { 
        type: SHOW_MODAL,
        value
    }
);