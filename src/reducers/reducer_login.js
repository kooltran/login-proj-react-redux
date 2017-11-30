import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions';

const INITIAL_STATE = {
	isLoading: false,
	error: null,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case LOGIN_REQUEST:
		return {
			...state,
			isLoading: true,
			error: null,
		};
	case LOGIN_SUCCESS:
		return {
			...state,
			isLoading: false,
			error: null,
		};
	case LOGIN_FAIL:
		return {
			...state,
			isLoading: false,
			error: action.payload.message,
		};
	default:
		return state;
	}
}
