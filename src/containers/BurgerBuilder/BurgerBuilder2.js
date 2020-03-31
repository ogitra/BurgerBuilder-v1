import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../components/Axios/axios-orders';
import { connect } from 'react-redux';

class BurgerBuilder2 extends Component {
	state = {
		
		displayModal: false,
		loadingPage: false,
		loadingOrder: false
	};

	componentDidMount = () => {
		axios.get('https://my-burger-3defc.firebaseio.com/ingredients.json').then(response => {
			this.setState({ ingredients: response.data, loadingPage: true });
		});
	};
	

	purchaseHandler = () => {
		this.setState({ displayModal: true });
	};

	cancelOrderHandler = () => {
		this.setState({ displayModal: false });
	};

	continueOrderHandler = () => {
		this.setState({ loadingOrder: true });

		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ing
		};

		for (let propriedades in disabledInfo) {
			disabledInfo[propriedades] = disabledInfo[propriedades] <= 0;
		}

		let orderSummary = null;

		let showPage = <Spinner />; //mostra spinner antes de ler o get do axios que pega os ingredients no firebase

		if (this.state.loadingPage) {
			showPage = (
				<Aux>
					<Burger ingredients={this.props.ing} />
					<BuildControls
						price={this.props.totalPrice.toFixed(2)}
						added={ing => this.props.addIng(ing)}
						removed={ing => this.props.delIng(ing)}
						disabled={disabledInfo}
						disabledOrder={this.props.disabledOrder}
						displayModal={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ing}
					clickedCancel={this.cancelOrderHandler}
					clickedContinue={this.continueOrderHandler}
					price={this.props.totalPrice}
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

const mapStateToProps = state => {
	return {
		ing: state.ing,
		totalPrice: state.totalPrice,
		disabledOrder: state.disabledOrder
	};
};
const mapDispatchToProps = dispatch => {
	return {
		addIng: ing => dispatch({ type: 'ADD_ING', ingred: ing }),
		delIng: ing => dispatch({ type: 'DEL_ING', ingred: ing })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder2);

//
