import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import t from 'tcomb-form';
// import { requestLogin, setLocalStorageItem } from '../helpers/requestLogin';
import { loginAccount } from '../actions';

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
				body: JSON.stringify({
					username: value.name,
					password: value.password,
				}),
			};
			this.props.loginAccount(postData);
		}
	}

	render() {
		return (
			<form className="container">
				<Form
					ref={el => { this.form = el; }}
					type={FormSchema}
					options={options}
					onChange={this.onChange}
				/>
				<div className="form-group">
					<button type="submit" className="btn btn-primary" onClick={this.save}>Login</button>
				</div>
			</form>
		);
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ loginAccount }, dispatch);
}

Login.propTypes = {
	// login: PropTypes.object.isRequired,
	loginAccount: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
