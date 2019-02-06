import { all } from 'redux-saga/effects'
import loginWatcher from "./loginSaga";
import userSaga from './userSaga';


export default function* IndexSaga() {
  yield all([
    loginWatcher(),
    userSaga()
  ]);
}