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
		localStorage.getItem(key);
	}
}

export function clearLocaStorageItem(key) {
	if (localStorage) {
		localStorage.removeItem(key);
	}
}
