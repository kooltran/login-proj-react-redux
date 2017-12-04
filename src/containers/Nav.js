import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getLocalStorageItem, clearLocaStorageItem } from '../helpers/RequestLogin';

export default class Nav extends Component {
	render() {
		const isLogin = getLocalStorageItem('token');
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="/">LOGIN APP</a>
					</div>
					<ul className="nav navbar-nav">
						<li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
						<li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
						<li><NavLink activeClassName="active" to="/register">Register</NavLink></li>
						<li><NavLink activeClassName="active" to="/account">Account</NavLink></li>
					</ul>
					{
						isLogin ?
							<ul className="nav navbar-nav navbar-right">
								<li><button to="/" onClick={() => clearLocaStorageItem('token')}>LogOut</button></li>
							</ul> : ''
					}
				</div>
			</nav>
		);
	}
}
