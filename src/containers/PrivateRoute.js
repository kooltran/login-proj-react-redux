import React from 'react';
import PropTypes from 'prop-types';
import { locationShape } from 'react-router-props';
import {
	Route,
	Redirect,
} from 'react-router-dom';
import { getLocalStorageItem } from '../helpers/RequestLogin';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isToken = getLocalStorageItem('token');
	return (
		<Route
			{...rest}
			render={props => (
				isToken
					?
					(<Component {...props} />)
					:
					(
						<Redirect to={{
							pathname: '/login',
							state: { from: props.location },
						}}
						/>
					)
			)}
		/>
	);
};

export default PrivateRoute;

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired,
	location: locationShape.isRequired,
};
