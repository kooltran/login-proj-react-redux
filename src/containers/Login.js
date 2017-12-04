import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import t from 'tcomb-form';
// import { locationShape } from 'react-router-props';
import { getLocalStorageItem } from '../helpers/RequestLogin';
import { loginAccount } from '../actions';
// import { LOGIN_INIT_STATE } from '../reducers/reducer_login';


const Form = t.form.Form;

const mycombinator = (type, getError, name) => {
	const Result = t.refinement(type, x => (
		!t.String.is(getError(x))
	), name);
	Result.getError = getError;
	return Result;
};

const Username = mycombinator(t.String, value => {
	const nameRegex = /^[a-zA-Z]/;
	return (
		(!value && 'This field is required!') ||
		(!nameRegex.test(value) && 'Username must be string')
	);
}, 'Username');

const Password = mycombinator(t.String, value => {
	const passRegex = /^[a-zA-Z]/;
	return (
		(!value && 'This field is required!') ||
		(!passRegex.test(value) && 'Username must be string')
	);
}, 'Password');

const FormSchema = t.struct({
	name: Username,
	password: Password,
});

const options = {
	fields: {
		name: {
			error: Username.getError,
			label: 'Your Username: ',
			attrs: {
				placeholder: 'please enter your username...',
				className: 'input-name',
			},
		},
		password: {
			error: Password.getError,
			label: 'Your password',
			type: 'password',
			attrs: {
				placeholder: 'please enter your password',
				className: 'input-pass',
			},
		},
	},
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(value, path) {
		this.form.getComponent(path).validate();
	}

	save(e) {
		e.preventDefault();
		const value = this.form.getValue();
		if (value) {
			const postData = {
				username: value.name,
				password: value.password,
			};
			this.props.loginAccount(postData);
		}
	}

	/* eslint class-methods-use-this: ["error",
	{ "exceptMethods": ["showErrorMessage", "renderLoadingSpinner"] }] */
	showErrorMessage(error) {
		return (
			<p className="has-error">{error}</p>
		);
	}

	renderLoadingSpinner() {
		return (
			<div className="loading-spinner">
				<div className="dot-item dot1">
					<div className="dot-winner">{}</div>
				</div>
				<div className="dot-item dot2">
					<div className="dot-winner">{}</div>
				</div>
				<div className="dot-item dot3">
					<div className="dot-winner">{}</div>
				</div>
				<div className="dot-item dot4">
					<div className="dot-winner">{}</div>
				</div>
				<div className="dot-item dot5">
					<div className="dot-winner">{}</div>
				</div>
			</div>
		);
	}

	render() {
		const { isLoading, responseMessg } = this.props.login;
		const { from } = this.props.location.state || { from: { pathname: '/account' } };
		const token = getLocalStorageItem('token');
		console.log(responseMessg);

		if (token) {
			return (
				<Redirect to={from} />
			);
		}

		return (
			<div>
				{ isLoading ? this.renderLoadingSpinner() : '' }
				<form className="container" onSubmit={this.save}>
					{ responseMessg ? this.showErrorMessage(responseMessg) : '' }
					<Form
						ref={el => { this.form = el; }}
						type={FormSchema}
						options={options}
						onChange={this.onChange}
					/>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">Login</button>
					</div>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	loginAccount: PropTypes.func.isRequired,
	login: PropTypes.shape({
		isLoading: PropTypes.bool,
		responseMessg: PropTypes.string,
		redirectToReferrrer: PropTypes.bool,
		error: PropTypes.string,
	}),
	location: PropTypes.shape({
		hash: PropTypes.string,
		search: PropTypes.string,
		state: PropTypes.object,
	}).isRequired,
};

Login.defaultProps = {
	login: {
		isLoading: false,
		responseMessg: null,
		error: null,
	},
};


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ loginAccount }, dispatch);
}

function mapStateToProp(state) {
	return {
		login: state.reducers.login,
	};
}

export default connect(mapStateToProp, mapDispatchToProps)(Login);
