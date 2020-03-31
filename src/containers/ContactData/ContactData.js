import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '.././../components/Axios/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

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
		loadingOrder: true,
		button: false
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

	orderHandler = () => {
		//faz um loop no state atualizado e pega apenas o 'nome':'nome da pessoa, country:country da pessoa, etc...
		let contactData = {};
		for (let prop in this.state.orderForm) {
			contactData[prop] = this.state.orderForm[prop].value;
		}
		//cria uma var e manda pro backend com axios.post:
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			contact: contactData
		};
		this.setState({ loadingOrder: false });
		axios.post('/orders.json', order).then(response => {
			this.setState({ loadingOrder: true }); //só faz essas funções quando chegar a resposta do post (sincrono) se eu coloco FORA do metodo axios.post.then,
			this.props.history.replace('/'); // ele fara primeiro, pois o js é assincrono, nao vai ficar esperando a reposta do post
		});
	}; //se eu colocar algo aqui, ele faria PRIMEIRO, antes dos 2 de cima, pq os de cima dependem do post chegar no backend

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
			<Button btnStyle="Success" clicked={this.orderHandler}>
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
			</div>
		);

		if (!this.state.loadingOrder) {
			ContactData = <Spinner />;
		}

		return ContactData;
	}
}

export default ContactData;
