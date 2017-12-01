import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import {
	Route,
	Router,
} from 'react-router';
import './styles/styles.scss';
import reducers from './reducers';
import App from './components/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Account from './containers/Account';
import PrivateRoute from './containers/PrivateRoute';

const store = createStore(
	combineReducers({
		reducers,
		routing: routerReducer,
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ /* eslint no-underscore-dangle: 0 */
	&& window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunkMiddleware),
);

const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<div className="container">
				<App />
				<hr />
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<PrivateRoute path="/account" component={Account} />
			</div>
		</Router>
	</Provider>
	, document.getElementById('root'),
);
