import { combineReducers } from 'redux';
import user from './user';
import auth from './authentication';

export default combineReducers({
    user,
    auth
});