import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../components/Axios/axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.7,
	meat: 1.5,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		disabledOrder: true,
		displayModal: false,
		loadingPage: false,
		loadingOrder: false
	};

	componentDidMount = () => {
		axios.get('https://my-burger-3defc.firebaseio.com/ingredients.json').then(response => {
			this.setState({ ingredients: response.data, loadingPage: true });
		});
	};
	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;

		const oldPrice = this.state.totalPrice;
		const addedIngredientPrice = INGREDIENT_PRICES[type];
		const newPrice = oldPrice + addedIngredientPrice;
		const disabledOrder = false;

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredient, disabledOrder: disabledOrder });
	};

	removeIngredientHandler = type => {
		const ingredient = this.state.ingredients;
		const newIngredient = ingredient[type] - 1;
		if (newIngredient < 0) {
			return;
		}

		ingredient[type] = newIngredient;
		const order = Object.keys(ingredient).map(item => ingredient[item]).reduce((total, prox) => {
			return total + prox;
		}, 0);

		this.setState({ ingredients: ingredient, disabledOrder: order === 0 });

		const oldPrice = this.state.totalPrice;

		let newPrice = oldPrice - INGREDIENT_PRICES[type];

		if (newPrice >= 4) {
			this.setState({ totalPrice: newPrice });
		}
	};

	purchaseHandler = () => {
		this.setState({ displayModal: true });
	};

	cancelOrderHandler = () => {
		this.setState({ displayModal: false });
	};

	continueOrderHandler = () => {
		this.setState({ loadingOrder: true });

		this.props.history.push('/checkout/' + JSON.stringify(this.state.ingredients) + '/' + this.state.totalPrice);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let propriedades in disabledInfo) {
			disabledInfo[propriedades] = disabledInfo[propriedades] <= 0;
		}

		let orderSummary = null;

		let showPage = <Spinner />; //mostra spinner antes de ler o get do axios que pega os ingredients no firebase

		if (this.state.loadingPage) {
			showPage = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						price={this.state.totalPrice.toFixed(2)}
						added={this.addIngredientHandler}
						removed={this.removeIngredientHandler}
						disabled={disabledInfo}
						disabledOrder={this.state.disabledOrder}
						displayModal={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					clickedCancel={this.cancelOrderHandler}
					clickedContinue={this.continueOrderHandler}
					price={this.state.totalPrice}
					checkout={JSON.stringify(this.state.ingredients)}
				/>
			);
		}

		if (this.state.loadingOrder) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal showModal={this.state.displayModal} clicked={this.cancelOrderHandler}>
					{orderSummary}
				</Modal>
				{showPage}
			</Aux>
		);
	}
}
export default BurgerBuilder;

//
