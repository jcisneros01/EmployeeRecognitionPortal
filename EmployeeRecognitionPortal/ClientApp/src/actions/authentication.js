import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOG_IN, USER_LOGGING_IN, REQUEST_RECOVER_PASSWORD } from '../types';

export const userLoggedIn = (token) => ({
    type: USER_LOGGED_IN,
    token
})

export const login = credentials => ({
    type: USER_LOG_IN,
    credentials
})

export const logginIn = () => ({
    type: USER_LOGGING_IN
})

 
export const logout = () => {
    localStorage.removeItem('userJWT');
   return {
        type: USER_LOGGED_OUT,
    }
}

export const resetPasswordRequest = (email) => ({
    type: REQUEST_RECOVER_PASSWORD,
    email
})







