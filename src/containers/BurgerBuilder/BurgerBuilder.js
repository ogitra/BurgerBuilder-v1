import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		displayModal: false,
		loadingPage: true,
		loadingOrder: false
	};

	componentDidMount() {
		this.props.fetchIng();
	}

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

		if (this.props.loadBurgerPage) {
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
		ing: state.burger.ing,
		totalPrice: state.burger.totalPrice,
		disabledOrder: state.burger.disabledOrder,
		loadBurgerPage: state.burger.loadBurgerPage
	};
};
const mapDispatchToProps = dispatch => {
	return {
		addIng: ing => dispatch(actions.addIng(ing)),
		delIng: ing => dispatch(actions.delIng(ing)),
		fetchIng: () => dispatch(actions.initIngredients())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);

//
