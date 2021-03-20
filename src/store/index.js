
import { createStore } from 'redux';

const initialState = {
    stepFormData: {}
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FORM_DATA':
            return {
                ...state,
                stepFormData: action.payload
            }
        default:
            return state
    }
}

const store = createStore(reducer);
export default store