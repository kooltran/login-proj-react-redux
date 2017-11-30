import { requestPost } from '../helpers/RequestLogin';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';


export const loginRequest = () => (
	{
		type: LOGIN_REQUEST,
	}
);


export const loginSuccess = response => (
	{
		type: LOGIN_SUCCESS,
		payload: response,
	}
);

export const loginFail = error => (
	{
		type: LOGIN_FAIL,
		payload: error,
	}
);

export const loginAccount = postData => {
	const url = 'https://express-auth-crud-api.herokuapp.com/login';
	// const request = axios.post(url, postData);
	// return dispatch => {
	// 	dispatch(loginRequest());
	// 	return request
	// 		.then(response => { dispatch(loginSuccess(response)); })
	// 		.catch(error => { dispatch(loginFail(error)); });
	// };
	return dispatch => {
		dispatch(loginRequest());
		return requestPost(url, postData)
			.then(response => { dispatch(loginSuccess(response)); })
			.catch(error => { dispatch(loginFail(error)); });
	};
};
