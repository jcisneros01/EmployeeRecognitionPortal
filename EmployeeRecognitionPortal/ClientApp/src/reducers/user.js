import {  CREATING_USER, CREATE_USER_SUCCESS, FETCHING_USER, USER_FETCHED, FETCH_USER_FAILED, UPDATING_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED, INITIALIZE_FORM, CREATE_USER_FAILED, DELETE_USER_SUCCESS } from '../types';
const initialState = {
    loading: false,
    error: null,
    success: false,
    updateSuccess: false,
    users: []
}
export default function user(state = initialState, action = {}) {
    switch(action.type) {

        case CREATING_USER: 
            return {
                ...state,
                loading: true
            } 
        case FETCHING_USER: 
            return {
                ...state,
                ...initialState,
                loading: true
            }    
        case USER_FETCHED: 
            return {
                ...state,
                ...initialState,
                success: true,
                users: action.users
            }
        case FETCH_USER_FAILED: 
            return {
                ...state,
                ...initialState,
                error: action.error
            }

        case INITIALIZE_FORM:
            return {
                ...state,
                updateSuccess: false
            }   
            
        case CREATE_USER_SUCCESS: 
            state.users.push(action.user)
            return {
                ...state,
                loading: false,
                updateSuccess: true
            }
        case CREATE_USER_FAILED: {
            return {
                ...state,
                loading: false,
                updateSuccess: false,
                error: action.error
            }
        }    
        case UPDATING_USER: 
            return {
                ...state,
                loading: true
            }
        case UPDATE_USER_SUCCESS: 
        
            let users = state.users.map(user => {
               
                if(user.id == action.user.id) {
                    
                    user = action.user
                }
                
                return user;
            })
            return {
                ...state,
                loading: false,
                updateSuccess: true,
                users
            }
        case UPDATE_USER_FAILED:
            return {
                ...state,
                loading: false,
                updateSucess: false,
                error: action. error
            }
        case DELETE_USER_SUCCESS: 
            
            return {
                ...state,
                loading: false,
                updateSuccess: true,
                users: state.users.filter(user => {
                    return user.id != action.user_id
                })
            }                      
  
        default: 
            return state;
    }
}