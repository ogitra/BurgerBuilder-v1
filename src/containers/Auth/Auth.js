import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
	state = {
		auth: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Mail Adress'
				},
				value: '',
				validation: {
					required: true,
					valid: true,
					minLength: 1,
					validSubmitButton: false
				}
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					valid: true,
					minLength: 1,
					validSubmitButton: false
				}
			}
		}
	};

	inputChangedHandler = (evt, inputName) => {
		let authFormFilled = { ...this.state.auth };
		authFormFilled[inputName].value = evt.target.value;

		if (authFormFilled[inputName].value.length > authFormFilled[inputName].validation.minLength) {
			authFormFilled[inputName].validation.valid = true;
			authFormFilled[inputName].validation.validSubmitButton = true;
		} else {
			authFormFilled[inputName].validation.valid = false;
			authFormFilled[inputName].validation.validSubmitButton = false;
		}

		this.setState({ auth: authFormFilled });
	};
	onLoginHandler = event => {
		event.preventDefault();
		this.props.onLogin(this.state.auth.email.value, this.state.auth.password.value);
	};

	render() {
		const authArr = [];
		const buttonIsAble = [];
		let buttonEnter = (
			<Button btnStyle={'Disabled'} disabled={true}>
				LOGIN
			</Button>
		);
		let buttonSignUp = (
			<Button btnStyle={'Disabled'} disabled={true}>
				SIGNUP
			</Button>
		);

		for (let key in this.state.auth) {
			authArr.push({
				id: key,
				config: this.state.auth[key]
			});
			buttonIsAble.push(this.state.auth[key].validation.validSubmitButton);
		}

		const buttonisAbleFinal = buttonIsAble.some(item => item === false);

		if (!buttonisAbleFinal) {
			buttonEnter = <Button btnStyle={'Success'}>LOGIN</Button>;
			buttonSignUp = (
				<Button
					btnStyle={'Success'}
					clicked={() => this.props.onSignUp(this.state.auth.email.value, this.state.auth.password.value)}
				>
					SIGNUP
				</Button>
			);
		}

		let logStatus = null;
		switch (this.props.logStatus) {
			case 'INVALID_EMAIL':
				logStatus = 'E-MAIL INVÁLIDO';
				break;
			case 'EMAIL_EXISTS':
				logStatus = 'E-MAIL EXISTENTE';
				break;
			case 'EMAIL_NOT_FOUND':
				logStatus = 'E-MAIL NÃO ENCONTRADO';
				break;
			case 'INVALID_PASSWORD':
				logStatus = 'SENHA INCORRETA';
				break;
			case 'WEAK_PASSWORD : Password should be at least 6 characters':
				logStatus = 'A SENHA PRECISA TER AO MENOS 6 CARACTERES';
				break;
			default:
				logStatus = this.props.logStatus;
		}

		let authRedirect = null;
		if (this.props.idToken && this.props.building) {
			authRedirect = <Redirect to="/checkout" />;
		} else if (this.props.idToken && !this.props.building) {
			authRedirect = <Redirect to="/" />;
		}

		let form = (
			<div className={classes.Auth}>
				<form onSubmit={this.onLoginHandler}>
					{authArr.map(item => {
						return (
							<div>
								<Input
									elementType={item.config.elementType}
									elementConfig={item.config.elementConfig}
									value={item.config.value}
									key={item.id}
									onChange={evt => this.inputChangedHandler(evt, item.id)}
									required={true}
									valid={item.config.validation.valid}
								/>
							</div>
						);
					})}
					{buttonEnter}
				</form>
				{buttonSignUp}

				<div>
					{' '}
					<p style={{ color: '#944317', fontWeight: 'bold' }}>STATUS: {logStatus}</p>
				</div>
				{authRedirect}
			</div>
		);

		if (this.props.showSpinner) {
			form = <Spinner />;
		}

		return form;
	}
}
const mapStatetoProps = state => {
	return {
		showSpinner: state.auth.spinner,
		logStatus: state.auth.logStatus,
		idToken: state.auth.idToken,
		building: state.burger.building
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSignUp: (email, password) => dispatch(action.signUpInit(email, password)),
		onLogin: (email, password) => dispatch(action.loginInit(email, password))
	};
};
export default connect(mapStatetoProps, mapDispatchToProps)(Auth);
