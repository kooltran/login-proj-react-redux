import { requestPost } from '../helpers/RequestLogin';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL_AUTH = 'LOGIN_FAIL_AUTH';
export const LOGIN_FAIL_NETWORK = 'LOGIN_FAIL_NETWORK';


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
			.then(response => {
				if (response.data.success) {
					dispatch(loginSuccess(response));
				} else {
					dispatch(loginFailAuth(response));
				}
			})
			.catch(error => { dispatch(loginFailNetwork(error)); });
	};
};
