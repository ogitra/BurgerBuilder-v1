import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Modal from '../../components/UI/Modal/Modal';

import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name'
				},
				value: '',
				validation: {
					required: true,
					valid: true,
					minLength: 5,
					validOrderButtton: false
				}
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true,
					valid: true,
					minLength: 10,
					validOrderButtton: false
				}
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip-Code'
				},
				value: '',
				validation: {
					required: true,
					valid: true,
					minLength: 7,
					validOrderButtton: false
				}
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true,
					valid: true,
					minLength: 5,
					validOrderButtton: false
				}
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'E-mail'
				},
				value: '',
				validation: {
					required: true,
					valid: true,
					minLength: 5,
					validOrderButtton: false
				}
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: '',
				validation: {
					required: true,
					valid: true,
					minLength: 1,
					validOrderButtton: false
				}
			}
		},

		button: false
	};

	onOrderHandler = () => {
		//faz um loop no state atualizado e pega apenas o 'nome':'nome da pessoa, country:country da pessoa, etc...
		let contactDataForPost = {};
		for (let prop in this.state.orderForm) {
			contactDataForPost[prop] = this.state.orderForm[prop].value;
		}
		//cria uma var e manda pro backend com axios.post (como parametro aqui, q vai pro redux):
		const order = {
			ingredients: this.props.ing,
			price: this.props.totalPrice,
			contact: contactDataForPost
		};

		this.props.orderHandler(order);
	};
	inputChangedHandler = (evt, inputName) => {
		let updatedState = { ...this.state.orderForm };
		updatedState[inputName].value = evt.target.value;
		updatedState[inputName].value.length < updatedState[inputName].validation.minLength
			? (updatedState[inputName].validation.valid = false)
			: (updatedState[inputName].validation.valid = true) &&
				(updatedState[inputName].validation.validOrderButtton = true);

		this.setState({ orderForm: updatedState, button: true });
	};

	onRedirectHandler = () => {
		this.props.showModalFalseAfterFinish();
		this.props.history.goBack();
	};

	render() {
		const elementsArr = [];
		const validOrderButtton = [];

		for (let key in this.state.orderForm) {
			elementsArr.push({
				id: key,
				config: this.state.orderForm[key]
			});
			validOrderButtton.push(this.state.orderForm[key].validation.validOrderButtton);
		}

		const disabledButton = validOrderButtton.includes(false);

		let button = (
			<Button btnStyle="Success" clicked={this.onOrderHandler}>
				ORDER
			</Button>
		);

		if (disabledButton) {
			button = (
				<Button btnStyle="Disabled" disabled={true}>
					ORDER
				</Button>
			);
		}

		let ContactData = (
			<div className={classes.ContactData}>
				<h4> Enter your contact data</h4>
				<form>
					{elementsArr.map(item => {
						return (
							<Input
								elementType={item.config.elementType}
								elementConfig={item.config.elementConfig}
								value={item.config.value}
								key={item.id}
								options={item.config.elementConfig.options}
								onChange={evt => this.inputChangedHandler(evt, item.id)}
								required={true}
								valid={item.config.validation.valid}
							/>
						);
					})}
				</form>
				{button}

				<Modal showModal={this.props.reduxShowModal}>
					<p>FEITO</p>
					<button onClick={this.onRedirectHandler}> Voltar </button>
				</Modal>
			</div>
		);

		return ContactData;
	}
}

const mapStateToProps = state => {
	return {
		ing: state.burger.ing,
		totalPrice: state.burger.totalPrice,
		reduxShowModal: state.contactData.showModal
	};
};

const mapDispatchToProps = dispatch => {
	return {
		orderHandler: order => {
			dispatch(actions.orderHandler(order));
		},
		showModalFalseAfterFinish: () => {
			dispatch(actions.setModalHandler());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
