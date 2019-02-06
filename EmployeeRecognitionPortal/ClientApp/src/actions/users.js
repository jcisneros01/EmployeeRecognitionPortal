import { CREATE_USER, FETCH_USER, UPDATE_USER, INITIALIZE_FORM,DELETE_USER } from '../types';


export const createUser = (data) => ({
    type: CREATE_USER,
    data
})

export const updateUser = (data) => ({
    type: UPDATE_USER,
    data
})

export const getUsers = () => ({
    type: FETCH_USER
})

export const initializeForm = () => ({
    type: INITIALIZE_FORM
})

export const deleteUser = (id) => ({
    type: DELETE_USER,
    id
})