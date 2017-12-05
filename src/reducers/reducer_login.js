import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL_AUTH, LOGIN_FAIL_NETWORK, RESET_REDIRECT_REFERRER } from '../actions';

const LOGIN_INIT_STATE = {
	isLoading: false,
	responseMessg: null,
	redirectToReferrrer: false,
	error: null,
};

export default function (state = LOGIN_INIT_STATE, action) {
	switch (action.type) {
	case LOGIN_REQUEST:
		return {
			...state,
			isLoading: true,
		};
	case LOGIN_SUCCESS:
		return {
			...state,
			isLoading: false,
			responseMessg: null,
			redirectToReferrrer: true,
			error: null,
		};
	case LOGIN_FAIL_AUTH:
		return {
			...state,
			isLoading: false,
			responseMessg: action.payload.data.message,
			redirectToReferrrer: false,
			error: null,
		};
	case RESET_REDIRECT_REFERRER:
		return {
			...state,
			isLoading: false,
			responseMessg: null,
			redirectToReferrrer: false,
			error: null,
		};
	case LOGIN_FAIL_NETWORK:
		return {
			...state,
			isLoading: false,
			responseMessg: null,
			redirectToReferrrer: false,
			error: 'bad network',
		};
	default:
		return state;
	}
}
