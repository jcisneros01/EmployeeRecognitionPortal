import { call, put, takeLatest, all, take } from "redux-saga/effects";


import {
    FETCH_USER,
    FETCHING_USER,
    USER_FETCHED,
    FETCH_USER_FAILED,
    UPDATE_USER_FAILED,
    UPDATING_USER,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    CREATE_USER,
    CREATING_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    DELETE_USER,
    DELETE_USER_FAILED,
    DELETE_USER_SUCCESS
} from "../types";


import Api from "../lib/api";

function createUserApi(data) {
 
  const { email, password, name, signature } = data
  return Api.post(`/Users`, {
    email,
    password,
    name,
    signature
  })
}

function updateUserApi(data) {
  const { email, password, name, signature } = data
  return Api.put(`/Users/${data.id}`, {
    email,
    password,
    name,
    signature
  })
}

function fetchUserApi() {

  return Api.get(`/Users`);
}

function deleteUserApi(id) {
  return Api.delete(`/Users/${id}`);
}


function* getUserFlow(action) {
  try {
    yield put({type: FETCHING_USER})
    const resp = yield call(fetchUserApi);
    if(resp) {
      yield put({type: USER_FETCHED, users: resp})
    } else {
      yield put({type: FETCH_USER_FAILED, error: 'Something went wrong'})
    }
  } catch(e) {
    console.log('Something went wrong');
    yield put({type: FETCH_USER_FAILED, error: 'Something went wrong'});
  }  
  
} 

function* createUserFlow(action) {
  try {
    yield put({type: CREATING_USER});
    const resp = yield call(createUserApi, action.data)
   
    if(resp) {
      yield put({type: CREATE_USER_SUCCESS, user: resp})
    } else {
      yield put({type: CREATE_USER_FAILED, error: 'Something went wrong'})
    }
  } catch(e) {
    console.log('Something went wrong');
    yield put({type: CREATE_USER_FAILED, error: 'Something went wrong'});
  }
}

function* updateUserFlow(action) {
  try {
    yield put({type: UPDATING_USER});
    const resp = yield call(updateUserApi, action.data)
    if(resp) {
      yield put({type: UPDATE_USER_SUCCESS, user: resp})
    } else {
      yield put({type: UPDATE_USER_FAILED, error: 'Something went wrong'})
    }
  } catch(e) {
    console.log('Something went wrong');
    yield put({type: UPDATE_USER_FAILED, error: 'Something went wrong'})
  }
}

function* deleteUserFlow(action) {
  try {
    const { id } = action
    const resp = yield call(deleteUserApi, id);
    yield put({ type: DELETE_USER_SUCCESS, user_id: id})
  } catch(e) {
    console.log(e);
    yield put({type: DELETE_USER_FAILED, error: 'Something went wrong'})
  }
}


// Our watcher (saga).  It will watch for many things.
function* userWatcher() {
  yield all([
    takeLatest(FETCH_USER, getUserFlow),
    takeLatest(UPDATE_USER, updateUserFlow),
    takeLatest(CREATE_USER, createUserFlow),
    takeLatest(DELETE_USER, deleteUserFlow)
  ])
}

export default userWatcher;
