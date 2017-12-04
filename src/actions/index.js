import { requestPost, setLocalStorageItem, getLocalStorageItem } from '../helpers/RequestLogin';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL_AUTH = 'LOGIN_FAIL_AUTH';
export const LOGIN_FAIL_NETWORK = 'LOGIN_FAIL_NETWORK';
export const LOGOUT_USER = 'LOGOUT_USER';


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

export const loginFailAuth = response => (
	{
		type: LOGIN_FAIL_AUTH,
		payload: response,
	}
);

export const loginFailNetwork = error => (
	{
		type: LOGIN_FAIL_NETWORK,
		payload: error,
	}
);


export const loginAccount = postData => {
	const url = 'https://express-auth-crud-api.herokuapp.com/login';
	return dispatch => {
		dispatch(loginRequest());
		return requestPost(url, postData)
			.then(response => {
				if (response.data.success) {
					setLocalStorageItem('token', response.data.token);
					dispatch(loginSuccess(response));
				} else {
					dispatch(loginFailAuth(response));
				}
			})
			.catch(error => { dispatch(loginFailNetwork(error)); });
	};
};
