import { call, put, takeLatest, all } from "redux-saga/effects";

// Our login constants
import {
    USER_LOG_IN,
    USER_LOGGED_IN,
    LOGIN_FAILED,
    REQUEST_RECOVER_PASSWORD,
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_FAILED
} from "../types";


import Api from "../lib/api";

// loginApi method which call to login API through Api.post method
function loginApi(email, password) {
 // console.log(email, password)
  return Api.post(
    `/auth/token`,
    {
      email: email,
      password: password 
    }
  );
}
function logoutApi() {
  // return Api.post(
  //   `customer/logout`,
  //   {
  //     fascia_id: 1,
  //     channel_id: 2,
  //     customer: {
  //       customer_id: customer_id
  //     }
  //   }
  // );
}

function recoverPasswordApi(email) {
  return Api.post('/auth/recoverpassword', {
    email
  })
}


function* logoutFlow(action) {
  try {
  
    //const resp = yield call(logoutApi);
   
  

    // remove our token
    //localStorage.removeItem('token');
  } catch (e) {
   
  }
}



function* loginFlow(action) {
  try {
    const { email, password } = action.credentials;
  
   const resp = yield call(loginApi, email, password);
   console.log(resp)
   //const resp = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDg3MTgwMjksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCJ9.KJefXEk4ACUcoNUULSV1O-IsF6lKGsmXbH3t1Qf6C-s'}
   if(resp.token) {
     localStorage.userJWT = resp.token; 
     yield put( {type: USER_LOGGED_IN, token: resp.token})
   } else {
     yield put({ type: LOGIN_FAILED, error: 'Invalid Details' })
   }
 

    //localStorage.setItem('token', JSON.stringify(token));
  } catch (error) {
    // error? send it to redux
    //yield put({ type: LOGIN_ERROR, error });
    console.log('Login Error:' + error)
  }
 
}

function* recoverPasswordFlow(action) {
  try {
    const { email } = action;
    const resp = yield call(recoverPasswordApi, email);
   
    if(resp.status === 'success') {
      yield put({type: RECOVER_PASSWORD_SUCCESS})
    } else {
      yield put({type: RECOVER_PASSWORD_FAILED, error: 'Invalid mail'})
    }
  } catch(e) {
    console.log('Forgot password error')
  }  
  
} 


// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
  yield all([
    takeLatest(USER_LOG_IN, loginFlow),
    takeLatest(REQUEST_RECOVER_PASSWORD, recoverPasswordFlow)
  ])
}

export default loginWatcher;
