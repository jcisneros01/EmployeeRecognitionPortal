import {  
    USER_LOGGING_IN, 
    LOGIN_FAILED,
    REQUEST_RECOVER_PASSWORD,
    RECOVER_PASSWORD_SUCCESS, 
    RECOVER_PASSWORD_FAILED,
    USER_LOGGED_IN,
    USER_LOGGED_OUT 
} from '../types';
const initialState = {
    loading: false,
    error: null,
    success: false,
    token: ''
}
export default function user(state = initialState, action = {}) {
    switch(action.type) {
        case USER_LOGGING_IN: 
            return {
                ...state,
                loading: true
            };
        case REQUEST_RECOVER_PASSWORD: 
            return {
                ...state,
                ...initialState,
                loading: true
            }
        case RECOVER_PASSWORD_SUCCESS: 
            return {
                ...state,
                ...initialState,
                success: true
            }  
        case RECOVER_PASSWORD_FAILED: 
            return {
                ...state,
                ...initialState,
                error: action.error
            }        
        case LOGIN_FAILED:
            return {
                ...state,
                ...initialState,
                error: action.error
            }
        case USER_LOGGED_IN: 
            return {
                ...state,
                ...initialState,
                success: true,
                token: action.token
            } 
        case USER_LOGGED_OUT:
            return {
                ...state,
                ...initialState
            }         
        default: 
            return state;
    }
}