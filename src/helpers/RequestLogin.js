import axios from 'axios';

// const headers = new Headers({
// 	'Content-Type': 'application/json',
// 	Accept: 'application/json',
// });

export const requestPost = (url, data) => (
	axios.post(url, data)
);

export function setLocalStorageItem(key, value) {
	if (localStorage) { // check broweser support
		localStorage.setItem(key, value);
	}
}

export function getLocalStorageItem(key) {
	if (localStorage) { // check broweser support
		return localStorage.getItem(key);
	}
	return null;
}

export function clearLocaStorageItem(key) {
	if (localStorage) {
		return localStorage.removeItem(key);
	}
	return null;
}
