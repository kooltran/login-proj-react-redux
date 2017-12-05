import React, { Component } from 'react';
import t from 'tcomb-form';
import { Redirect } from 'react-router-dom';
import { requestPost } from '../helpers/RequestLogin';

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

const Gender = t.enums.of(['Male', 'Female'], 'Gender');

Gender.getTcombFormFactory = () => (t.form.Radio);

const FormSchema = t.struct({
	name: Username,
	password: Password,
	gender: Gender,
});

const options = {
	fields: {
		name: {
			error: Username.getError,
			label: 'Your Username:',
			attrs: {
				placeholder: 'please enter your username...',
				className: 'input-name',
			},
		},
		password: {
			error: Password.getError,
			label: 'Your Password:',
			type: 'password',
			attrs: {
				placeholder: 'please enter your password...',
				className: 'input-pass',
			},
		},
		gender: {
			error: 'Please choose your gender!!!',
		},
	},
};

export default class RegisterForm extends Component {
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
	// 	if (value) {
	// 		const postData = {
	// 			body: JSON.stringify({
	// 				username: value.name,
	// 				password: value.password
	// 			})
	// 		}
	// 		const url = 'https://express-auth-crud-api.herokuapp.com/register';
	//
	// 		// TODO const url
	// 		request(url, 'post', postData)
	// 			.then(res => res.json())
	// 			.then(res => {
	// 				if (res.success) {
	// 					this.setState({
	// 						redirectToReferrrer: true
	// 					})
	// 				} else {
	// 					alert('Your email address is already in use by another account!!!');
	// 				}
	// 			})
	// 			.catch(err => console.log(err));
	// 	}
	}

	render() {
		// const { from } = this.props.location.state || { from: { pathname: '/login' } };
		// const { redirectToReferrrer } = this.state;

		// if (redirectToReferrrer) {
		// 	return (
		// 		<Redirect to={from} />
		// 	)
		// }

		return (
			<form className="container">
				<Form
					ref={el => { this.form = el; }}
					type={FormSchema}
					options={options}
					onChange={this.onChange}
				/>
				<div className="form-group">
					<button type="submit" className="btn btn-primary" onClick={this.save}>Register</button>
				</div>
			</form>
		);
	}
}
