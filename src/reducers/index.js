import { combineReducers } from 'redux';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
	login: LoginReducer,
});

export default rootReducer;
